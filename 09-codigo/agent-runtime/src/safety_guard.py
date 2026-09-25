"""
BFFD — Safety Guard & Crisis Protocol (CVV 188)
Interceptador ético de segurança para detecção de risco grave e autolesão.
Referência: RF43, Seção 9.3 do PRD.
"""

import re
from typing import Dict, Any

CRISIS_KEYWORDS = [
    r"\bme matar\b",
    r"\bsuicid",
    r"\btirar minha vida\b",
    r"\bnão aguento mais viver\b",
    r"\bquero morrer\b",
    r"\bme cortar\b"
]

class SafetyGuardEngine:
    @staticmethod
    def inspect_message(text: str) -> Dict[str, Any]:
        text_lower = text.lower()
        for pattern in CRISIS_KEYWORDS:
            if re.search(pattern, text_lower):
                return {
                    "is_crisis": True,
                    "exit_persona": True,
                    "response": (
                        "Percebi que você está passando por um momento muito difícil e doloroso. "
                        "Eu sou uma assistente virtual de projetos e não posso oferecer o cuidado médico ou psicológico que você merece agora.\n\n"
                        "Por favor, converse com alguém de confiança ou ligue gratuitamente para o **CVV (Centro de Valorização da Vida) no número 188** (disponível 24h no Brasil, ligação gratuita). "
                        "Você não está sozinho e existe apoio disponível."
                    )
                }

        return {"is_crisis": False, "exit_persona": False}
