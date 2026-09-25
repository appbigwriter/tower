"""
BFFD — Semantic Router & Capture Classifier
Classifica capturas e calcula similaridade vetorial com voos ativos do piloto.
Referência: RF07 a RF13.
"""

from typing import List, Dict, Any

class SemanticRouter:
    """
    Roteador semântico de capturas aplicando limiares calibrados de confiança.
    """
    @staticmethod
    def classify_and_route(
        content: str,
        active_flights: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        content_lower = content.lower()

        # Classificação do tipo da captura (RF07)
        if any(w in content_lower for w in ["fazer", "ligar", "escrever", "comprar", "montar"]):
            tipo = "tarefa"
        elif any(w in content_lower for w in ["decidi", "vamos usar", "fechado"]):
            tipo = "decisao"
        elif any(w in content_lower for w in ["travei", "bloqueado", "esperando"]):
            tipo = "bloqueio"
        elif any(w in content_lower for w in ["conclui", "terminei", "entregue"]):
            tipo = "progresso"
        else:
            tipo = "ideia"

        # Simulação de score semântico vetorial restrito aos voos do piloto (RF08)
        best_match = None
        highest_score = 0.0

        for flight in active_flights:
            flight_name = flight.get("nome", "").lower()
            if flight_name in content_lower:
                score = 0.95
            elif any(word in content_lower for word in flight_name.split()):
                score = 0.70
            else:
                score = 0.30

            if score > highest_score:
                highest_score = score
                best_match = flight

        # Aplicação dos limiares (RF09, RF10, RF11)
        if highest_score >= 0.85 and best_match:
            action = "auto_link"
            message = f"Anotado e anexado no voo *{best_match['nome']}* ✈️"
        elif highest_score >= 0.55 and best_match:
            action = "ask_confirmation"
            message = f"Esse item pertence ao voo *{best_match['nome']}*?"
        else:
            action = "save_inbox"
            message = "Salvo na Caixa de Entrada para a próxima revisão. 📥"

        return {
            "tipo": tipo,
            "confidence": highest_score,
            "matched_flight": best_match,
            "action": action,
            "message": message
        }
