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
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        quote: 'FinAlpha makes market tracking effortless. The tools are so intuitive, I enjoy managing my portfolio now.',
    },
    {
        name: 'Sanya Kapoor',
        role: 'Student & First-Time Investor',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        quote: 'As a beginner, I was overwhelmed — until I found FinAlpha. The chatbot and blogs made everything click.',
    },
    {
        name: 'Rohan Deshmukh',
        role: 'Marketing Manager',
        image: 'https://randomuser.me/api/portraits/men/54.jpg',
        quote: 'The financial calculators are a game-changer. I finally feel in control of my savings and investments.',
    },
    {
        name: 'Neha Varma',
        role: 'Chartered Accountant',
        image: 'https://randomuser.me/api/portraits/women/68.jpg',
        quote: 'FinAlpha’s tools help me cut through the noise. I use it to quickly analyze funds and track markets daily.',
    },
    {
        name: 'Yash Agarwal',
        role: 'Startup Founder',
        image: 'https://randomuser.me/api/portraits/men/71.jpg',
        quote: 'I use FinAlpha every day. From stock heatmaps to Alpha’s insights, it’s like having a financial co-pilot.',
    },
    {
        name: 'Ishita Reddy',
        role: 'Mutual Fund Enthusiast',
        image: 'https://randomuser.me/api/portraits/women/29.jpg',
        quote: 'The 5-star mutual fund list and ROI calculator are super handy. FinAlpha truly simplifies investment planning.',
    },
];


const chunkArray = (array: Testimonial[], chunkSize: number): Testimonial[][] => {
    const result: Testimonial[][] = []
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }
    return result
}

const testimonialChunks = chunkArray(testimonials, Math.ceil(testimonials.length / 3))

export default function Testimonials() {
    return (
        <section>
            <div className="py-16 md:py-32">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="text-center">
                        <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Trusted by the FinAlpha Community</h2>
                        <p className="text-body mt-6">Empowering investors from all walks of life — see what they have to say.</p>
                    </div>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
                        {testimonialChunks.map((chunk, chunkIndex) => (
                            <div key={chunkIndex} className="space-y-3">
                                {chunk.map(({ name, role, quote, image }, index) => (
                                    <Card key={index}>
                                        <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
                                            <Avatar className="size-9">
                                                <AvatarImage alt={name} src={image} loading="lazy" width="120" height="120" />
                                                <AvatarFallback>ST</AvatarFallback>
                                            </Avatar>

                                            <div>
                                                <h3 className="font-medium">{name}</h3>

                                                <span className="text-muted-foreground block text-sm tracking-wide">{role}</span>

                                                <blockquote className="mt-3">
                                                    <p className="text-gray-700 dark:text-gray-300">{quote}</p>
                                                </blockquote>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
