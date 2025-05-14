
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ContactRequest } from "@/app/admin/page";

interface ContactRequestModalProps {
    request: ContactRequest | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactRequestModal({ request, isOpen, onClose }: ContactRequestModalProps) {
    if (!request) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-gray-800 text-gray-100 max-w-lg">
                <DialogHeader>
                    <DialogTitle>Contact Request Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <strong className="text-gray-200">ID:</strong> <span>{request.id}</span>
                    </div>
                    <div>
                        <strong className="text-gray-200">Name:</strong> <span>{request.name}</span>
                    </div>
                    <div>
                        <strong className="text-gray-200">Email:</strong> <span>{request.email}</span>
                    </div>
                    <div>
                        <strong className="text-gray-200">Phone:</strong> <span>{request.phone || "N/A"}</span>
                    </div>
                    <div>
                        <strong className="text-gray-200">Company:</strong> <span>{request.company || "N/A"}</span>
                    </div>
                    <div>
                        <strong className="text-gray-200">Service:</strong> <span>{request.service}</span>
                    </div>
                    <div>
                        <strong className="text-gray-200">Message:</strong>
                        <p className="mt-1 text-gray-300">{request.message}</p>
                    </div>
                    <div>
                        <strong className="text-gray-200">Terms Accepted:</strong> <span>{request.terms_accepted ? "Yes" : "No"}</span>
                    </div>
                    <div>
                        <strong className="text-gray-200">Status:</strong> <span>{request.status}</span>
                    </div>
                    <div>
                        <strong className="text-gray-200">Created At:</strong>{" "}
                        <span>{new Date(request.created_at).toLocaleString()}</span>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} className="text-gray-100 border-gray-600 hover:bg-gray-700">
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}