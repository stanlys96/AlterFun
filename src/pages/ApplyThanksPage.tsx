import { CheckCircle, MessageCircle } from "lucide-react";

type ApplyThanksProps = {
  email?: string;
};

export const ApplyThanksPage = ({ email }: ApplyThanksProps) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-[#03EC86] rounded-full mb-8">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Application Sent!
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Thank you! Our team will now manually review your channel links to
            make sure you're a real, active creator.
          </p>

          <div className="bg-gray-50 rounded-xl p-8 shadow-sm mb-12 text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              What happens next?
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#7E34FF] rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                  1
                </div>
                <div>
                  <p className="text-gray-700">
                    We'll send an email to{" "}
                    <span className="font-semibold text-gray-900">
                      {email || "your email address"}
                    </span>{" "}
                    within 2-3 business days with the results.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#7E34FF] rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                  2
                </div>
                <div>
                  <p className="text-gray-700">
                    If approved, our email will include the final, simple steps
                    to verify ownership of your account and launch your page!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-600 rounded-xl p-8 text-white">
            <MessageCircle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">
              While you wait, why not join our Discord to meet other creators?
            </h3>
            <p className="text-white/90 mb-6">
              Connect with fellow creators, get tips, and be the first to know
              about new features.
            </p>
            <a
              href="https://discord.gg/alterfun"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-white text-[#7E34FF] font-bold rounded-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Join the Alterfun Discord
            </a>
          </div>

          <div className="mt-12">
            <a
              href="/"
              className="text-[#7E34FF] hover:text-purple-700 font-semibold"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
