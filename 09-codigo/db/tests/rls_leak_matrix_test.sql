-- ==============================================================================
-- BFFD — Test 002: Row Level Security Cross-Tenant Leak Test
-- Version: 1.0.0
-- Reference: US-07 (BFFD-007), MT02
-- ==============================================================================

DO $$
DECLARE
    v_pilot_a_id UUID := 'b0000000-0000-0000-0000-000000000001';
    v_pilot_b_id UUID := 'b0000000-0000-0000-0000-000000000002';
    v_leak_count INT;
BEGIN
    -- Simular sessão autenticada do Piloto B
    PERFORM set_config('app.current_pilot_id', v_pilot_b_id::text, true);

    -- Tentar ler voos pertencentes exclusivamente ao Piloto A
    SELECT count(*) INTO v_leak_count FROM voos WHERE pilot_id = v_pilot_a_id;

    -- O RLS deve forçar o retorno a ZERO linhas visíveis
    ASSERT v_leak_count = 0, 'FALHA CRÍTICA DE RLS: Piloto B conseguiu ler dados do Piloto A!';

    RAISE NOTICE 'BFFD RLS Security Audit: 100% ISOLADO! Vazamento cross-tenant = 0.';
END $$;
