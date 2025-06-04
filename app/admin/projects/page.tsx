"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { supabase } from "@/utils/supabase";

// Define Project interface
interface Project {
    id: string;
    title: string;
    location: string;
    image_url: string | null;
    created_at: string;
}

interface ProjectFormState {
    title: string;
    location: string;
    image: File | null;
    imageUrl: string | null;
}

const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
};

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [projectForm, setProjectForm] = useState<ProjectFormState>({
        title: "",
        location: "",
        image: null,
        imageUrl: null,
    });
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    // Check authentication
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

    // Fetch projects
    useEffect(() => {
        if (isAuthenticated) {
            async function fetchProjects() {
                try {
                    const { data, error } = await supabase
                        .from("projects_struo")
                        .select("*")
                        .order("created_at", { ascending: false });

                    if (error) {
                        console.error("Error fetching projects:", error);
                        setError("Failed to fetch projects");
                    } else {
                        setProjects(data || []);
                    }
                } catch (err) {
                    console.error("Fetch error:", err);
                    setError("An unexpected error occurred");
                }
            }

            fetchProjects();
        }
    }, [isAuthenticated]);

    // Handle form submission
    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        let imageUrl = projectForm.imageUrl;

        try {
            if (projectForm.image) {
                const fileExt = projectForm.image.name.split(".").pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const { data, error } = await supabase.storage
                    .from("project-images")
                    .upload(fileName, projectForm.image);

                if (error) {
                    console.error("Error uploading image:", error);
                    setError("Failed to upload image");
                    return;
                }

                const { data: publicUrlData } = supabase.storage
                    .from("project-images")
                    .getPublicUrl(fileName);

                imageUrl = publicUrlData.publicUrl;
            } else if (!projectForm.imageUrl && isEditing && editingProjectId) {
                const project = projects.find((p) => p.id === editingProjectId);
                imageUrl = project?.image_url || null;
            }

            if (isEditing && editingProjectId) {
                const { error } = await supabase
                    .from("projects_struo")
                    .update({
                        title: projectForm.title,
                        location: projectForm.location,
                        image_url: imageUrl,
                    })
                    .eq("id", editingProjectId);

                if (error) {
                    console.error("Error updating project:", error);
                    setError("Failed to update project");
                    return;
                }

                setProjects(
                    projects.map((project) =>
                        project.id === editingProjectId
                            ? { ...project, title: projectForm.title, location: projectForm.location, image_url: imageUrl }
                            : project
                    )
                );
            } else {
                const { data, error } = await supabase
                    .from("projects_struo")
                    .insert([
                        {
                            title: projectForm.title,
                            location: projectForm.location,
                            image_url: imageUrl,
                        },
                    ])
                    .select();

                if (error) {
                    console.error("Error adding project:", error);
                    setError("Failed to add project");
                    return;
                }

                if (data) {
                    setProjects([data[0], ...projects]);
                }
            }

            setProjectForm({ title: "", location: "", image: null, imageUrl: null });
            setShowForm(false);
            setIsEditing(false);
            setEditingProjectId(null);
        } catch (err) {
            console.error("Form submission error:", err);
            setError("An unexpected error occurred");
        }
    };

    // Handle edit
    const handleEditProject = (project: Project) => {
        setProjectForm({
            title: project.title,
            location: project.location,
            image: null,
            imageUrl: project.image_url,
        });
        setIsEditing(true);
        setEditingProjectId(project.id);
        setShowForm(true);
    };

    // Handle delete
    const handleDeleteProject = async (id: string) => {
        try {
            const project = projects.find((p) => p.id === id);
            if (project?.image_url) {
                // Check if image_url is a Supabase storage URL
                const isSupabaseUrl = project.image_url.includes("supabase");
                if (isSupabaseUrl) {
                    const fileName = project.image_url.split("/").pop();
                    if (fileName) {
                        const { error: storageError } = await supabase.storage
                            .from("project-images")
                            .remove([fileName]);
                        if (storageError) {
                            console.error("Error deleting image from storage:", storageError);
                            setError("Failed to delete image from storage");
                            return;
                        }
                    }
                }
            }

            const { error } = await supabase.from("projects_struo").delete().eq("id", id);
            if (error) {
                console.error("Error deleting project:", error);
                setError("Failed to delete project");
                return;
            }

            setProjects(projects.filter((project) => project.id !== id));
        } catch (err) {
            console.error("Delete error:", err);
            setError("Failed to delete project");
        }
    };

    // Handle form close
    const handleClose = () => {
        setProjectForm({ title: "", location: "", image: null, imageUrl: null });
        setShowForm(false);
        setIsEditing(false);
        setEditingProjectId(null);
    };

    // Handle logout
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
                                Manage Projects
                            </h1>
                            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                                Add, edit, or remove projects from the portfolio.
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
                        <h2 className="text-2xl font-bold text-gray-100 mb-4">Projects</h2>
                        <div className="mb-8">
                            <Button
                                onClick={() => setShowForm(true)}
                                className="bg-struo-red hover:bg-struo-red/90 text-white rounded-full px-6"
                            >
                                Add New Project
                            </Button>
                        </div>
                        <ProjectTable
                            projects={projects}
                            onEdit={handleEditProject}
                            onDelete={handleDeleteProject}
                        />
                        {showForm && (
                            <ProjectForm
                                projectForm={projectForm}
                                setProjectForm={setProjectForm}
                                onSubmit={handleProjectSubmit}
                                onClose={handleClose}
                                isEditing={isEditing}
                            />
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </motion.div>
    );
}

// ProjectTable Component
function ProjectTable({
    projects,
    onEdit,
    onDelete,
}: {
    projects: Project[];
    onEdit: (project: Project) => void;
    onDelete: (id: string) => void;
}) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg">
                <thead>
                    <tr className="text-left text-gray-400">
                        <th className="p-4">Title</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Image</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id} className="border-t border-gray-700">
                            <td className="p-4">{project.title}</td>
                            <td className="p-4">{project.location}</td>
                            <td className="p-4">
                                {project.image_url ? (
                                    <img
                                        src={project.image_url}
                                        alt={project.title}
                                        className="h-16 w-16 object-cover rounded"
                                    />
                                ) : (
                                    "No image"
                                )}
                            </td>
                            <td className="p-4 flex gap-2">
                                <Button
                                    onClick={() => onEdit(project)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => onDelete(project.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ProjectForm Component
function ProjectForm({
    projectForm,
    setProjectForm,
    onSubmit,
    onClose,
    isEditing,
}: {
    projectForm: ProjectFormState;
    setProjectForm: React.Dispatch<React.SetStateAction<ProjectFormState>>;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
    isEditing: boolean;
}) {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setProjectForm((prev) => ({ ...prev, image: file || null, imageUrl: null }));
    };

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectForm((prev) => ({ ...prev, imageUrl: e.target.value || null, image: null }));
    };

    return (
        <form onSubmit={onSubmit} className="bg-gray-800 p-6 rounded-lg mt-6">
            <h3 className="text-lg font-bold text-gray-100 mb-4">
                {isEditing ? "Edit Project" : "Add New Project"}
            </h3>
            <div className="mb-4">
                <label className="block text-gray-400 mb-2">Title</label>
                <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full p-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-400 mb-2">Location</label>
                <input
                    type="text"
                    value={projectForm.location}
                    onChange={(e) => setProjectForm((prev) => ({ ...prev, location: e.target.value }))}
                    className="w-full p-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-400 mb-2">Image Upload</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-400 mb-2">Or Image URL</label>
                <input
                    type="url"
                    value={projectForm.imageUrl || ""}
                    onChange={handleImageUrlChange}
                    className="w-full p-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
                    placeholder="https://example.com/image.jpg"
                />
            </div>
            <div className="flex gap-4">
                <Button
                    type="submit"
                    className="bg-struo-red hover:bg-struo-red/90 text-white rounded-full px-6"
                >
                    {isEditing ? "Update Project" : "Add Project"}
                </Button>
                <Button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-600 hover:bg-gray-700 text-white rounded-full px-6"
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}