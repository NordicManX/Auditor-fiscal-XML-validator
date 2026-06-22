import { z } from "zod";

export const NotaFiscalSchema = z.object({
  chave: z.string().length(44),
  naturezaOperacao: z.string(),
  cfop: z.string(),
  cst: z.string().optional(),
  csosn: z.string().optional(),
  cnpjEmitente: z.string(),
  cnpjDestinatario: z.string().optional(), // Agora é opcional
  cpfDestinatario: z.string().optional(), // Novo campo adicionado
  valorTotal: z.number(),
  vIBS: z.number().optional(),
  vCBS: z.number().optional(),
  cIBSCBS: z.string().optional(),
});

export type NotaFiscal = z.infer<typeof NotaFiscalSchema>;
