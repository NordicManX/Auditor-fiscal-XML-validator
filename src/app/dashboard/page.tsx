'use client'

import { useState, useCallback } from 'react'
import { UploadCloud, FileType, Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

export default function DashboardPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resultado, setResultado] = useState<any>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile?.name.endsWith('.xml')) {
      setFile(droppedFile)
      setResultado(null)
    }
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResultado(null)
    }
  }, [])

  const executarValidacao = async () => {
    if (!file) return
    
    setIsLoading(true)
    setResultado(null)

    try {
      const formData = new FormData()
      formData.append('xml', file)

      const response = await fetch('/api/validate', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      
      // Verifica se a API retornou um erro (status 400, 422, 500) ou sucesso: false
      if (!response.ok || data.sucesso === false) {
        setResultado({
          falhaCritica: true,
          erro: data.erro || 'Erro ao processar arquivo',
          motivo: data.motivo || 'O arquivo enviado não é um XML de NF-e válido ou está corrompido.'
        })
        return
      }

      setResultado(data)
    } catch (error) {
      console.error(error)
      setResultado({
        falhaCritica: true,
        erro: 'Erro de conexão',
        motivo: 'Não foi possível conectar ao motor de validação.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Validação de Pré-Transmissão</h1>
        <p className="text-gray-400">Arraste o arquivo XML da NF-e para analisar regras de IBS/CBS e consistência fiscal.</p>
      </header>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center w-full h-64 rounded-2xl border-2 border-dashed transition-all duration-300 bg-[#091E26]/80 backdrop-blur-sm ${
          isDragging 
            ? 'border-[#f25c25] bg-[#f25c25]/5 scale-[1.02]' 
            : 'border-white/20 hover:border-[#5d14a6]/50 hover:bg-white/5'
        }`}
      >
        <input 
          type="file" 
          accept=".xml" 
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
        />
        
        <div className="flex flex-col items-center pointer-events-none">
          <div className={`p-4 rounded-full mb-4 transition-colors ${isDragging ? 'bg-[#f25c25]/20 text-[#f25c25]' : 'bg-white/5 text-gray-400'}`}>
            <UploadCloud className="w-10 h-10" />
          </div>
          <p className="text-lg font-semibold text-white mb-1">
            {isDragging ? 'Solte o arquivo aqui...' : 'Clique ou arraste seu XML'}
          </p>
          <p className="text-sm text-gray-500">Apenas arquivos .xml são suportados</p>
        </div>
      </div>

      {file && !resultado && (
        <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-[#5d14a6]/20">
              <FileType className="w-6 h-6 text-[#5d14a6]" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{file.name}</p>
              <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
          <button 
            onClick={executarValidacao}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#f25c25] to-[#5d14a6] text-sm font-bold text-white shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? 'Analisando...' : 'Executar Validação'}
          </button>
        </div>
      )}

      {resultado && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Renderização de Falha Crítica do Servidor (Parse do XML falhou) */}
          {resultado.falhaCritica ? (
            <div className="p-6 rounded-2xl border bg-red-500/10 border-red-500/20 backdrop-blur-md flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-red-500 shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-red-400">
                  {resultado.erro}
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  Detalhe técnico: <span className="font-mono text-white/70">{resultado.motivo}</span>
                </p>
                <p className="text-xs text-red-400/80 mt-3 font-semibold">
                  Dica: Verifique se o arquivo enviado é realmente um XML de Nota Fiscal válido.
                </p>
              </div>
            </div>
          ) : (
            /* Renderização Padrão de Sucesso ou Erros Fiscais */
            <>
              <div className={`p-6 rounded-2xl border ${resultado.errosEncontrados === 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-orange-500/10 border-orange-500/20'} backdrop-blur-md flex items-start gap-4`}>
                {resultado.errosEncontrados === 0 ? (
                  <CheckCircle className="w-8 h-8 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-8 h-8 text-[#f25c25] shrink-0" />
                )}
                
                <div>
                  <h3 className={`text-xl font-bold ${resultado.errosEncontrados === 0 ? 'text-emerald-400' : 'text-[#f25c25]'}`}>
                    {resultado.errosEncontrados === 0 ? 'Nota Fiscal Válida' : `${resultado.errosEncontrados} Inconsistência(s) Encontrada(s)`}
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Chave: <span className="font-mono text-white">{resultado.chave || 'Não identificada'}</span>
                  </p>
                </div>
              </div>

              {resultado.errosEncontrados > 0 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Detalhamento para Correção</h4>
                  {resultado.detalhes.map((erro: any, idx: number) => (
                    <div key={idx} className="bg-[#091E26]/90 border border-white/10 rounded-xl p-5 shadow-lg relative overflow-hidden">
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${erro.risco === 'CRITICO' ? 'bg-red-500' : 'bg-[#f25c25]'}`}></div>
                      
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-mono text-gray-300 border border-white/5">
                              {erro.codigoRejeicao || 'S/N'}
                            </span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${erro.risco === 'CRITICO' ? 'bg-red-500/20 text-red-400' : 'bg-[#f25c25]/20 text-[#f25c25]'}`}>
                              Risco {erro.risco}
                            </span>
                          </div>
                          <h5 className="text-base font-medium text-white mb-1">{erro.mensagemHumana}</h5>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-1">Campo Afetado</p>
                          <code className="text-sm text-[#5d14a6] bg-[#5d14a6]/10 px-2 py-1 rounded font-mono">
                            {erro.campoAfetado || 'N/A'}
                          </code>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/5 flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-[#f25c25] shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Ação Recomendada no ERP</p>
                          <p className="text-sm text-gray-200">{erro.acaoCorretiva}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}