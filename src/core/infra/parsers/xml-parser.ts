import { XMLParser } from "fast-xml-parser";
import {
  NotaFiscal,
  NotaFiscalSchema,
} from "../../domain/schemas/nota-fiscal-schema";

export function parseXmlNfe(xmlData: string): NotaFiscal {
  const parser = new XMLParser({
    ignoreAttributes: false,
    parseTagValue: false,
    attributeNamePrefix: "",
  });

  const jsonObj = parser.parse(xmlData);
  const infNFe = jsonObj.nfeProc?.NFe?.infNFe || jsonObj.NFe?.infNFe;

  if (!infNFe) {
    throw new Error("XML inválido");
  }

  const itens = Array.isArray(infNFe.det) ? infNFe.det : [infNFe.det];
  const primeiroItem = itens[0];
  const imposto = primeiroItem?.imposto;
  const ibsCbs = imposto?.IBSCBS;

  const rawData = {
    chave: infNFe.Id?.replace("NFe", ""),
    naturezaOperacao: infNFe.ide?.natOp,
    cfop: primeiroItem?.prod?.CFOP?.toString(),
    cst: imposto?.ICMS?.[Object.keys(imposto?.ICMS || {})[0]]?.CST?.toString(),
    csosn:
      imposto?.ICMS?.[Object.keys(imposto?.ICMS || {})[0]]?.CSOSN?.toString(),
    cnpjEmitente: infNFe.emit?.CNPJ,
    cnpjDestinatario: infNFe.dest?.CNPJ,
    valorTotal: Number(infNFe.total?.ICMSTot?.vNF),
    vIBS: ibsCbs ? Number(ibsCbs.vIBS || 0) : undefined,
    vCBS: ibsCbs ? Number(ibsCbs.vCBS || 0) : undefined,
    cIBSCBS: ibsCbs?.cIBSCBS?.toString(),
  };

  return NotaFiscalSchema.parse(rawData);
}
