// BlogTable.tsx
interface Blog {
    id: string;
    title: string;
    slug: string;
    content: string;
    image_url: string | null;
    created_at: string;
}

interface BlogTableProps {
    blogs: Blog[];
    onEdit: (blog: Blog) => void;
    onDelete: (id: string) => void;
}

export default function BlogTable({ blogs, onEdit, onDelete }: BlogTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900 rounded-lg shadow-md">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="px-4 py-3 text-left text-gray-200 font-medium">ID</th>
                        <th className="px-4 py-3 text-left text-gray-200 font-medium">Title</th>
                        <th className="px-4 py-3 text-left text-gray-200 font-medium">Slug</th>
                        <th className="px-4 py-3 text-left text-gray-200 font-medium">Created At</th>
                        <th className="px-4 py-3 text-left text-gray-200 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id} className="hover:bg-gray-700 transition-colors border-b border-gray-700">
                            <td className="px-4 py-3 text-gray-300">{blog.id}</td>
                            <td className="px-4 py-3 text-gray-300">{blog.title}</td>
                            <td className="px-4 py-3 text-gray-300">{blog.slug}</td>
                            <td className="px-4 py-3 text-gray-300">
                                {new Date(blog.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 space-x-2">
                                <button
                                    onClick={() => onEdit(blog)}
                                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(blog.id)}
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
