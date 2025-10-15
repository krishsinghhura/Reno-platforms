"use client";

import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Navbar from "../../components/NavBar";
import { useToast } from "../../components/ToastProvider";
import {
  Upload,
  CheckCircle2,
  GraduationCap,
  Shield,
  Users,
  Zap,
  Loader2,
} from "lucide-react";

interface SchoolFormData {
  schoolName: string;
  address: string;
  city: string;
  state: string;
  contactNumber: string;
  email: string;
  image: FileList | null;
}

const AddSchool = () => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SchoolFormData>();

  const onSubmit = async (data: SchoolFormData) => {
    setIsSubmitting(true); // start loader
    try {
      const formData = new FormData();
      formData.append("name", data.schoolName);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contactNumber);
      formData.append("email_id", data.email);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const res = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        toast({
          title: "Error",
          description: result.errors
            ? result.errors.join(", ")
            : result.error,
          variant: "error",
        });
        return;
      }

      toast({
        title: "Success!",
        description: "School added successfully",
        variant: "success",
      });

      reset();
      setImagePreview("");
    } catch (error) {
      console.error("Error submitting school:", error);
      toast({
        title: "Error",
        description: "Something went wrong while adding the school.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false); // stop loader
    }
  };

  const bgGradientStyle = {
    background:
      "linear-gradient(to bottom right, var(--primary), var(--secondary))",
  };

  return (
    <div style={{ backgroundColor: "var(--background)" }} className="min-h-screen relative">
      <Navbar />

      {/* Full-page loader overlay */}
      {isSubmitting && (
        <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center">
          <Loader2 className="animate-spin w-12 h-12 text-white" />
        </div>
      )}

      <div className="flex flex-col lg:flex-row">
        {/* Hero Section */}
        <div
          className="hidden lg:flex lg:w-2/5 p-12 flex-col justify-center max-w-lg mx-auto rounded-xl"
          style={bgGradientStyle}
        >
          <div className="mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Add Your School to Our Directory
            </h1>
            <p className="text-white/90 text-lg">
              Join our growing community of educational institutions and make your school discoverable
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6">
            {[
              { icon: Zap, title: "Instant Publishing", description: "Your school information goes live immediately after submission. No waiting, no approval delays." },
              { icon: Users, title: "Reach More Families", description: "Connect with parents and students searching for quality education in your area." },
              { icon: Shield, title: "Verified Listings", description: "All information is validated and secured. Your school's reputation matters to us." },
              { icon: CheckCircle2, title: "Easy Management", description: "Simple form, quick submission. Update your information anytime you need." },
            ].map(({ icon: Icon, title, description }, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                  <p className="text-white/80">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
            <p className="text-white/90 text-sm italic">
              "Adding our school to this directory was seamless. We've seen a significant increase in inquiries from interested families."
            </p>
            <p className="text-white font-semibold mt-3">— Principal, Reno Platforms</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 lg:w-3/5">
          <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 lg:hidden">
              <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">Add New School</h1>
              <p className="text-gray-600">Fill in the details to add a school to the directory</p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200"
            >
              <div className="grid gap-6">
                {/* School Name */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">School Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    {...register("schoolName", { required: "School name is required" })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter school name"
                  />
                  {errors.schoolName && <p className="mt-1 text-sm text-red-500">{errors.schoolName.message}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Address <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    {...register("address", { required: "Address is required" })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Enter street address"
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
                </div>

                {/* City and State */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">City <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      {...register("city", { required: "City is required" })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Enter city"
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">State <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      {...register("state", { required: "State is required" })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Enter state"
                    />
                    {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state.message}</p>}
                  </div>
                </div>

                {/* Contact and Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Contact Number <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      {...register("contactNumber", { required: "Contact number is required", pattern: { value: /^[0-9]{10}$/, message: "Contact must be 10 digits" } })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="10-digit number"
                    />
                    {errors.contactNumber && <p className="mt-1 text-sm text-red-500">{errors.contactNumber.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Email ID <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      {...register("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" } })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="school@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">School Image</label>
                  <Controller
                    name="image"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-100 transition-all">
                        {imagePreview ? (
                          <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                        ) : (
                          <div className="flex flex-col items-center justify-center py-6">
                            <Upload className="w-12 h-12 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-400">Click to upload image</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(e.target.files);
                              const reader = new FileReader();
                              reader.onloadend = () => setImagePreview(reader.result as string);
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 ${
                    isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:opacity-90"
                  }`}
                >
                  {isSubmitting && <Loader2 className="animate-spin w-5 h-5" />}
                  {isSubmitting ? "Adding..." : "Add School"}
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AddSchool;
