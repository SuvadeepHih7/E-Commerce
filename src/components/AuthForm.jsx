"use client";

import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AuthForm({ mode = "login" }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { registerUser, loginUser } = useAuth();
    const { login, token } = useContext(AuthContext);
    const router = useRouter();

    // Instructions data
    const loginInstructions = [
        "Use your registered email and password to sign in",
        "Ensure your credentials are correct and up to date",
        "Keep your login information secure and confidential",
        "Contact support if you forget your password",
        "Enjoy seamless access to all your features"
    ];

    const registerInstructions = [
        "Choose a strong, unique password for security",
        "Use a valid email address for verification",
        "Your name will be displayed on your profile",
        "All fields are required for registration",
        "After registration, you'll be redirected to login"
    ];

    useEffect(() => {
        if (token) {
            router.replace("/product");
        }
    }, [token, router]);

    const onSubmit = async (data) => {
        try {
            if (mode === "register") {
                await registerUser.mutateAsync(data);
                toast.success("Registration Done successfully!");
                reset();
                router.push("/login");
            } else {
                const res = await loginUser.mutateAsync(data);
                toast.success(" Congrats! You are logged in!");
                console.log(res.data);
                login(res.data);
                reset();
                router.push("/product");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    // 🔒 Prevent flashing of login/register form if already logged in
    if (token) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#2E8B57]/20 to-[#F5F5F5]/30">
                <div className="bg-white/85 backdrop-blur-lg p-8 rounded-2xl text-center border border-white/20 shadow-2xl">
                    <p className="text-lg text-gray-700">Redirecting...</p>
                </div>
            </div>
        );
    }

    const instructions = mode === "login" ? loginInstructions : registerInstructions;
    const isLogin = mode === "login";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2E8B57]/20 via-white to-[#F5F5F5]/30 p-4">
            <div className="w-full max-w-6xl">
                <div className="bg-white/85 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                    <div className="flex flex-col lg:flex-row">
                        <div className="flex-1 p-8 lg:p-12">
                            {isLogin ? (
                                // Login: Left side is Form
                                <div className="h-full flex flex-col justify-center">
                                    <div className="space-y-2 mb-8">
                                        <h2 className="text-4xl font-bold text-[#228B22]">Welcome Back</h2>
                                        <p className="text-gray-600 text-lg">Sign in to continue your journey</p>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <InputField
                                            label="Email"
                                            name="email"
                                            type="email"
                                            register={register}
                                            errors={errors}
                                            required
                                        />

                                        <InputField
                                            label="Password"
                                            name="password"
                                            type="password"
                                            register={register}
                                            errors={errors}
                                            required
                                        />

                                        <button
                                            type="submit"
                                            disabled={loginUser.isPending}
                                            className="mt-5 w-full bg-[#2E8B57] hover:bg-[#228B22] text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {loginUser.isPending ? "Logging in..." : "Login to Account"}
                                        </button>
                                    </form>

                                    <div className="pt-6 text-center">
                                        <p className="text-gray-600">
                                            Don't have an account?{" "}
                                            <Link
                                                href="/register"
                                                className="font-semibold text-[#2E8B57] hover:text-[#228B22] transition-colors duration-300"
                                            >
                                                Create Account
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                // Register: Left side is Instructions
                                <div className="h-full flex flex-col justify-center">
                                    <div className="space-y-2 mb-8">
                                        <h2 className="text-4xl font-bold text-[#228B22]">Getting Started</h2>
                                        <p className="text-gray-600 text-lg">Follow these steps to create your account</p>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {instructions.map((instruction, index) => (
                                            <div key={index} className="flex items-start space-x-3">
                                                <div className="w-2 h-2 bg-[#2E8B57] rounded-full mt-2 flex-shrink-0"></div>
                                                <p className="text-gray-700 text-lg leading-relaxed">{instruction}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="hidden lg:flex items-center justify-center">
                            <div className="w-0.5 h-4/5 bg-gradient-to-b from-transparent via-[#2E8B57]/30 to-transparent"></div>
                        </div>
                        <div className="lg:hidden w-full h-0.5 bg-gradient-to-r from-transparent via-[#2E8B57]/30 to-transparent my-4"></div>
                        
                        <div className="flex-1 p-8 lg:p-12">
                            {isLogin ? (
                                // Login: Right side is Instructions
                                <div className="h-full flex flex-col justify-center">
                                    <div className="space-y-2 mb-8">
                                        <h2 className="text-4xl font-bold text-[#228B22]">Login Guide</h2>
                                        <p className="text-gray-600 text-lg">Important information for signing in</p>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {instructions.map((instruction, index) => (
                                            <div key={index} className="flex items-start space-x-3">
                                                <div className="w-2 h-2 bg-[#2E8B57] rounded-full mt-2 flex-shrink-0"></div>
                                                <p className="text-gray-700 text-lg leading-relaxed">{instruction}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                // Register: Right side is Form
                                <div className="h-full flex flex-col justify-center">
                                    <div className="space-y-2 mb-8">
                                        <h2 className="text-4xl font-bold text-[#228B22]">Create Account</h2>
                                        <p className="text-gray-600 text-lg">Join us and start your journey today</p>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <InputField
                                            label="Name"
                                            name="name"
                                            register={register}
                                            errors={errors}
                                            required
                                        />

                                        <InputField
                                            label="Email"
                                            name="email"
                                            type="email"
                                            register={register}
                                            errors={errors}
                                            required
                                        />

                                        <InputField
                                            label="Password"
                                            name="password"
                                            type="password"
                                            register={register}
                                            errors={errors}
                                            required
                                        />

                                        <button
                                            type="submit"
                                            disabled={registerUser.isPending}
                                            className="mt-5 w-full bg-[#2E8B57] hover:bg-[#228B22] text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {registerUser.isPending ? "Creating Account..." : "Create Account"}
                                        </button>
                                    </form>

                                    <div className="pt-6 text-center">
                                        <p className="text-gray-600">
                                            Already have an account?{" "}
                                            <Link
                                                href="/login"
                                                className="font-semibold text-[#2E8B57] hover:text-[#228B22] transition-colors duration-300"
                                            >
                                                Sign In
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
