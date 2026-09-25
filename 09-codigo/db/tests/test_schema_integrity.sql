-- ==============================================================================
-- BFFD — Test 001: Database Schema Integrity Verification
-- Version: 1.0.0
-- Reference: US-01 (BFFD-001)
-- ==============================================================================

DO $$
BEGIN
    -- 1. Verificar se tabelas essenciais existem
    ASSERT (SELECT to_regclass('public.tenants') IS NOT NULL), 'Tabela tenants não encontrada!';
    ASSERT (SELECT to_regclass('public.pilotos') IS NOT NULL), 'Tabela pilotos não encontrada!';
    ASSERT (SELECT to_regclass('public.voos') IS NOT NULL), 'Tabela voos não encontrada!';
    ASSERT (SELECT to_regclass('public.waypoints') IS NOT NULL), 'Tabela waypoints não encontrada!';
    ASSERT (SELECT to_regclass('public.acoes') IS NOT NULL), 'Tabela acoes não encontrada!';
    ASSERT (SELECT to_regclass('public.capturas') IS NOT NULL), 'Tabela capturas não encontrada!';
    ASSERT (SELECT to_regclass('public.eventos') IS NOT NULL), 'Tabela eventos não encontrada!';

    -- 2. Verificar colunas GTD na tabela acoes
    ASSERT (SELECT count(*) = 1 FROM information_schema.columns WHERE table_name = 'acoes' AND column_name = 'contexto'), 'Coluna contexto ausente em acoes!';
    ASSERT (SELECT count(*) = 1 FROM information_schema.columns WHERE table_name = 'acoes' AND column_name = 'energia'), 'Coluna energia ausente em acoes!';
    ASSERT (SELECT count(*) = 1 FROM information_schema.columns WHERE table_name = 'acoes' AND column_name = 'aguardando_de'), 'Coluna aguardando_de ausente em acoes!';

    -- 3. Verificar coluna embedding na tabela voos
    ASSERT (SELECT count(*) = 1 FROM information_schema.columns WHERE table_name = 'voos' AND column_name = 'embedding'), 'Coluna embedding vetorial ausente em voos!';

    RAISE NOTICE 'BFFD Schema Integrity: 100% OK! Todas as tabelas e atributos GTD validados com sucesso.';
END $$;
