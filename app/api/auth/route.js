import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    const { email, password } = await req.json();

    // Get admin details from environment variables
    const adminUser = {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: process.env.ADMIN_ROLE,
        verified: process.env.ADMIN_VERIFIED === 'true' // Convert string to boolean
    };

    if (email !== adminUser.email || password !== adminUser.password) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT Token
    const token = jwt.sign(
        { email: adminUser.email, role: adminUser.role, verified: adminUser.verified },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return NextResponse.json({ message: 'Login successful', token });
}
