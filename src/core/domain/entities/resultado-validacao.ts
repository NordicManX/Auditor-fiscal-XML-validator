export type NivelRisco = "BAIXO" | "MEDIO" | "ALTO" | "CRITICO";

export interface ResultadoValidacao {
  valido: boolean;
  codigoRejeicao?: string;
  mensagemHumana?: string;
  acaoCorretiva?: string;
  risco?: NivelRisco;
  campoAfetado?: string;
}
