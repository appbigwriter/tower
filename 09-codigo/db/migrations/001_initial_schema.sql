-- ==============================================================================
-- BFFD — Migration 001: Initial Schema with pgvector and GTD attributes
-- Version: 1.0.0
-- Reference: US-01 (BFFD-001), PRD Section 8.1, GTD Section 5.6
-- ==============================================================================

-- 1. Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 2. Tabela de Tenants (Contas)
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL DEFAULT 'individual', -- individual, familia, profissional
    plano VARCHAR(50) NOT NULL DEFAULT 'solo',       -- solo, familia, profissional
    status VARCHAR(50) NOT NULL DEFAULT 'ativo',     -- ativo, suspenso, cancelado
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Tabela de Pilotos (Usuários que conversam com a Bia)
CREATE TABLE IF NOT EXISTS pilotos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    telegram_user_id BIGINT UNIQUE,
    fuso VARCHAR(50) NOT NULL DEFAULT 'America/Sao_Paulo',
    config JSONB NOT NULL DEFAULT '{
        "horario_briefing": "09:00",
        "horario_checkin": "14:00",
        "horario_debriefing": "19:00",
        "horario_revisao_semanal": "17:00",
        "dia_revisao_semanal": 5,
        "limite_voos_profissionais": 2,
        "limite_voos_pessoais": 1,
        "limite_voos_curtos_dia": 2
    }'::JSONB,
    estado_turbulencia VARCHAR(50) NOT NULL DEFAULT 'normal', -- normal, leve, moderada, forte, sobrecarga
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Tabela de Membros (Acesso ao painel web)
CREATE TABLE IF NOT EXISTS membros (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    auth_user_id UUID NOT NULL, -- FK com auth.users no Supabase
    papel VARCHAR(50) NOT NULL DEFAULT 'piloto', -- dono, administrador, piloto, acompanhante, operador
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(tenant_id, auth_user_id)
);

-- 5. Tabela de Voos (Projetos)
CREATE TABLE IF NOT EXISTS voos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    pilot_id UUID NOT NULL REFERENCES pilotos(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    categoria VARCHAR(50) NOT NULL DEFAULT 'profissional', -- profissional, pessoal
    estagio VARCHAR(50) NOT NULL DEFAULT 'rascunho', 
    -- Estagios: rascunho, plano_de_voo, pronto_para_decolar, voo_curto, em_rota, hold, aproximacao_final, manutencao, encerrado, arquivado
    destino TEXT,           -- Critério verificável de pronto (resultado desejado)
    motivo TEXT,            -- Propósito do voo
    prazo DATE,             -- Data estimada para o pouso
    prioridade INT NOT NULL DEFAULT 3, -- 1 (alta) a 5 (baixa)
    energia VARCHAR(50) DEFAULT 'media', -- alta, media, baixa
    embedding VECTOR(1536), -- Embedding vetorial para busca semântica
    ultima_interacao TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Tabela de Waypoints (Marcos tangíveis intermediários)
CREATE TABLE IF NOT EXISTS waypoints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    voo_id UUID NOT NULL REFERENCES voos(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    criterio_pronto TEXT NOT NULL, -- Teste "dá para ver, mostrar ou usar?"
    ordem INT NOT NULL DEFAULT 1,
    status VARCHAR(50) NOT NULL DEFAULT 'pendente', -- pendente, em_andamento, concluido
    concluido_em TIMESTAMPTZ,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Tabela de Ações (Próximas manobras físicas de 15 a 45 min)
CREATE TABLE IF NOT EXISTS acoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    waypoint_id UUID NOT NULL REFERENCES waypoints(id) ON DELETE CASCADE,
    descricao TEXT NOT NULL,       -- Inicia com verbo físico imediato
    minutos INT NOT NULL DEFAULT 30, -- Duração estimada (15 a 45 min)
    contexto VARCHAR(50) NOT NULL DEFAULT 'computador', -- computador, celular, rua, casa, reunião
    energia VARCHAR(50) NOT NULL DEFAULT 'media',       -- alta, media, baixa
    status VARCHAR(50) NOT NULL DEFAULT 'pendente',     -- pendente, em_andamento, concluida, cancelada
    aguardando_de VARCHAR(255),    -- Nome do responsável terceiro (lista Aguardando GTD)
    aguardando_desde TIMESTAMPTZ,  -- Data em que foi delegada
    concluida_em TIMESTAMPTZ,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Tabela de Capturas (Radar de entradas brutas: texto, áudio, imagem)
CREATE TABLE IF NOT EXISTS capturas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    pilot_id UUID NOT NULL REFERENCES pilotos(id) ON DELETE CASCADE,
    voo_id UUID REFERENCES voos(id) ON DELETE SET NULL, -- Nulo quando na Caixa de Entrada
    midia VARCHAR(50) NOT NULL DEFAULT 'texto', -- texto, audio, imagem, documento
    conteudo TEXT NOT NULL,
    transcricao TEXT,
    tipo VARCHAR(50) NOT NULL DEFAULT 'ideia', -- ideia, tarefa, decisao, referencia, bloqueio, progresso
    confianca NUMERIC(4,3),                    -- Grau de certeza da IA (0.000 a 1.000)
    storage_path TEXT,                         -- Caminho no Storage (áudios e imagens originais)
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Tabela de Perguntas (Dúvidas da Bia para definição progressiva)
CREATE TABLE IF NOT EXISTS perguntas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    pilot_id UUID NOT NULL REFERENCES pilotos(id) ON DELETE CASCADE,
    voo_id UUID REFERENCES voos(id) ON DELETE CASCADE,
    texto TEXT NOT NULL,
    opcoes JSONB, -- Ex: ["Sim", "Não", "Mudar categoria"]
    status VARCHAR(50) NOT NULL DEFAULT 'pendente', -- pendente, respondida, expirada
    resposta TEXT,
    respondida_em TIMESTAMPTZ,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Tabela de Eventos (Caixa-preta cronológica dos voos)
CREATE TABLE IF NOT EXISTS eventos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    pilot_id UUID NOT NULL REFERENCES pilotos(id) ON DELETE CASCADE,
    voo_id UUID REFERENCES voos(id) ON DELETE CASCADE,
    tipo VARCHAR(100) NOT NULL, -- decolagem, waypoint_concluido, pouso, hold, turbulencia, reentrada
    dados JSONB NOT NULL DEFAULT '{}'::JSONB,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Tabela de Memórias (Memória externalizada de longo prazo e preferências)
CREATE TABLE IF NOT EXISTS memorias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    pilot_id UUID NOT NULL REFERENCES pilotos(id) ON DELETE CASCADE,
    conteudo TEXT NOT NULL,
    origem VARCHAR(100) NOT NULL DEFAULT 'conversa', -- correcao_roteamento, feedback, perfil
    embedding VECTOR(1536),
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Tabela de Rotinas (Agendamento temporal por piloto)
CREATE TABLE IF NOT EXISTS rotinas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    pilot_id UUID NOT NULL REFERENCES pilotos(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL, -- briefing, checkin, debriefing, revisao_semanal
    horario TIME NOT NULL,
    dias INT[] NOT NULL DEFAULT '{1,2,3,4,5}', -- 1=Segunda, 7=Domingo
    ativa BOOLEAN NOT NULL DEFAULT TRUE,
    ultima_execucao TIMESTAMPTZ,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Tabela de Assinaturas (Faturamento e controle de planos)
CREATE TABLE IF NOT EXISTS assinaturas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    plano VARCHAR(50) NOT NULL DEFAULT 'solo',
    status VARCHAR(50) NOT NULL DEFAULT 'trial', -- trial, ativa, cancelada, inadimplente
    renovacao TIMESTAMPTZ,
    uso_do_mes JSONB NOT NULL DEFAULT '{
        "minutos_audio": 0,
        "capturas_total": 0,
        "tokens_ia": 0
    }'::JSONB,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. Tabela de Auditoria (Logs administrativos e compliance LGPD)
CREATE TABLE IF NOT EXISTS auditoria (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    ator VARCHAR(255) NOT NULL,
    acao VARCHAR(255) NOT NULL,
    alvo VARCHAR(255) NOT NULL,
    detalhes JSONB,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices de Performance e Busca Vetorial
CREATE INDEX IF NOT EXISTS idx_voos_pilot ON voos(pilot_id, estagio);
CREATE INDEX IF NOT EXISTS idx_capturas_inbox ON capturas(pilot_id) WHERE voo_id IS NULL;
CREATE INDEX IF NOT EXISTS idx_acoes_pendentes ON acoes(waypoint_id, status);
CREATE INDEX IF NOT EXISTS idx_voos_embedding ON voos USING hnsw (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_memorias_embedding ON memorias USING hnsw (embedding vector_cosine_ops);
