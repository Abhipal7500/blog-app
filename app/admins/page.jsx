"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const tokenExpiry = localStorage.getItem("tokenExpiry");

        if (!token || !tokenExpiry || Date.now() > tokenExpiry) {
            router.push("/login");  // Redirect if no valid token
        }
    }, []);

    return <h1>Welcome to Admin Dashboard</h1>;
}
