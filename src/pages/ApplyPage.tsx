import { useState } from "react";
import { Upload } from "lucide-react";
import { supabase } from "../lib/supabase";
import Swal from "sweetalert2";

type ApplyProps = {
  onNavigate: (page: string, email?: string) => void;
};

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "blue",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

export const ApplyPage = ({ onNavigate }: ApplyProps) => {
  const [formData, setFormData] = useState({
    businessEmail: "",
    creatorName: "",
    youtubeLink: "",
    twitchLink: "",
    twitterLink: "",
    bio: "",
    category: "",
    username: "",
    profilePicture: null as File | null,
    agreeToTerms: false,
  });

  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.agreeToTerms) {
      const message = "Please agree to the Terms of Service to continue.";
      setError(message);
      await Toast.fire({
        icon: "info",
        title: message,
      });
      return;
    }

    if (
      !formData.businessEmail?.trim() ||
      !formData.creatorName?.trim() ||
      !formData.username?.trim() ||
      !formData.category?.trim() ||
      !formData.bio?.trim()
    ) {
      const message = "Please fill in all required fields.";
      setError(message);
      await Toast.fire({
        icon: "info",
        title: message,
      });
      return;
    }

    if (
      !formData.youtubeLink?.trim() &&
      !formData.twitchLink?.trim() &&
      !formData.twitterLink?.trim()
    ) {
      const message = "Please provide at least one channel link.";
      setError(message);
      await Toast.fire({
        icon: "info",
        title: message,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let profilePictureUrl = null;

      if (formData.profilePicture) {
        const fileExt = formData.profilePicture.name.split(".").pop();
        const fileName = `profile-pictures/${
          formData?.businessEmail
        }/${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("profile-pictures")
          .upload(fileName, formData.profilePicture);

        if (uploadError) {
          console.error("Upload error:", uploadError);
        } else {
          const { data } = supabase.storage
            .from("profile-pictures")
            .getPublicUrl(fileName);
          profilePictureUrl = data.publicUrl;
        }
      }

      const { error: insertError } = await supabase
        .from("creator_applications")
        .insert([
          {
            business_email: formData.businessEmail,
            creator_name: formData.creatorName,
            youtube_link: formData.youtubeLink || null,
            twitch_link: formData.twitchLink || null,
            twitter_link: formData.twitterLink || null,
            bio: formData.bio || null,
            category: formData.category || null,
            profile_picture_url: profilePictureUrl,
            username: formData.username,
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      onNavigate("apply-thanks", formData.businessEmail);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(
        err.message || "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Creator Application Form
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
            We're excited you're interested! Just fill out the form below. Our
            team will manually review it to ensure every creator on Alterfun is
            real and active.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              1. Contact Info
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Your Business Email <span className="text-[#FF2C2C]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.businessEmail}
                  onChange={(e) =>
                    handleInputChange("businessEmail", e.target.value)
                  }
                  className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E34FF] focus:border-transparent"
                  placeholder="your@email.com"
                />
                <p className="mt-2 text-sm text-gray-600">
                  We'll only use this email to notify you about your application
                  status. No spam, ever.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Creator Name <span className="text-[#FF2C2C]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.creatorName}
                  onChange={(e) =>
                    handleInputChange("creatorName", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E34FF] focus:border-transparent"
                  placeholder="Your creator name"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Your public name that fans and supporters will see.
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Username <span className="text-[#FF2C2C]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E34FF] focus:border-transparent"
                  placeholder="Your username"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Your username that fans and supporters will see.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              2. Your Channel Links
            </h2>
            <p className="text-gray-700 mb-6">
              Please copy-paste the links to your main channels. Our team will
              check these links to verify your activity.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  YouTube Channel Link
                </label>
                <input
                  type="url"
                  value={formData.youtubeLink}
                  onChange={(e) =>
                    handleInputChange("youtubeLink", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E34FF] focus:border-transparent"
                  placeholder="https://www.youtube.com/channel/UC..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Twitch Channel Link
                </label>
                <input
                  type="url"
                  value={formData.twitchLink}
                  onChange={(e) =>
                    handleInputChange("twitchLink", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E34FF] focus:border-transparent"
                  placeholder="https://www.twitch.tv/yourname"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Twitter / X Link
                </label>
                <input
                  type="url"
                  value={formData.twitterLink}
                  onChange={(e) =>
                    handleInputChange("twitterLink", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E34FF] focus:border-transparent"
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              3. Profile Info
            </h2>
            <p className="text-gray-700 mb-6">
              We'll use this info for your public profile page if you're
              approved. (You can change all of this later).
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Short Bio / Tagline <span className="text-[#FF2C2C]">*</span>
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E34FF] focus:border-transparent"
                  rows={3}
                  placeholder="Describe yourself in 1-2 sentences."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Category <span className="text-[#FF2C2C]">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white cursor-pointer border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E34FF] focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  <option value="VTuber">VTuber</option>
                  <option value="Gamer">Gamer</option>
                  <option value="Artist">Artist</option>
                  <option value="Musician">Musician</option>
                  <option value="Educator">Educator</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Upload Profile Picture
                </label>
                <div className="mt-2">
                  <label className="flex bg-white flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    {profilePicturePreview ? (
                      <img
                        src={profilePicturePreview}
                        alt="Profile preview"
                        className="h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="mb-2 text-sm text-gray-600">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG (MAX. 5MB)
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  (Optional) You can also set this up after you're approved.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              4. Submit Application
            </h2>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                    handleInputChange("agreeToTerms", e.target.checked)
                  }
                  className="w-5 h-5 cursor-pointer text-[#7E34FF] border-gray-300 rounded focus:ring-[#7E34FF]"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  I have read and agree to the{" "}
                  <a
                    // href="/terms"
                    className="text-[#7E34FF] hover:underline font-semibold"
                  >
                    Alterfun Creator Terms of Service
                  </a>
                  .
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-[#7E34FF] text-white text-lg font-bold rounded-lg hover:bg-purple-700 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit My Application"}
              </button>

              <p className="text-center text-sm text-gray-600">
                Our team will review your application and get back to you via
                email within 2-3 business days.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
