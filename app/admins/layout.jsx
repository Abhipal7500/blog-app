"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                // Check for token in localStorage
                const token = localStorage.getItem("token");
                
                if (!token) {
                    router.push("/login");
                    return;
                }

                // Decode JWT token
                const decoded = JSON.parse(atob(token.split(".")[1]));
                console.log(decoded);
                // Check if the user is an admin and verified
                if (decoded.role === "admin" && decoded.verified) {
                    setIsAdmin(true);
                } else {
                    router.push("/login");
                }
            } catch (error) {
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        checkAdmin();
    }, [router]);

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem("token");
        // Redirect to login page
        router.push("/login");
    };

    if (loading) return <div className="h-screen flex justify-center items-center">Loading...</div>;

    if (!isAdmin) return null; // Prevent rendering until authentication is checked

    return (
        <div className="flex">
            <ToastContainer theme="dark" />
            <Sidebar />
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
                    <h3 className="font-medium">Admin Panel</h3>
                    <div className="flex items-center">
                        <Image src={assets.profile_icon} width={40} alt="" />
                        <button
                            onClick={handleLogout}
                            className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
