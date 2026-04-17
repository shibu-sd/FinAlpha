import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

type Testimonial = {
    name: string
    role: string
    image: string
    quote: string
}

const testimonials: Testimonial[] = [
    {
        name: 'Sahil Arora',
        role: 'Retail Investor',
        image: '/testimonials/sahil.jpg',
        quote: 'FinAlpha makes the entire process incredibly effortless. The continuous guidance and support are always there whenever I need them.',
    },
    {
        name: 'Priyanka Vishwas',
        role: 'First-Time Investor',
        image: '',
        quote: 'Thanks to FinAlpha, I finally started a dedicated SIP for my child\'s education. Honestly, I am extremely happy with the overall experience.',
    },
    {
        name: 'Vinay Sharma',
        role: 'Govt Job',
        image: '/testimonials/vinay.jpg',
        quote: 'Because of my job, I barely have time to track my portfolio. FinAlpha\'s personalized support helps my family stay completely disciplined and on course with our investments.',
    },
    {
        name: 'Nikita Bajaj',
        role: 'Retail Investor',
        image: '',
        quote: 'I received a timely WhatsApp from FinAlpha about tax-loss harvesting, which really helped! I\'ve never seen a more dedicated professional than Ankit.',
    },
    {
        name: 'Ritesh Sahu',
        role: 'Business Owner',
        image: '/testimonials/ritesh.png',
        quote: 'I wanted to deploy a lump sum amount but felt completely confused. Ankit helped construct a personalized portfolio that perfectly aligned with my long-term wealth goals.',
    },
    {
        name: 'Vibha Pandey',
        role: 'Retail Investor',
        image: '',
        quote: 'Swift and straight to the point. Ankit taught me that a SIP isn\'t just an investment, it\'s a discipline. Excellent service backed by serious market experience.',
    },
];


export default function Testimonials() {
    return (
        <section>
            <div className="py-16 md:py-32">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="text-center">
                        <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Trusted by the FinAlpha Community</h2>
                        <p className="text-body mt-6">Empowering investors from all walks of life — see what they have to say.</p>
                    </div>
                    <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:mt-12 auto-rows-fr">
                        {testimonials.map(({ name, role, quote, image }, index) => (
                            <Card key={index} className="h-full flex flex-col hover:bg-card/60 transition-colors">
                                <CardContent className="flex flex-col gap-3 pt-6 flex-1">
                                    <div className="flex gap-3">
                                        <Avatar className="size-9 shrink-0">
                                            {image ? (
                                                <AvatarImage alt={name} src={image} loading="lazy" width="120" height="120" />
                                            ) : null}
                                            <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                                                {name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-medium text-foreground">{name}</h3>
                                            <span className="text-muted-foreground block text-xs tracking-wide">{role}</span>
                                        </div>
                                    </div>
                                    <blockquote className="mt-2 flex-1">
                                        <p className="text-sm text-foreground/80 leading-relaxed">{quote}</p>
                                    </blockquote>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
