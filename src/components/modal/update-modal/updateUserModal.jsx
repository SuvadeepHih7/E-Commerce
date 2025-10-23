"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import toast from "react-hot-toast";

export default function UpdateUserModal({ user, onClose }) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
        },
    });

    const { updateUser } = useAuth();
     const { setUser } = useContext(AuthContext);

    const onSubmit = async (data) => {
        try {
            const res = await updateUser.mutateAsync({ id: user._id, data });
            setUser((prev) => ({ ...prev, ...res.data.updatedUser || data }))
            toast.success(" User Updated Successfully!");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update user");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-5">
             <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 w-full max-w-md">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#2E8B57]/10 to-[#3CB371]/10 p-6 rounded-t-3xl text-center">
                    <h3 className="text-2xl font-bold text-[#228B22]">
                        Update User Info
                    </h3>
                    <p className="text-gray-600 mt-2">Manage your profile details</p>
                </div>


                <div className="px-8 lg:px-12 mb-8">
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#2E8B57]/50 to-transparent"></div>
                </div> 

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            className="w-full border border-gray-300 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E8B57]/50 focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                        <input
                            {...register("email", {
                                required: "Email is required"
                            })}
                            type="email"
                            className="w-full border border-gray-300 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E8B57]/50 focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer bg-gray-400/80 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-500/80 transition-all duration-300 hover:shadow-lg backdrop-blur-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={updateUser.isPending}
                            className="cursor-pointer bg-gradient-to-r from-[#2E8B57] to-[#3CB371] text-white px-6 py-3 rounded-xl font-medium hover:from-[#228B22] hover:to-[#2E8B57] transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed backdrop-blur-sm"
                        >
                            {updateUser.isPending ? "Updating..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
