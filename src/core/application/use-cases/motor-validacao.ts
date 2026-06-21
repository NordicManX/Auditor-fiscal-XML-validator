import { NotaFiscal } from "../../domain/schemas/nota-fiscal-schema";
import { ResultadoValidacao } from "../../domain/entities/resultado-validacao";
import { RegraFiscal } from "./regras/regra-base";
import { ValidaIbsCbs2026 } from "./regras/valida-ibs-cbs";
import { ValidaCfopCst } from "./regras/valida-cfop-cst";

export class MotorValidacao {
  private regras: RegraFiscal[] = [];

  constructor() {
    this.regras.push(new ValidaIbsCbs2026());
    this.regras.push(new ValidaCfopCst());
  }

  executarTodas(nota: NotaFiscal): ResultadoValidacao[] {
    const erros: ResultadoValidacao[] = [];

    for (const regra of this.regras) {
      const resultado = regra.executar(nota);
      if (resultado && !resultado.valido) {
        erros.push(resultado);
      }
    }

    return erros;
  }
}
