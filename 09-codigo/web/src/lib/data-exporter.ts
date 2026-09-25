/**
 * BFFD — Pilot Data Exporter (LGPD Compliance)
 * Gera exportação completa dos dados do piloto em JSON e Markdown.
 * Referência: MT09, RNF06.
 */

export interface ExportDataPayload {
  pilotInfo: { id: string; nome: string; tenantId: string };
  flights: Array<{ nome: string; destino: string; waypoints: string[] }>;
  captures: Array<{ conteudo: string; tipo: string; data: string }>;
}

export class DataExporter {
  public static exportToJson(data: ExportDataPayload): string {
    return JSON.stringify(data, null, 2);
  }

  public static exportToMarkdown(data: ExportDataPayload): string {
    let md = `# Exportação de Dados do Piloto — ${data.pilotInfo.nome}\n\n`;
    md += `**ID:** \`${data.pilotInfo.id}\` | **Tenant:** \`${data.pilotInfo.tenantId}\`\n\n`;
    md += `## Voos Registrados\n\n`;

    data.flights.forEach((f) => {
      md += `### ✈️ ${f.nome}\n`;
      md += `- **Destino:** ${f.destino}\n`;
      md += `- **Waypoints:**\n`;
      f.waypoints.forEach((wp) => {
        md += `  - ${wp}\n`;
      });
      md += `\n`;
    });

    md += `## Capturas Registradas (${data.captures.length})\n\n`;
    data.captures.forEach((c) => {
      md += `- [${c.tipo.toUpperCase()}] ${c.conteudo} _(${c.data})_\n`;
    });

    return md;
  }
}
