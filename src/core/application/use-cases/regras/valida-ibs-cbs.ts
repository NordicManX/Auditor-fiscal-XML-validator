import { RegraFiscal } from "./regra-base";
import { NotaFiscal } from "../../../domain/schemas/nota-fiscal-schema";
import { ResultadoValidacao } from "../../../domain/entities/resultado-validacao";

export class ValidaIbsCbs2026 implements RegraFiscal {
  nome = "Validação IBS/CBS (2026)";

  executar(nota: NotaFiscal): ResultadoValidacao | null {
    if (nota.vIBS === undefined || nota.vCBS === undefined) {
      return {
        valido: false,
        codigoRejeicao: "R999",
        mensagemHumana: "Ausência dos novos tributos IBS e CBS exigidos.",
        acaoCorretiva:
          "Preencha as tags <IBS> e <CBS> no grupo de impostos do produto.",
        risco: "CRITICO",
        campoAfetado: "<IBSCBS>",
      };
    }
    return null;
  }
}
