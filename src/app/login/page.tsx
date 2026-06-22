import { login } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#091E26] overflow-hidden font-sans">
      {/* Efeitos de luz vibrantes no fundo (Glow) */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#f25c25]/15 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#5d14a6]/25 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md space-y-8 rounded-2xl bg-[#091E26]/80 p-10 shadow-[0_0_40px_rgba(93,20,166,0.15)] backdrop-blur-xl border border-white/10">
        
        {/* Header com Ícone e Gradiente */}
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f25c25] to-[#5d14a6] shadow-lg shadow-[#f25c25]/30">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-white">
            Compliance NFe
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Motor de Validação e Inteligência Fiscal
          </p>
        </div>

        <form className="mt-8 space-y-6" action={login}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                E-mail Corporativo
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-white shadow-sm placeholder:text-gray-500 focus:border-[#f25c25] focus:bg-white/10 focus:ring-2 focus:ring-[#f25c25]/50 transition-all sm:text-sm outline-none"
                placeholder="admin@erpsystem.com.br"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Senha de Acesso
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-white shadow-sm placeholder:text-gray-500 focus:border-[#f25c25] focus:bg-white/10 focus:ring-2 focus:ring-[#f25c25]/50 transition-all sm:text-sm outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {params?.error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
              <p className="text-sm text-red-400 text-center font-medium">Credenciais inválidas. Tente novamente.</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-xl bg-gradient-to-r from-[#f25c25] to-[#5d14a6] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#f25c25]/25 hover:from-[#e04b14] hover:to-[#4a0d85] focus:outline-none focus:ring-2 focus:ring-[#f25c25] focus:ring-offset-2 focus:ring-offset-[#091E26] transition-all active:scale-[0.98]"
            >
              Acessar Plataforma
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}