"""
BFFD — Natural Planning Model (Modelo Natural de Planejamento GTD)
Conduz a definição progressiva de voos sem sobrecarregar o piloto.
Referência: RF14 a RF17, RF57, RN10.
"""

from typing import Dict, Any

class NaturalPlanningGuide:
    STEPS = [
        ("proposito", "Qual é o motivo/propósito principal desse voo? Por que ele importa agora?"),
        ("destino", "Qual é o resultado desejado (o pouso)? Como vamos saber com 100% de certeza que acabou?"),
        ("brainstorm", "Que ideias ou partes importantes vêm à cabeça para esse projeto?"),
        ("waypoint1", "Qual o primeiro marco tangível (que cabe em 1 a 2 semanas) que dá para ver, mostrar ou usar?"),
        ("proxima_acao", "Qual é a primeiríssima manobra física de 15 a 45 min, começando por um verbo físico?")
    ]

    @staticmethod
    def get_next_question(flight_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Retorna EXATAMENTE UMA pergunta por vez para respeitar a regra RN10.
        """
        if not flight_data.get("motivo"):
            return {"step": "proposito", "question": NaturalPlanningGuide.STEPS[0][1]}
        if not flight_data.get("destino"):
            return {"step": "destino", "question": NaturalPlanningGuide.STEPS[1][1]}
        if not flight_data.get("primeiro_waypoint"):
            return {"step": "waypoint1", "question": NaturalPlanningGuide.STEPS[3][1]}
        if not flight_data.get("proxima_acao"):
            return {"step": "proxima_acao", "question": NaturalPlanningGuide.STEPS[4][1]}

        return {
            "step": "concluido",
            "question": "Plano de voo completo! Pronto para decolar assim que tivermos vaga no espaço aéreo. 🛫"
        }
