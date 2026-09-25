"""
BFFD — Mind Sweep (Varredura Mental Guiada GTD)
Conduz o piloto por gatilhos das áreas da vida no onboarding e revisão.
Referência: RF50, J1.
"""

MIND_SWEEP_CATEGORIES = [
    "Trabalho e Projetos Pendentes",
    "Finanças e Contas a Pagar",
    "Casa, Família e Compromissos Pessoais",
    "Saúde, Bem-estar e Consultas",
    "Ideias, Cursos e Hobbies no Hangar"
]

class MindSweepGuide:
    @staticmethod
    def get_prompt_for_category(index: int) -> str:
        if index < len(MIND_SWEEP_CATEGORIES):
            cat = MIND_SWEEP_CATEGORIES[index]
            return f"Bora esvaziar a mente! Na área de *{cat}*, tem alguma coisa voando solta na sua cabeça agora?"
        return "Show de bola! Radar varrido e mente limpa por enquanto. Bora escolher o voo prioritário? 🛫"
