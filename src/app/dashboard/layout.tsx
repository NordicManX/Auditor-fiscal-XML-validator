import { ReactNode } from 'react'
import { FileCheck, History, Settings, LogOut } from 'lucide-react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#091E26] overflow-hidden">
      <aside className="w-64 border-r border-white/10 bg-[#091E26]/50 flex flex-col backdrop-blur-xl">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#f25c25] to-[#5d14a6] shadow-lg shadow-[#f25c25]/20">
              <FileCheck className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-white tracking-wide">Compliance</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <a href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#f25c25]/10 text-[#f25c25] border border-[#f25c25]/20 font-medium transition-colors">
            <FileCheck className="h-5 w-5" />
            Validar NFe
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
            <History className="h-5 w-5" />
            Histórico
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
            <Settings className="h-5 w-5" />
            Regras Fiscais
          </a>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 relative overflow-y-auto">
        <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#5d14a6]/10 blur-[150px] pointer-events-none"></div>
        <div className="relative z-10 p-8">
          {children}
        </div>
      </main>
    </div>
  )
}