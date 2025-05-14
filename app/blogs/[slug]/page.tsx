import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Blog {
    id: string;
    title: string;
    slug: string;
    content: string;
    image_url: string | null;
    created_at: string;
}

export async function generateStaticParams() {
    const { data: blogs, error } = await supabase
        .from("blogs")
        .select("slug");

    if (error) {
        console.error("Error fetching slugs:", error);
        return [];
    }

    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

// Use a dynamic type approach to satisfy the TypeScript compiler
export default async function BlogPage({
    params,
}: any) {
    // Await params before accessing properties
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    // Fetch the blog by slug
    const { data: blog, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error || !blog) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden bg-background text-foreground">
                <div className="container relative z-10 px-4 md:px-6">
                    {/* Back Button */}
                    <Link href="/blogs">
                        <Button
                            variant="link"
                            className="mb-6 text-struo-red hover:text-struo-red/80"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
                        </Button>
                    </Link>

                    {/* Blog Content */}
                    <article className="max-w-3xl mx-auto">
                        {blog.image_url && (
                            <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                                <Image
                                    src={blog.image_url}
                                    alt={blog.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                            {blog.title}
                        </h1>

                        <p className="text-sm text-muted-foreground mb-6">
                            Published on{" "}
                            {new Date(blog.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>

                        <div
                            className="prose prose-sm md:prose-base max-w-none text-foreground"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </article>
                </div>
            </section>
            <Footer />
        </>
    );
}