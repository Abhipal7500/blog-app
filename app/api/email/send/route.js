import EmailModel from "@/lib/models/EmailModel";
import nodemailer from "nodemailer";

export const config = {
    runtime: "nodejs", // Ensures Vercel uses Node.js runtime
};

export async function POST(req) {
    try {
        const subscribers = await EmailModel.find({}, "email");
        const emailList = subscribers.map(sub => sub.email);

        if (emailList.length === 0) {
            return new Response(JSON.stringify({ success: false, message: "No subscribers found" }), { status: 400 });
        }

        const { title, description, category } = await req.json();

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            }
        });

        const mailOptions = {
            from: `"Blogger" <no-reply@Blogger.in>`,
            to: emailList.join(","), 
            subject: `New Blog Published: ${title}`,
            html: `
                <h2>${title}</h2>
                <p><strong>Category:</strong> ${category}</p>
                <p>${description}</p>
                <p>Thank you for subscribing!</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ success: true, message: "Emails sent successfully!" }), { status: 200 });

    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({ success: false, message: "Failed to send email." }), { status: 500 });
    }
}
