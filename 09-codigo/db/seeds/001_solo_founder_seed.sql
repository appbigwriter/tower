-- ==============================================================================
-- BFFD — Seed 001: Solo Founder & Demo Flights Data
-- Version: 1.0.0
-- Reference: US-01 (BFFD-001)
-- ==============================================================================

-- 1. Inserir Tenant Fundador
INSERT INTO tenants (id, nome, tipo, plano, status)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'Conta Fundador BFFD',
    'individual',
    'solo',
    'ativo'
) ON CONFLICT (id) DO NOTHING;

-- 2. Inserir Piloto Fundador (Sergio)
INSERT INTO pilotos (id, tenant_id, nome, telegram_user_id, fuso, estado_turbulencia)
VALUES (
    'b0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'Sergio',
    999999999, -- ID simulado do Telegram
    'America/Sao_Paulo',
    'normal'
) ON CONFLICT (id) DO NOTHING;

-- 3. Inserir Voo em Rota Demonstrativo
INSERT INTO voos (id, tenant_id, pilot_id, nome, categoria, estagio, destino, motivo, prazo, prioridade, energia)
VALUES (
    'c0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    'App Clínica',
    'profissional',
    'em_rota',
    'Lançar MVP do prontuário para os 5 primeiros médicos parceiros',
    'Validar modelo de negócio e fluxo de atendimento',
    CURRENT_DATE + INTERVAL '30 days',
    1,
    'alta'
) ON CONFLICT (id) DO NOTHING;

-- 4. Inserir Waypoint 1 do Voo App Clínica
INSERT INTO waypoints (id, tenant_id, voo_id, titulo, criterio_pronto, ordem, status)
VALUES (
    'd0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'Módulo de Autenticação e Perfil Médico',
    'Médico consegue logar com e-mail/senha e ver tela inicial',
    1,
    'em_andamento'
) ON CONFLICT (id) DO NOTHING;

-- 5. Inserir Primeira Próxima Ação (com atributos GTD)
INSERT INTO acoes (id, tenant_id, waypoint_id, descricao, minutos, contexto, energia, status)
VALUES (
    'e0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000001',
    'Montar a tela de login no Next.js com formulário e validação Zod',
    40,
    'computador',
    'alta',
    'pendente'
) ON CONFLICT (id) DO NOTHING;

-- 6. Inserir Evento Inicial na Caixa-preta
INSERT INTO eventos (tenant_id, pilot_id, voo_id, tipo, dados)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'b0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'decolagem',
    '{"mensagem": "Voo App Clínica decolou com sucesso", "categoria": "profissional"}'::JSONB
);
