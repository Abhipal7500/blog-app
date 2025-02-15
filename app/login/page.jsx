"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError('');
        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        
        const data = await res.json();
    
        if (res.ok) {
            const decodedToken = JSON.parse(atob(data.token.split('.')[1])); // Decode JWT payload
            localStorage.setItem('token', data.token);
            localStorage.setItem('tokenExpiry', decodedToken.exp * 1000); // Store expiry in milliseconds
    
            console.log('Login successful');
            router.push('/admins'); // Redirect to Admin Dashboard
        } else {
            setError(data.error);
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
                />

                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button 
                    onClick={handleLogin} 
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Login
                </button>

                <p className="text-gray-600 text-sm text-center mt-4">
                    Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
}
