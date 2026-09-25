"""
BFFD — Guilt-free Re-entry Skill (Reentrada Acolhedora sem Culpa)
Recebe o piloto após ausência com resumo limpo de onde os voos pararam.
Referência: RF42, J6, Princípio 5.
"""

from typing import List, Dict, Any

class ReentryWelcomeGuide:
    @staticmethod
    def format_reentry_message(pilot_name: str, main_flight: Dict[str, Any]) -> str:
        flight_name = main_flight.get("nome", "seu voo principal")
        next_step = main_flight.get("proxima_acao", "abrir o arquivo do projeto")
        
        return (
            f"Que bom te ver de volta, {pilot_name}! ☕🛫\n"
            f"O céu tá calmo por aqui. Nosso voo *{flight_name}* tá estacionado e pronto.\n"
            f"Pra retomar sem pressa, uma manobra de 2 minutinhos: {next_step}. Bora?"
        )
