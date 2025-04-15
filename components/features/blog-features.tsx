import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
    ClockIcon,
    Calendar,
} from "lucide-react";
import Link from "next/link";

const blogPosts = [
    {
        id: 1,
        title: "The Enduring Shine : Why Gold Remains a Premier Asset",
        category: "Finance",
        excerpt: "In an age of digital disruption and economic uncertainty, gold continues to shine as a resilient, time-tested asset that offers stability and long-term value for investors seeking security.",
        readTime: "5 min read",
        date: "Nov 20, 2024",
        image: "/blogs/blog1-thumbnail.png",
        imageAlt: "Gold bars with title"
    },
];

const Features = () => {
    return (
        <section>
            <div className="py-32">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="text-center">
                        <h2 className="text-balance text-3xl font-semibold md:text-4xl">
                            Stay Ahead with Smarter Reads
                        </h2>
                        <p className="text-muted-foreground mt-6">
                            Explore articles crafted to simplify finance, decode trends, and empower your financial journey.
                        </p>
                    </div>

                    <div className="mt-12 space-y-8">
                        {blogPosts.map((post) => (
                            <Link key={post.id} href='/blogs/blog1'>
                                <Card key={post.id} className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6">
                                        <div className="flex items-start justify-center md:justify-start">
                                            <img
                                                src={post.image}
                                                alt={post.imageAlt}
                                                className="rounded-md w-48 h-48 object-cover"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
                                                    {post.category}
                                                </Badge>
                                            </div>

                                            <h3 className="text-xl font-medium">{post.title}</h3>

                                            <p className="text-muted-foreground text-sm">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center gap-4 text-muted-foreground text-xs">
                                                <div className="flex items-center gap-1">
                                                    <ClockIcon className="h-3 w-3" /> {post.readTime}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" /> {post.date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;