"""
BFFD — Weekly Review Skill (Revisão Semanal GTD em 3 Etapas)
Conduz a revisão de sexta às 17h: 1) Esvaziar, 2) Atualizar, 3) Criar.
Referência: RF31, RF56, RN14.
"""

from typing import Dict, Any

class WeeklyReviewFlow:
    STEPS = {
        "esvaziar": "Etapa 1 (Esvaziar): Vamos processar as capturas soltas na sua Caixa de Entrada. Tem {inbox_count} itens esperando.",
        "atualizar": "Etapa 2 (Atualizar): Dando uma olhada nos seus voos em rota e na lista Aguardando. Algum projeto precisa de pausa ou nova manobra?",
        "criar": "Etapa 3 (Criar): Olhando os voos em hold e novas ideias no hangar. Algum projeto sobe para voar na próxima semana?",
        "celebrar": "Revisão semanal concluída com sucesso! Céu limpo e radar atualizado. Bom descanso no fim de semana, piloto! 🛫🎉"
    }

    @staticmethod
    def get_step_prompt(step: str, context: Dict[str, Any] = {}) -> str:
        template = WeeklyReviewFlow.STEPS.get(step, WeeklyReviewFlow.STEPS["esvaziar"])
        return template.format(inbox_count=context.get("inbox_count", 0))
