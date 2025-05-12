"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import BlogTable from "@/components/admin/BlogTable";
import BlogForm from "@/components/admin/BlogForm";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

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

interface BlogFormState {
    title: string;
    slug: string;
    content: string;
    image: File | null;
    imageUrl: string | null;
}

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [blogForm, setBlogForm] = useState<BlogFormState>({
        title: "",
        slug: "",
        content: "",
        image: null,
        imageUrl: null,
    });
    const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

    // Fetch blogs from Supabase
    useEffect(() => {
        async function fetchBlogs() {
            const { data, error } = await supabase
                .from("blogs")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) {
                console.error("Error fetching blogs:", error);
            } else {
                setBlogs(data || []);
            }
        }
        fetchBlogs();
    }, []);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let imageUrl = blogForm.imageUrl;

        // Upload image if provided
        if (blogForm.image) {
            const fileExt = blogForm.image.name.split(".").pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const { data, error } = await supabase.storage
                .from("blog-images")
                .upload(fileName, blogForm.image);
            if (error) {
                console.error("Error uploading image:", error);
                return;
            }
            const { data: publicUrlData } = supabase.storage
                .from("blog-images")
                .getPublicUrl(fileName);
            imageUrl = publicUrlData.publicUrl;
        }

        if (isEditing && editingBlogId) {
            // Update existing blog
            const { error } = await supabase
                .from("blogs")
                .update({
                    title: blogForm.title,
                    slug: blogForm.slug,
                    content: blogForm.content,
                    image_url: imageUrl,
                })
                .eq("id", editingBlogId);
            if (error) {
                console.error("Error updating blog:", error);
            } else {
                setBlogs(
                    blogs.map((blog) =>
                        blog.id === editingBlogId
                            ? { ...blog, title: blogForm.title, slug: blogForm.slug, content: blogForm.content, image_url: imageUrl }
                            : blog
                    )
                );
            }
        } else {
            // Add new blog
            const { data, error } = await supabase
                .from("blogs")
                .insert([
                    {
                        title: blogForm.title,
                        slug: blogForm.slug,
                        content: blogForm.content,
                        image_url: imageUrl,
                    },
                ])
                .select();
            if (error) {
                console.error("Error adding blog:", error);
            } else if (data) {
                setBlogs([data[0], ...blogs]);
            }
        }

        // Reset form and close
        setBlogForm({ title: "", slug: "", content: "", image: null, imageUrl: null });
        setShowForm(false);
        setIsEditing(false);
        setEditingBlogId(null);
    };

    // Handle edit blog
    const handleEdit = (blog: Blog) => {
        setBlogForm({
            title: blog.title,
            slug: blog.slug,
            content: blog.content,
            image: null,
            imageUrl: blog.image_url,
        });
        setIsEditing(true);
        setEditingBlogId(blog.id);
        setShowForm(true);
    };

    // Handle delete blog
    const handleDelete = async (id: string) => {
        const blog = blogs.find((b) => b.id === id);
        if (blog?.image_url) {
            const fileName = blog.image_url.split("/").pop();
            await supabase.storage.from("blog-images").remove([fileName!]);
        }
        const { error } = await supabase.from("blogs").delete().eq("id", id);
        if (error) {
            console.error("Error deleting blog:", error);
        } else {
            setBlogs(blogs.filter((blog) => blog.id !== id));
        }
    };

    // Handle form close
    const handleClose = () => {
        setBlogForm({ title: "", slug: "", content: "", image: null, imageUrl: null });
        setShowForm(false);
        setIsEditing(false);
        setEditingBlogId(null);
    };

    return (
        <>
            <Navbar />
            <section className="pt-20 pb-24 md:pt-28 md:pb-32 bg-background text-foreground">
                <div className="container px-4 md:px-6">
                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="inline-flex items-center space-x-2 mb-4">
                            <div className="h-1 w-6 bg-struo-red rounded-full"></div>
                            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                                Admin Panel
                            </span>
                            <div className="h-1 w-6 bg-struo-red rounded-full"></div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-foreground mb-4">
                            Manage Blogs
                        </h1>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                            Add, edit, or remove blog posts to keep your audience informed.
                        </p>
                    </div>
                    <div className="mb-8">
                        <Button
                            onClick={() => setShowForm(true)}
                            className="bg-struo-red hover:bg-struo-red/90 text-white rounded-full px-6"
                        >
                            Add New Blog
                        </Button>
                    </div>
                    <BlogTable blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />
                    {showForm && (
                        <BlogForm
                            blogForm={blogForm}
                            setBlogForm={setBlogForm}
                            onSubmit={handleSubmit}
                            onClose={handleClose}
                            isEditing={isEditing}
                        />
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}