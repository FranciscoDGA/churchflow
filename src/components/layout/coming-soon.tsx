import { Construction } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ComingSoonProps {
  title: string
  description?: string
  plan?: string
}

export function ComingSoon({ title, description, plan }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
        <Construction className="w-10 h-10 text-gray-400" />
      </div>
      <h1 className="text-2xl font-bold text-[#0F172A] mb-2">{title}</h1>
      <p className="text-gray-500 max-w-md mb-6">
        {description || 'Este módulo está em desenvolvimento e será disponibilizado em breve.'}
      </p>
      {plan && (
        <p className="text-sm text-[#0EA5E9] mb-4">Disponível no plano {plan} ou superior.</p>
      )}
      <Link href="/app" className={cn(buttonVariants({ variant: 'outline' }))}>
        Voltar ao Dashboard
      </Link>
    </div>
  )
}
