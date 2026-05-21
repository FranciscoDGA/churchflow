'use client'

import { Bell, Search, Menu, ChevronDown } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface AppTopbarProps {
  onMenuToggle?: () => void
  title?: string
}

export function AppTopbar({ onMenuToggle, title }: AppTopbarProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 gap-4 flex-shrink-0">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuToggle}>
          <Menu className="w-5 h-5" />
        </Button>
        {title && <h1 className="font-semibold text-[#0F172A] text-lg hidden sm:block">{title}</h1>}
      </div>

      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Buscar membros, eventos, células..." className="pl-9 bg-gray-50 border-gray-200 h-9 text-sm" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#F43F5E] rounded-full" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className={cn('flex items-center gap-2 h-9 px-2 rounded-lg hover:bg-gray-100 transition-colors')}>
            <Avatar className="w-7 h-7">
              <AvatarFallback className="bg-[#0EA5E9] text-white text-xs font-bold">JS</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium text-[#0F172A]">João Silva</div>
              <div className="text-xs text-gray-400">Pastor</div>
            </div>
            <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:block" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <div className="font-medium text-sm">João Silva</div>
              <div className="text-xs text-gray-400">joao@email.com</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href="/app/perfil" className="w-full">Meu Perfil</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href="/app/configuracoes" className="w-full">Configurações</Link></DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/app/planos" className="w-full flex items-center justify-between">
                Meu Plano
                <Badge className="ml-2 text-xs bg-[#0EA5E9] text-white">Plus</Badge>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Link href="/login" className="w-full">Sair</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
