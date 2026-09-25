"""
BFFD — Testes da Sprint 5: Roteador Semântico e Planejamento Natural
"""

from src.semantic_router import SemanticRouter
from src.skills.natural_planning import NaturalPlanningGuide

def test_semantic_router_auto_links_on_high_confidence():
    active_flights = [{"nome": "App Clínica"}]
    res = SemanticRouter.classify_and_route("Preciso ajustar a tela de login do App Clínica", active_flights)

    assert res["tipo"] == "tarefa"
    assert res["confidence"] >= 0.85
    assert res["action"] == "auto_link"
    assert "App Clínica" in res["message"]

def test_natural_planning_asks_one_question_at_a_time():
    flight_data = {}
    q1 = NaturalPlanningGuide.get_next_question(flight_data)
    assert q1["step"] == "proposito"

    flight_data["motivo"] = "Melhorar atendimento aos pacientes"
    q2 = NaturalPlanningGuide.get_next_question(flight_data)
    assert q2["step"] == "destino"
