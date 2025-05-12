import { motion } from "framer-motion";
import RichTextEditor from "@/components/RichTextEditor";

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
    return (
        <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4"
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-[90vh] flex flex-col">
                {/* Header */}
                <div className="px-6 pt-6 pb-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {isEditing ? "Edit Blog" : "Add Blog"}
                    </h2>
                </div>
                {/* Scrollable Form Content */}
                <form
                    id="blog-form"
                    onSubmit={onSubmit}
                    className="flex-grow overflow-y-scroll px-6 py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scroll-smooth"
                >
                    <div className="space-y-4 pb-16">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                value={blogForm.title}
                                onChange={(e) =>
                                    setBlogForm({ ...blogForm, title: e.target.value })
                                }
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder:text-gray-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Slug (URL-friendly)
                            </label>
                            <input
                                type="text"
                                value={blogForm.slug}
                                onChange={(e) =>
                                    setBlogForm({ ...blogForm, slug: e.target.value })
                                }
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder:text-gray-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
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
                                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {blogForm.imageUrl && (
                                <img
                                    src={blogForm.imageUrl}
                                    alt="Preview"
                                    className="mt-2 max-w-xs rounded"
                                />
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Content
                            </label>
                            <div className="bg-white border border-gray-300 rounded min-h-[400px]">
                                <RichTextEditor
                                    content={blogForm.content}
                                    onChange={(content: string) =>
                                        setBlogForm({ ...blogForm, content })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </form>
                {/* Fixed Button Footer */}
                <div className="px-6 py-4 bg-white border-t border-gray-200 flex justify-end space-x-4 z-10">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
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