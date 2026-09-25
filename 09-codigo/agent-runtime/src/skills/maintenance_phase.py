"""
BFFD — Maintenance Phase Skill (Fase de Manutenção Pós-Pouso)
Conduz a manutenção com passageiros a bordo e prepara novos voos.
Referência: RF38, RF48, RN07, Seção 6.
"""

class MaintenancePhaseGuide:
    @staticmethod
    def get_maintenance_prompt(flight_name: string) -> str:
        return (
            f"Voo *{flight_name}* devidamente pousado! 🛫🎉\n"
            f"Bora fazer a manutenção rápida:\n"
            f"1) O que precisamos repor (energia, ferramentas, tarefas de apoio)?\n"
            f"2) Qual foi o principal aprendizado da rota?\n"
            f"3) Alguma ideia do backlog pós-pouso já está pronta para virar um novo voo?"
        )
