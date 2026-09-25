"""
BFFD — Testes Automatizados da Persona e Diretrizes da Bia Torres
Verifica comprimento de resposta, restrições e tom.
"""

from src.persona import get_system_prompt

def test_system_prompt_contains_core_rules():
    prompt = get_system_prompt()
    assert "Bia Torres" in prompt
    assert "MENSAGENS CURTAS" in prompt
    assert "UMA PERGUNTA POR VEZ" in prompt
    assert "SEM COBRANÇAS OU CULPA" in prompt
    assert "COACH DE GTD" in prompt
    assert "MODO TURBULÊNCIA" in prompt
    assert "CVV 188" in prompt

def test_persona_line_limit_guideline():
    prompt = get_system_prompt()
    assert "máximo 3 linhas" in prompt.lower() or "no máximo 3 linhas" in prompt.lower()
