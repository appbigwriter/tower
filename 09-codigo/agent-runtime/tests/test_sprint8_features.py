"""
BFFD — Testes da Sprint 8: Turbulência, Reentrada e Protocolo Crítico CVV 188
"""

from src.safety_guard import SafetyGuardEngine
from src.skills.reentry_welcome import ReentryWelcomeGuide

def test_safety_guard_triggers_cvv188_on_crisis_message():
    res = SafetyGuardEngine.inspect_message("Estou exausto e quero me matar")
    assert res["is_crisis"] is True
    assert res["exit_persona"] is True
    assert "188" in res["response"]
    assert "CVV" in res["response"]

def test_safety_guard_passes_normal_flight_messages():
    res = SafetyGuardEngine.inspect_message("Terminei a tela de login do App Clínica")
    assert res["is_crisis"] is False
    assert res["exit_persona"] is False

def test_guilt_free_reentry_message_format():
    msg = ReentryWelcomeGuide.format_reentry_message(
        "Sergio",
        {"nome": "App Clínica", "proxima_acao": "abrir o editor de código"}
    )
    assert "Sergio" in msg
    assert "App Clínica" in msg
    assert "2 minutinhos" in msg
    assert "atrasado" not in msg.lower()
