'use client'
import Link from 'next/link'
import { Logo } from '../logo'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { ModeToggle } from '../theme/mode-toggle'

const menuItems = [
    { name: 'Home', href: '/' },
    // { name: 'Trends', href: '/trends' }, // Hidden for now
    { name: 'Tools', href: '/tools' },
    { name: 'Blogs', href: '/blogs' },
    // { name: 'Quiz', href: '/quiz' }, // Hidden for now
    { name: 'Invest', href: '/invest' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <header>
            <nav
                data-state={menuState ? 'active' : ''}
                className="fixed top-0 z-50 w-full px-4 pt-4 transition-all duration-500">
                <div className={cn('mx-auto max-w-6xl px-6 transition-all duration-500 rounded-full', isScrolled ? 'bg-background/80 dark:bg-background/60 max-w-4xl border border-border/50 shadow-lg shadow-black/5 backdrop-blur-xl lg:px-8 py-1' : 'bg-transparent py-2')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 lg:gap-0">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-10 xl:gap-12 text-lg font-medium">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-background/95 backdrop-blur-lg in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-border/40 p-6 shadow-2xl shadow-black/10 dark:shadow-black/40 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent transition-all">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-xl font-medium">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <ModeToggle />
                                {/* 
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden')}>
                                    <Link href="/login" target="_blank" rel="noopener noreferrer">
                                        <span>Login</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden')}>
                                    <Link href="/invest">
                                        <span>Sign Up</span>
                                    </Link>
                                </Button>
                                */}
                                {/*
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn('rounded-full transition-transform hover:scale-105', isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                    <Link href="/invest">
                                        <span>Get Started</span>
                                    </Link>
                                </Button>
                                */}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
