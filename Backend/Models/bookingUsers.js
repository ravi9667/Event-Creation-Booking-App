import mongoose from "mongoose";

const bookingUserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        dateOfBirth: {
            type: Date,
            required: true,
            min: 18
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },

        // Email verification
        isEmailVerification: {
            type: Boolean,
            default: false
        },
        emailVerificationToken: String,
        emailVerificationTokenExpires: Date,

        // otp for login
        loginOtp: Number,
        loginOtpExpires: Date,

        // forget password reset link
        passwordResetToken: String,
        passwordResetTokenExpires: Date,
    },
    { timeStamps: true }
);

export const bookingUser = mongoose.model("bookingUser", bookingUserSchema)