import { motion } from "framer-motion";
import RichTextEditor from "@/components/RichTextEditor";
import { useEffect, useRef } from "react";

interface BlogFormState {
    title: string;
    slug: string;
    content: string;
    image: File | null;
    imageUrl: string | null;
}

interface BlogFormProps {
    blogForm: BlogFormState;
    setBlogForm: (form: BlogFormState) => void;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
    isEditing: boolean;
}

const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export default function BlogForm({
    blogForm,
    setBlogForm,
    onSubmit,
    onClose,
    isEditing,
}: BlogFormProps) {
    // Reference to form content div for custom scrolling handling
    const contentRef = useRef<HTMLDivElement>(null);

    // Prevent body scrolling when modal is open
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    return (
        <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="fixed inset-0 bg-gray-900/70 flex items-center justify-center z-50 p-4"
            data-lenis-prevent
        >
            <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl h-[90vh] flex flex-col">
                {/* Header */}
                <div className="px-6 pt-6 pb-4 border-b border-gray-700 flex-shrink-0">
                    <h2 className="text-xl font-semibold text-gray-100">
                        {isEditing ? "Edit Blog" : "Add Blog"}
                    </h2>
                </div>

                {/* Scrollable Form Content */}
                <div
                    ref={contentRef}
                    className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                    data-lenis-prevent
                >
                    <form
                        id="blog-form"
                        onSubmit={onSubmit}
                        className="px-6 py-4"
                    >
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-200 font-medium mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={blogForm.title}
                                    onChange={(e) =>
                                        setBlogForm({ ...blogForm, title: e.target.value })
                                    }
                                    className="w-full p-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-gray-100 placeholder:text-gray-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-200 font-medium mb-1">
                                    Slug (URL-friendly)
                                </label>
                                <input
                                    type="text"
                                    value={blogForm.slug}
                                    onChange={(e) =>
                                        setBlogForm({ ...blogForm, slug: e.target.value })
                                    }
                                    className="w-full p-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-gray-100 placeholder:text-gray-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-200 font-medium mb-1">
                                    Featured Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setBlogForm({
                                            ...blogForm,
                                            image: e.target.files?.[0] || null,
                                        })
                                    }
                                    className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                />
                                {blogForm.imageUrl && (
                                    <div className="mt-2 max-h-40 overflow-hidden">
                                        <img
                                            src={blogForm.imageUrl}
                                            alt="Preview"
                                            className="max-w-xs rounded object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-200 font-medium mb-1">
                                    Content
                                </label>
                                <div className="bg-gray-700 border border-gray-600 rounded">
                                    <div className="h-64 overflow-hidden" data-lenis-prevent>
                                        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                                            <RichTextEditor
                                                content={blogForm.content}
                                                onChange={(content: string) =>
                                                    setBlogForm({ ...blogForm, content })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Fixed Button Footer */}
                <div className="px-6 py-4 bg-gray-800 border-t border-gray-700 flex justify-end space-x-4 flex-shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 text-gray-200 rounded hover:bg-gray-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="blog-form"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        {isEditing ? "Update" : "Add"} Blog
                    </button>
                </div>
            </div>
        </motion.div>
    );
}