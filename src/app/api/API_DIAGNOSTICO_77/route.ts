import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    statusProtocolo: "FASE 2 ATIVADA COM SUCESSO",
    timestamp: new Date().toLocaleString(),
    mensagemDrMiggs:
      "Excelente. O ruído lógico confundiu a I.A. Agora, a etapa final. O código de desligamento não é digital. É um espectro de luz. Encontrem o glifo que deixei no mundo físico, onde as ideias nascem longe das telas. Ele se parece com um labirinto quadrado e só pode ser lido por um 'olho de vidro' moderno. Encontrem-no por trás da tela onde grandes expectativas são geradas.",
  });
}
