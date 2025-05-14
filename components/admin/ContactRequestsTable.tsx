import { ContactRequest } from "@/app/admin/page";

interface ContactRequestsTableProps {
    requests: ContactRequest[];
    onUpdateStatus: (id: string, status: string) => void;
    onDelete: (id: string) => void;
    onViewDetails: (request: ContactRequest) => void;
}

export default function ContactRequestsTable({
    requests,
    onUpdateStatus,
    onDelete,
    onViewDetails,
}: ContactRequestsTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900 rounded-lg shadow-md">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="px-4 py-3 text-left text-gray-200 font-medium">ID</th>
                        <th className="px-4 py-3 text-left text-gray-200 font-medium">Name</th>
                        <th className="px-4 py-3 text-left text-gray-200 font-medium">Email</th>
                        <th className="px-4 py-3 text-left text-gray-200 font-medium">Service</th>
                        <th className="px-4 py-3 text-left text-gray-200 font-medium">Status</th>
                        <th className="px-4 py-3 text-left text-gray-200 font-medium">Created At</th>
                        <th className="px-4 py-3 text-left text-gray-200 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request.id} className="hover:bg-gray-700 transition-colors border-b border-gray-700">
                            <td className="px-4 py-3 text-gray-300">{request.id}</td>
                            <td className="px-4 py-3 text-gray-300">{request.name}</td>
                            <td className="px-4 py-3 text-gray-300">{request.email}</td>
                            <td className="px-4 py-3 text-gray-300">{request.service}</td>
                            <td className="px-4 py-3 text-gray-300">
                                <select
                                    value={request.status}
                                    onChange={(e) => onUpdateStatus(request.id, e.target.value)}
                                    className="bg-gray-700 text-gray-300 border border-gray-600 rounded p-1"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="responded">Responded</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </td>
                            <td className="px-4 py-3 text-gray-300">
                                {new Date(request.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 space-x-2">
                                <button
                                    onClick={() => onViewDetails(request)}
                                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                >
                                    View Details
                                </button>
                                <button
                                    onClick={() => onDelete(request.id)}
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