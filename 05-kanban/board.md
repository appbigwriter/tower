# Kanban Board — BFFD

> Projeto: **BFFD (Bring the Flights to Final Destination)** | Atualizado: 2026-09-24  
> Referência de Execução: [PLANO_DE_IMPLEMENTACAO_AUTONOMA.md](file:///f:/Projetos/_FBR/BFFD/PLANO_DE_IMPLEMENTACAO_AUTONOMA.md)

---

## Colunas do Board

### 🛫 Ready
*(Todos os cards foram executados e concluídos)*

---

### ⏳ In Progress
*(Nenhum card em execução ativa)*

---

### 🔍 Review
*(Todas as revisões e gates aprovados)*

---

### 🚫 Blocked / Awaiting Approval
*(Zero bloqueios)*

---

### ✅ Done (29/29 Cards — 100% Concluídos)

#### Release 0: Voo Solo (Sprint 1 e 2)
| Card | Título | Story ID | Evidência de Gate |
|:---|:---|:---|:---|
| **BFFD-001** | Modelagem e Schema Postgres com pgvector e GTD | `US-01` | [US-01-schema-migration.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-01-schema-migration.log) |
| **BFFD-002** | Servidor MCP com Ferramentas Nucleares e Máquina de Estados | `US-02` | [US-02-mcp-server-unit-tests.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-02-mcp-server-unit-tests.log) |
| **BFFD-003** | Integração Hermes Solo e Base de Conhecimento GTD | `US-03` | [US-03-hermes-solo-dialog.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-03-hermes-solo-dialog.log) |
| **BFFD-004** | Captura e Transcrição Ágil de Áudio/Texto (Whisper < 10s) | `US-04` | [US-04-audio-transcription-benchmark.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-04-audio-transcription-benchmark.log) |
| **BFFD-005** | Fluxo de Esclarecimento GTD, Regra dos 2 Minutos e Limites | `US-05` | [US-05-gtd-clarify-and-limits.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-05-gtd-clarify-and-limits.log) |
| **BFFD-006** | Varredura Mental Guiada Solo e Briefing Matinal (09h) | `US-06` | [US-06-briefing-scheduler.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-06-briefing-scheduler.log) |

#### Release 1: Base Multi-tenant (Sprint 3 e 4)
| Card | Título | Story ID | Evidência de Gate |
|:---|:---|:---|:---|
| **BFFD-007** | Row Level Security (RLS) em 100% das Tabelas e Testes de Vazamento | `US-07` | [US-07-rls-security-audit.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-07-rls-security-audit.log) |
| **BFFD-008** | Gateway BFFD e Hermes AIAgent como Biblioteca Python (Opção C) | `US-08` | [US-08-hermes-library-option-c.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-08-hermes-library-option-c.log) |
| **BFFD-009** | Observabilidade, Auditoria e Rastreamento de Custos de IA | `US-09` | [US-09-observability-telemetry.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-09-observability-telemetry.log) |
| **BFFD-010** | Onboarding Web e Pareamento de Uso Único no Telegram com Varredura | `US-10` | [US-10-11-12-web-and-onboarding.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-10-11-12-web-and-onboarding.log) |
| **BFFD-011** | Painel Web — Radar de Voos e Detalhes do Voo (Next.js) | `US-11` | [US-10-11-12-web-and-onboarding.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-10-11-12-web-and-onboarding.log) |
| **BFFD-012** | Painel Web — Caixa de Entrada, Configurações e Exportação LGPD | `US-12` | [US-10-11-12-web-and-onboarding.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-10-11-12-web-and-onboarding.log) |

#### Release 2: Beta Fechado (Sprint 5 a 8)
| Card | Título | Story ID | Evidência de Gate |
|:---|:---|:---|:---|
| **BFFD-013** | Classificação e Roteamento Semântico com pgvector | `US-13` | [US-13-14-15-semantic-and-planning.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-13-14-15-semantic-and-planning.log) |
| **BFFD-014** | Detecção de Tráfego Não Identificado e Modelo Natural GTD | `US-14` | [US-13-14-15-semantic-and-planning.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-13-14-15-semantic-and-planning.log) |
| **BFFD-015** | Lista Aguardando (Ações Delegadas) e Contextos nas Ações | `US-15` | [US-13-14-15-semantic-and-planning.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-13-14-15-semantic-and-planning.log) |
| **BFFD-016** | Escolha da Próxima Ação por Contexto, Tempo e Energia | `US-16` | [US-16-17-18-routines-and-action-selector.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-16-17-18-routines-and-action-selector.log) |
| **BFFD-017** | Revisão Semanal Guiada em Três Etapas (GTD na sexta às 17h) | `US-17` | [US-16-17-18-routines-and-action-selector.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-16-17-18-routines-and-action-selector.log) |
| **BFFD-018** | Check-in (14h), Debriefing (19h) e Gestão de Waypoints | `US-18` | [US-16-17-18-routines-and-action-selector.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-16-17-18-routines-and-action-selector.log) |
| **BFFD-019** | Ativação de Aproximação Final e Desvio de Escopo | `US-19` | [US-19-20-21-final-approach-and-landing.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-19-20-21-final-approach-and-landing.log) |
| **BFFD-020** | Checklist de Pouso e Pouso Parcial | `US-20` | [US-19-20-21-final-approach-and-landing.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-19-20-21-final-approach-and-landing.log) |
| **BFFD-021** | Fase de Manutenção, Geração de Novos Voos e Histórico | `US-21` | [US-19-20-21-final-approach-and-landing.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-19-20-21-final-approach-and-landing.log) |
| **BFFD-022** | Cálculo Diário de Turbulência e Ajuste do Comportamento da Bia | `US-22` | [US-22-23-24-turbulence-and-safety.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-22-23-24-turbulence-and-safety.log) |
| **BFFD-023** | Fluxo de Reentrada sem Culpa após Ausência | `US-23` | [US-22-23-24-turbulence-and-safety.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-22-23-24-turbulence-and-safety.log) |
| **BFFD-024** | Protocolo Crítico de Risco Grave e Canal de Apoio (CVV 188) | `US-24` | [US-22-23-24-turbulence-and-safety.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-22-23-24-turbulence-and-safety.log) |

#### Release 3: Lançamento & Operação (Sprint 9 e 10)
| Card | Título | Story ID | Evidência de Gate |
|:---|:---|:---|:---|
| **BFFD-025** | Assinaturas Recorrentes, Limites por Plano e Checkout | `US-25` | [US-25-26-billing-and-purge.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-25-26-billing-and-purge.log) |
| **BFFD-026** | Governança LGPD, Termos e Expurgo Automatizado (30 Dias) | `US-26` | [US-25-26-billing-and-purge.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-25-26-billing-and-purge.log) |
| **BFFD-027** | Horizontes de Foco GTD no Painel Web (Altitudes de Voo - P2) | `US-27` | [US-27-28-29-release3-final.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-27-28-29-release3-final.log) |
| **BFFD-028** | Console do Operador BFFD (Sem Acesso a Conteúdo de Voos) | `US-28` | [US-27-28-29-release3-final.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-27-28-29-release3-final.log) |
| **BFFD-029** | Dashboard de Indicadores Pessoais e Testes de Carga (1.000 Pilotos) | `US-29` | [US-27-28-29-release3-final.log](file:///f:/Projetos/_FBR/BFFD/04-evidencias/US-27-28-29-release3-final.log) |

---

## Métricas Finais de Progresso

| Métrica | Valor |
|---------|-------|
| Total de Stories | 29 |
| Concluídas (Done) | **29 (100.0%)** |
| Ready / In Progress / Blocked | 0 |
| Releases Implementadas | **4/4 (R0, R1, R2, R3)** |
| Evidências de Gate Geradas | **10 Logs em `04-evidencias/`** |