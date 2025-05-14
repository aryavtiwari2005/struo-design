"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BlogTable from "@/components/admin/BlogTable";
import BlogForm from "@/components/admin/BlogForm";
import ContactRequestsTable from "@/components/admin/ContactRequestsTable";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { supabase } from "@/utils/supabase";

interface Blog {
    id: string;
    title: string;
    slug: string;
    content: string;
    image_url: string | null;
    created_at: string;
}

interface ContactRequest {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    service: string;
    message: string;
    terms_accepted: boolean;
    created_at: string;
    status: string;
}

interface BlogFormState {
    title: string;
    slug: string;
    content: string;
    image: File | null;
    imageUrl: string | null;
}

const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
};

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        async function checkUser() {
            setAuthLoading(true);
            try {
                const { data: { session }, error } = await supabase.auth.getSession();

                if (error) {
                    console.error("Session error:", error.message);
                    throw error;
                }

                if (!session) {
                    console.log("No active session found");
                    setIsAuthenticated(false);
                    router.push("/adminlogin");
                    return;
                }

                const { data: { user }, error: userError } = await supabase.auth.getUser();

                if (userError || !user) {
                    console.error("User validation error:", userError?.message);
                    setIsAuthenticated(false);
                    router.push("/adminlogin");
                    return;
                }

                console.log("User authenticated:", user.id);
                setIsAuthenticated(true);
            } catch (err) {
                console.error("Authentication check failed:", err);
                setIsAuthenticated(false);
                router.push("/adminlogin");
            } finally {
                setAuthLoading(false);
            }
        }

        checkUser();
    }, [router]);

    useEffect(() => {
        if (isAuthenticated) {
            async function fetchData() {
                try {
                    // Fetch blogs
                    const { data: blogData, error: blogError } = await supabase
                        .from("blogs")
                        .select("*")
                        .order("created_at", { ascending: false });

                    if (blogError) {
                        console.error("Error fetching blogs:", blogError);
                        setError("Failed to fetch blogs");
                    } else {
                        setBlogs(blogData || []);
                    }

                    // Fetch contact requests
                    const { data: requestData, error: requestError } = await supabase.from("contact_struo")
                        .select("*")
                        .order("created_at", { ascending: false });

                    if (requestError) {
                        console.error("Error fetching contact requests:", requestError);
                        setError("Failed to fetch contact requests");
                    } else {
                        setContactRequests(requestData || []);
                    }
                } catch (err) {
                    console.error("Data fetch error:", err);
                    setError("Failed to fetch data");
                }
            }

            fetchData();
        }
    }, [isAuthenticated]);

    const handleBlogSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        let imageUrl = blogForm.imageUrl;

        try {
            if (blogForm.image) {
                const fileExt = blogForm.image.name.split(".").pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const { data, error } = await supabase.storage
                    .from("blog-images")
                    .upload(fileName, blogForm.image);

                if (error) {
                    console.error("Error uploading image:", error);
                    setError("Failed to upload image");
                    return;
                }

                const { data: publicUrlData } = supabase.storage
                    .from("blog-images")
                    .getPublicUrl(fileName);

                imageUrl = publicUrlData.publicUrl;
            }

            if (isEditing && editingBlogId) {
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
                    setError("Failed to update blog");
                    return;
                }

                setBlogs(
                    blogs.map((blog) =>
                        blog.id === editingBlogId
                            ? { ...blog, title: blogForm.title, slug: blogForm.slug, content: blogForm.content, image_url: imageUrl }
                            : blog
                    )
                );
            } else {
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
                    setError("Failed to add blog");
                    return;
                }

                if (data) {
                    setBlogs([data[0], ...blogs]);
                }
            }

            setBlogForm({ title: "", slug: "", content: "", image: null, imageUrl: null });
            setShowForm(false);
            setIsEditing(false);
            setEditingBlogId(null);
        } catch (err) {
            console.error("Form submission error:", err);
            setError("An unexpected error occurred");
        }
    };

    const handleEditBlog = (blog: Blog) => {
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

    const handleDeleteBlog = async (id: string) => {
        try {
            const blog = blogs.find((b) => b.id === id);
            if (blog?.image_url) {
                const fileName = blog.image_url.split("/").pop();
                if (fileName) {
                    await supabase.storage.from("blog-images").remove([fileName]);
                }
            }

            const { error } = await supabase.from("blogs").delete().eq("id", id);
            if (error) {
                console.error("Error deleting blog:", error);
                setError("Failed to delete blog");
                return;
            }

            setBlogs(blogs.filter((blog) => blog.id !== id));
        } catch (err) {
            console.error("Delete error:", err);
            setError("Failed to delete blog");
        }
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            const { error } = await supabase
                .from("contact_struo")
                .update({ status })
                .eq("id", id);

            if (error) {
                console.error("Error updating status:", error);
                setError("Failed to update status");
                return;
            }

            setContactRequests(
                contactRequests.map((req) =>
                    req.id === id ? { ...req, status } : req
                )
            );
        } catch (err) {
            console.error("Status update error:", err);
            setError("Failed to update status");
        }
    };

    const handleDeleteRequest = async (id: string) => {
        try {
            const { error } = await supabase
                .from("contact_struo")
                .delete()
                .eq("id", id);

            if (error) {
                console.error("Error deleting request:", error);
                setError("Failed to delete request");
                return;
            }

            setContactRequests(contactRequests.filter((req) => req.id !== id));
        } catch (err) {
            console.error("Delete error:", err);
            setError("Failed to delete request");
        }
    };

    const handleClose = () => {
        setBlogForm({ title: "", slug: "", content: "", image: null, imageUrl: null });
        setShowForm(false);
        setIsEditing(false);
        setEditingBlogId(null);
    };

    async function handleLogout() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            setIsAuthenticated(false);
            router.push("/adminlogin");
        } catch (err) {
            console.error("Error logging out:", err);
            setError("Failed to logout");
        }
    }

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <p className="text-gray-400">Checking authentication...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <p className="text-gray-400">Redirecting to login...</p>
            </div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="bg-gray-900 min-h-screen"
        >
            <Navbar />
            <section className="pt-20 pb-24 md:pt-28 md:pb-32 bg-gray-900 text-gray-100">
                <div className="container px-4 md:px-6">
                    <div className="flex justify-between items-center mb-8">
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center space-x-2 mb-4">
                                <div className="h-1 w-6 bg-struo-red rounded-full"></div>
                                <span className="text-sm font-semibold text-struo-red uppercase tracking-wide">
                                    Admin Panel
                                </span>
                                <div className="h-1 w-6 bg-struo-red rounded-full"></div>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-100 mb-4">
                                Manage Blogs & Contact Requests
                            </h1>
                            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                                Add, edit, or remove blog posts and manage incoming contact requests.
                            </p>
                        </div>
                        <Button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Logout
                        </Button>
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-100 mb-4">Blogs</h2>
                        <div className="mb-8">
                            <Button
                                onClick={() => setShowForm(true)}
                                className="bg-struo-red hover:bg-struo-red/90 text-white rounded-full px-6"
                            >
                                Add New Blog
                            </Button>
                        </div>
                        <BlogTable blogs={blogs} onEdit={handleEditBlog} onDelete={handleDeleteBlog} />
                        {showForm && (
                            <BlogForm
                                blogForm={blogForm}
                                setBlogForm={setBlogForm}
                                onSubmit={handleBlogSubmit}
                                onClose={handleClose}
                                isEditing={isEditing}
                            />
                        )}
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-100 mb-4">Contact Requests</h2>
                        <ContactRequestsTable
                            requests={contactRequests}
                            onUpdateStatus={handleUpdateStatus}
                            onDelete={handleDeleteRequest}
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </motion.div>
    );
}