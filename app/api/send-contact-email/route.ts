import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Validate environment variables
        const requiredEnvVars = [
            "NEXT_PUBLIC_SUPABASE_URL",
            "NEXT_PUBLIC_SUPABASE_ANON_KEY",
            "EMAIL_HOST",
            "EMAIL_PORT",
            "EMAIL_USER",
            "EMAIL_PASS",
            "EMAIL_RECIPIENTS",
        ];
        for (const envVar of requiredEnvVars) {
            if (!process.env[envVar]) {
                console.error(`Missing environment variable: ${envVar}`);
                return NextResponse.json(
                    { error: `Server configuration error: ${envVar} is not set` },
                    { status: 500 }
                );
            }
        }

        // Parse request body
        const body = await request.json();
        const { name, email, phone, company, service, message, terms_accepted } = body;

        // Validate required fields
        if (!name || !email || !service || !message || !terms_accepted) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Initialize Supabase client
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Insert into Supabase
        const { error: supabaseError } = await supabase
            .from("contact_struo")
            .insert([{ name, email, phone, company, service, message, terms_accepted }]);

        if (supabaseError) {
            console.error("Supabase error:", supabaseError);
            return NextResponse.json(
                { error: `Failed to save contact request: ${supabaseError.message}` },
                { status: 500 }
            );
        }

        // Initialize Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_PORT === "465", // true for 465 (SSL)
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Verify SMTP connection
        try {
            await transporter.verify();
        } catch (verifyError) {
            console.error("SMTP connection error:", verifyError);
            return NextResponse.json(
                { error: "Failed to connect to email server" },
                { status: 500 }
            );
        }

        // Prepare email recipients
        const recipients = process.env.EMAIL_RECIPIENTS!.split(",").map((email) =>
            email.trim()
        );
        if (recipients.length === 0) {
            console.error("No valid email recipients provided");
            return NextResponse.json(
                { error: "No valid email recipients configured" },
                { status: 500 }
            );
        }

        // Prepare email with enhanced headers
        const mailOptions = {
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
            to: recipients,
            replyTo: email,
            subject: `New Contact Request: ${service} from ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "N/A"}
        Company: ${company || "N/A"}
        Service: ${service}
        Message: ${message}
        Terms Accepted: ${terms_accepted ? "Yes" : "No"}
        Received At: ${new Date().toLocaleString()}
      `,
            html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Terms Accepted:</strong> ${terms_accepted ? "Yes" : "No"}</p>
        <p><strong>Received At:</strong> ${new Date().toLocaleString()}</p>
        <p style="font-size: 12px; color: #666;">
          This email was sent from ${process.env.EMAIL_USER} via yourdomain.com
        </p>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { success: true, message: "Email sent and data saved successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Internal server error",
            },
            { status: 500 }
        );
    }
}