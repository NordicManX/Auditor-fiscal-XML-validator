import { createClient } from "./server";
import { ResultadoValidacao } from "../../domain/entities/resultado-validacao";

export async function salvarValidacao(
  chave: string,
  ambiente: number,
  resultados: ResultadoValidacao[],
) {
  const supabase = await createClient();
  const valido = resultados.length === 0;

  const { data: validacao, error: validacaoError } = await supabase
    .from("validacoes")
    .insert({ chave_nfe: chave, ambiente, valido })
    .select("id")
    .single();

  if (validacaoError || !validacao) {
    throw new Error(validacaoError?.message);
  }

  if (!valido) {
    const errosPayload = resultados.map((erro) => ({
      validacao_id: validacao.id,
      codigo_rejeicao: erro.codigoRejeicao,
      mensagem_humana: erro.mensagemHumana,
      acao_corretiva: erro.acaoCorretiva,
      risco: erro.risco,
      campo_afetado: erro.campoAfetado,
    }));

    const { error: errosError } = await supabase
      .from("erros_validacao")
      .insert(errosPayload);

    if (errosError) {
      throw new Error(errosError.message);
    }
  }

  return validacao.id;
}
