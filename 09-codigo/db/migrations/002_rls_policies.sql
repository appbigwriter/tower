-- ==============================================================================
-- BFFD — Migration 002: Strict Row Level Security (RLS) Policies
-- Version: 1.0.0
-- Reference: US-07 (BFFD-007), MT01, MT02, RNF02
-- ==============================================================================

-- 1. Habilitar RLS em todas as tabelas de domínio
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE pilotos ENABLE ROW LEVEL SECURITY;
ALTER TABLE membros ENABLE ROW LEVEL SECURITY;
ALTER TABLE voos ENABLE ROW LEVEL SECURITY;
ALTER TABLE waypoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE acoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE capturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE perguntas ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE memorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE rotinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE assinaturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditoria ENABLE ROW LEVEL SECURITY;

-- Forçar RLS mesmo para donos da tabela (proteção absoluta)
ALTER TABLE voos FORCE ROW LEVEL SECURITY;
ALTER TABLE waypoints FORCE ROW LEVEL SECURITY;
ALTER TABLE acoes FORCE ROW LEVEL SECURITY;
ALTER TABLE capturas FORCE ROW LEVEL SECURITY;
ALTER TABLE memorias FORCE ROW LEVEL SECURITY;

-- 2. Políticas para VOOS (Isolamento por Pilot ID)
DROP POLICY IF EXISTS voos_pilot_isolation ON voos;
CREATE POLICY voos_pilot_isolation ON voos
    FOR ALL
    USING (
        pilot_id::text = current_setting('app.current_pilot_id', true)
        OR auth.uid() IN (
            SELECT auth_user_id FROM membros WHERE tenant_id = voos.tenant_id
        )
    )
    WITH CHECK (
        pilot_id::text = current_setting('app.current_pilot_id', true)
    );

-- 3. Políticas para CAPTURAS
DROP POLICY IF EXISTS capturas_pilot_isolation ON capturas;
CREATE POLICY capturas_pilot_isolation ON capturas
    FOR ALL
    USING (pilot_id::text = current_setting('app.current_pilot_id', true))
    WITH CHECK (pilot_id::text = current_setting('app.current_pilot_id', true));

-- 4. Políticas para MEMÓRIAS
DROP POLICY IF EXISTS memorias_pilot_isolation ON memorias;
CREATE POLICY memorias_pilot_isolation ON memorias
    FOR ALL
    USING (pilot_id::text = current_setting('app.current_pilot_id', true))
    WITH CHECK (pilot_id::text = current_setting('app.current_pilot_id', true));

-- 5. Políticas para WAYPOINTS e AÇÕES (via voos/waypoints)
DROP POLICY IF EXISTS waypoints_pilot_isolation ON waypoints;
CREATE POLICY waypoints_pilot_isolation ON waypoints
    FOR ALL
    USING (voo_id IN (SELECT id FROM voos WHERE pilot_id::text = current_setting('app.current_pilot_id', true)));

DROP POLICY IF EXISTS acoes_pilot_isolation ON acoes;
CREATE POLICY acoes_pilot_isolation ON acoes
    FOR ALL
    USING (waypoint_id IN (
        SELECT w.id FROM waypoints w 
        JOIN voos v ON v.id = w.voo_id 
        WHERE v.pilot_id::text = current_setting('app.current_pilot_id', true)
    ));
