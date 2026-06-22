import { NextResponse } from "next/server";
import { parseXmlNfe } from "@/core/infra/parsers/xml-parser";
import { MotorValidacao } from "@/core/application/use-cases/motor-validacao";
import { salvarValidacao } from "@/core/infra/supabase/validacao-repository";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("xml") as File;

    if (!file) {
      return NextResponse.json(
        { erro: "Arquivo XML não fornecido." },
        { status: 400 },
      );
    }

    const xmlData = await file.text();

    const notaFiscal = parseXmlNfe(xmlData);
    const motor = new MotorValidacao();
    const resultados = motor.executarTodas(notaFiscal);

    const validacaoId = await salvarValidacao(
      notaFiscal.chave,
      2026,
      resultados,
    );

    return NextResponse.json(
      {
        sucesso: true,
        id: validacaoId,
        chave: notaFiscal.chave,
        ambiente: 2026,
        errosEncontrados: resultados.length,
        detalhes: resultados,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        sucesso: false,
        erro: "Falha ao processar o XML da NF-e.",
        motivo: error.message,
      },
      { status: 422 },
    );
  }
}
