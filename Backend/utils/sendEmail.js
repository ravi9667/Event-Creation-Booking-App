import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, link) => {
    const transporter = nodemailer.createTransport({
        service: "gmail", // ya koi aur SMTP
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: `"Booking App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify Your Email",
        html: `
            <h2>Welcome to Booking App</h2>
            <p>Click the link below to verify your email:</p>
            <a href="${link}" target="_blank">${link}</a>
            <p>This link will expire in 15 minutes.</p>
        `
    });
};
