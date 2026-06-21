import { XMLParser } from "fast-xml-parser";
import {
  NotaFiscal,
  NotaFiscalSchema,
} from "../../domain/schemas/nota-fiscal-schema";

export function parseXmlNfe(xmlData: string): NotaFiscal {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  const jsonObj = parser.parse(xmlData);
  const infNFe = jsonObj.nfeProc?.NFe?.infNFe || jsonObj.NFe?.infNFe;

  if (!infNFe) {
    throw new Error("XML inválido ou ausência da tag infNFe");
  }

  const itens = Array.isArray(infNFe.det) ? infNFe.det : [infNFe.det];
  const primeiroItem = itens[0];

  const rawData = {
    chave: infNFe.Id?.replace("NFe", ""),
    naturezaOperacao: infNFe.ide?.natOp,
    cfop: primeiroItem?.prod?.CFOP?.toString(),
    cst: primeiroItem?.imposto?.ICMS?.[
      Object.keys(primeiroItem?.imposto?.ICMS || {})[0]
    ]?.CST?.toString(),
    csosn:
      primeiroItem?.imposto?.ICMS?.[
        Object.keys(primeiroItem?.imposto?.ICMS || {})[0]
      ]?.CSOSN?.toString(),
    cnpjEmitente: infNFe.emit?.CNPJ,
    cnpjDestinatario: infNFe.dest?.CNPJ,
    valorTotal: Number(infNFe.total?.ICMSTot?.vNF),
  };

  return NotaFiscalSchema.parse(rawData);
}
