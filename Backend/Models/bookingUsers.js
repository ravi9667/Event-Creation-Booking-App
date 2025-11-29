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
            validate: {
                validator: function(value) {
                    const today = new Date();
                    const age = today.getFullYear() - value.getFullYear();
                    return age >= 18
                },
                message: "User must be at least 18 years old"
            }
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
        role: {
            type: String,
            enum: ["creator", "viewer"],
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
    { timestamps: true }
);

export const bookingUser = mongoose.model("bookingUser", bookingUserSchema)