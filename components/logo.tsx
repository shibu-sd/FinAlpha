import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import Image from 'next/image'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn('flex items-center gap-3', className)}>
            <Image
                src="/finalpha_logo.png"
                alt="Logo"
                width={36}
                height={36}
                className="w-9 h-9 md:w-10 md:h-10"
            />
            <span className="text-xl md:text-2xl font-bold tracking-tight">FinAlpha</span>
        </div>
    )
}