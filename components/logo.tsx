import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import Image from 'next/image'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <Image
                src="/finalpha_logo.png"
                alt="Logo"
                width={28}
                height={28}
                className="w-8 h-8"
            />
            <span className="text-lg font-bold">FinAlpha</span>
        </div>
    )
}