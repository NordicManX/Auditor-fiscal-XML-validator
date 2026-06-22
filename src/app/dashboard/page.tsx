'use client'

import { useState, useCallback } from 'react'
import { UploadCloud, FileType, AlertCircle } from 'lucide-react'

export default function DashboardPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)

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
    }
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) setFile(selectedFile)
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Validação de Pré-Transmissão</h1>
        <p className="text-gray-400">Arraste o arquivo XML da NF-e para analisar regras de IBS/CBS e consistência fiscal.</p>
      </header>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center w-full h-80 rounded-2xl border-2 border-dashed transition-all duration-300 bg-[#091E26]/80 backdrop-blur-sm ${
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

      {file && (
        <div className="mt-6 flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
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
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#f25c25] to-[#5d14a6] text-sm font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
            onClick={() => {/* Implementaremos a chamada à API aqui */}}
          >
            Executar Validação
          </button>
        </div>
      )}
    </div>
  )
}