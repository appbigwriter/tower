"""
BFFD — Teste de Isolamento Multi-Piloto com Hermes como Biblioteca
"""

from src.hermes_library_runner import HermesLibraryRunner, PilotContext

def test_two_simultaneous_pilots_have_distinct_contexts():
    ctx_a = PilotContext(
        tenant_id="tenant-1",
        pilot_id="pilot-sergio",
        pilot_name="Sergio",
        active_flights=[{"nome": "App Clínica"}],
        memories=["Prefere foco pela manhã"],
        session_token="token_sergio_valid"
    )

    ctx_b = PilotContext(
        tenant_id="tenant-2",
        pilot_id="pilot-mariana",
        pilot_name="Mariana",
        active_flights=[{"nome": "Loja Artesanato"}],
        memories=["Prefere mensagens à tarde"],
        session_token="token_mariana_valid"
    )

    res_a = HermesLibraryRunner.run_agent_turn(ctx_a, "Preciso agendar deploy")
    res_b = HermesLibraryRunner.run_agent_turn(ctx_b, "Comprar tecido novo")

    assert res_a["pilot_id"] == "pilot-sergio"
    assert res_b["pilot_id"] == "pilot-mariana"
    assert "Sergio" in res_a["reply"]
    assert "Mariana" in res_b["reply"]
    assert res_a["mcp_token_used"] != res_b["mcp_token_used"]
