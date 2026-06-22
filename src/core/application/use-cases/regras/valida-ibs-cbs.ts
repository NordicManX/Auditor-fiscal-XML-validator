import { RegraFiscal } from "./regra-base";
import { NotaFiscal } from "../../../domain/schemas/nota-fiscal-schema";
import { ResultadoValidacao } from "../../../domain/entities/resultado-validacao";

export class ValidaIbsCbs2026 implements RegraFiscal {
  nome = "Validação IBS/CBS (2026)";

  executar(nota: NotaFiscal): ResultadoValidacao | null {
    const cstIsentos = ["40", "41", "50", "51"];
    const csosnIsentos = ["300", "400", "500"];

    const isentoIbsCbs =
      (nota.cst && cstIsentos.includes(nota.cst)) ||
      (nota.csosn && csosnIsentos.includes(nota.csosn));

    if (isentoIbsCbs) {
      return null;
    }

    if (nota.vIBS === undefined || nota.vCBS === undefined) {
      return {
        valido: false,
        codigoRejeicao: "R999",
        mensagemHumana:
          "Ausência dos novos tributos IBS e CBS exigidos para esta operação.",
        acaoCorretiva:
          "Verifique a tributação. Se não for isento, preencha as tags <IBS> e <CBS>.",
        risco: "CRITICO",
        campoAfetado: "<IBSCBS>",
      };
    }

    return null;
  }
}
