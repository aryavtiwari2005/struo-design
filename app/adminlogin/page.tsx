"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [sessionStatus, setSessionStatus] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClientComponentClient();

    // Check if already logged in
    useEffect(() => {
        async function checkSession() {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                // Already logged in, redirect to admin
                console.log("User already logged in, redirecting to admin");
                router.push("/admin");
            }
        }
        checkSession();
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        setSessionStatus("Attempting login...");

        try {
            // Attempt to sign in with email and password
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.session) {
                setSessionStatus("Authentication successful, redirecting...");

                // Refresh to ensure middleware gets the updated session
                router.refresh();

                // Redirect to admin page
                router.push("/admin");
            } else {
                throw new Error("Failed to create session");
            }
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "Failed to login");
            setSessionStatus("Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-100 mb-6">Admin Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {sessionStatus && <p className="text-blue-400 mb-4">{sessionStatus}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-200">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-200">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}