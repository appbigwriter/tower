# Roadmap — GFTD

> Projeto: **GFTD** | Versão: 1.0 | Data: 2026-09-11

---

## Visão de Longo Prazo

> Descreva onde o projeto deve estar em 6-12 meses.

---

## Fases e Marcos

| Fase | Marco | Entregável | Data Alvo | Owner | Critério de Pronto | Gate |
|------|-------|------------|-----------|-------|-------------------|------|
| 1. Descoberta | M1 | Briefing + CAs | — | Íris | Intake aprovado | — |
| 1. Descoberta | M2 | PRD v1.0 | — | PO/Íris | PRD aprovado por Sergio | Sergio |
| 2. Fundação | M3 | ADR-000 + PoC | — | Théo | ADR aprovado + PoC validado | Gabe/Sergio |
| 2. Fundação | M4 | Infra base (repo, CI, deploy staging) | — | Théo | Deploy staging funcional | Gabe |
| 3. MVP | M5 | Core feature 1 | — | Théo | CA-XXX passam | Gabe |
| 3. MVP | M6 | Core feature 2 | — | Théo | CA-YYY passam | Gabe |
| 3. MVP | M7 | MVP completo | — | Théo | Todos CAs do MVP | Sergio |
| 4. Hardening | M8 | Testes, docs, observabilidade | — | Théo/Gabe | Cobertura >80%, runbooks | Gabe |
| 5. Launch | M9 | Produção | — | Théo/Sergio | Deploy prod + health checks | Sergio |

---

## Dependências entre Fases

```text
Fase 1 → Fase 2 → Fase 3 → Fase 4 → Fase 5
   │        │        │        │        │
  M1,M2    M3,M4    M5-M7    M8       M9
```

---

## Capacidade e Alocação

| Sprint | Período | Foco | Capacidade (pts) | Alocado |
|--------|---------|------|------------------|---------|
| 1 | — | Descoberta | — | — |
| 2 | — | Fundação | — | — |
| 3 | — | MVP | — | — |

---

## Revisão de Roadmap

| Data | Versão | Mudanças | Aprovado por |
|------|--------|----------|--------------|
| 2026-09-11 | 1.0 | Criação inicial | — |

---

## Observações

> Registre aqui mudanças de prioridade, pivôs, decisões de escopo, dependências externas que afetem o cronograma.