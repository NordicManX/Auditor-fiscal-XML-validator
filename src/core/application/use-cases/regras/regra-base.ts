import { NotaFiscal } from "../../../domain/schemas/nota-fiscal-schema";
import { ResultadoValidacao } from "../../../domain/entities/resultado-validacao";

export interface RegraFiscal {
  nome: string;
  executar(nota: NotaFiscal): ResultadoValidacao | null;
}
