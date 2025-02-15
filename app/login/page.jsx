"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }

        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                try {
                    const decodedToken = JSON.parse(window.atob(data.token.split('.')[1]));
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('tokenExpiry', decodedToken.exp * 1000);

                    console.log('Login successful');
                    router.push('/admins');
                } catch (decodeError) {
                    console.error("Invalid token format:", decodeError);
                    setError("Invalid token received. Please try again.");
                }
            } else {
                setError(data.error || "Invalid credentials. Please try again.");
            }
        } catch (err) {
            console.error("Network error:", err);
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
                
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                />

                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                />

                <button 
                    onClick={handleLogin} 
                    className={`w-full text-white py-3 rounded-lg transition duration-200 ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-gray-600 text-sm text-center mt-4">
                    Don&apos;t have an account? <Link href="/register" className="text-blue-500 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}
