import { RegraFiscal } from "./regra-base";
import { NotaFiscal } from "../../../domain/schemas/nota-fiscal-schema";
import { ResultadoValidacao } from "../../../domain/entities/resultado-validacao";

export class ValidaCfopCst implements RegraFiscal {
  nome = "Compatibilidade CFOP e CST";

  executar(nota: NotaFiscal): ResultadoValidacao | null {
    if (
      (nota.cfop.startsWith("5") || nota.cfop.startsWith("6")) &&
      !nota.cst &&
      !nota.csosn
    ) {
      return {
        valido: false,
        codigoRejeicao: "RXXX",
        mensagemHumana: "CST ou CSOSN ausente para CFOP de saída.",
        acaoCorretiva:
          "Informe o código de situação tributária correto no ERP.",
        risco: "ALTO",
        campoAfetado: "<CST> / <CSOSN>",
      };
    }
    return null;
  }
}
