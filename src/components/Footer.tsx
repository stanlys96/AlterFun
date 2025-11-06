import { MessageCircle, Twitter, Instagram } from "lucide-react";
const logo = "images/alterfun.png";

type FooterProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
};

export const Footer = ({ currentPage, onNavigate }: FooterProps) => {
  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();

    // If not on home page, navigate to home first
    if (currentPage !== "/") {
      onNavigate("/");
      // Wait for page to render, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="ALTERFUN" className="h-8" />
            </div>
            <p className="text-gray-400 text-sm">
              Empowering Creators Economy with IP Tokenization
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleSectionClick(e, "home")}
                  className="hover:text-[#7E34FF] transition-colors cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#discover"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/discover");
                  }}
                  className="hover:text-[#7E34FF] transition-colors cursor-pointer"
                >
                  Discover
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleSectionClick(e, "about")}
                  className="hover:text-[#7E34FF] transition-colors cursor-pointer"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleSectionClick(e, "faq")}
                  className="hover:text-[#7E34FF] transition-colors cursor-pointer"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#apply"
                  onClick={(e) => handleSectionClick(e, "apply")}
                  className="hover:text-[#7E34FF] transition-colors cursor-pointer"
                >
                  Join as a Creator
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              <a
                href="#discord"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#7E34FF] transition-colors"
                aria-label="Discord"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#twitter"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#7E34FF] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#instagram"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#7E34FF] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 AlterFun. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
