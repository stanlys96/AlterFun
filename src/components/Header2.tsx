const image_87599d96af2012a1a657a0bebaa3c837b68be1b6 = "images/alterfun.png";
import { useState } from "react";
import { User, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import AuthModal from "./AuthModal";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
const logo = "images/5cb4e866c2dd11416d612df77a48f8661376c26b.png";

type HeaderProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  onAuthSuccess: () => void;
};

export const Header2 = ({
  currentPage,
  onNavigate,
  isAuthenticated,
  onAuthSuccess,
}: HeaderProps) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 🔴 MOCK USER DATA - Replace with real user data from auth context
  const mockUser = {
    username: "CryptoFan_2024",
    avatarUrl: "",
  };

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleMobileNavigation = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <button
            onClick={() => onNavigate("")}
            className="flex items-center gap-2"
          >
            <img
              src={image_87599d96af2012a1a657a0bebaa3c837b68be1b6}
              alt="ALTERFUN"
              className="h-8"
            />
          </button>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate("")}
              className={`transition-colors ${
                currentPage === "/"
                  ? "text-[#7E34FF]"
                  : "text-gray-700 hover:text-[#7E34FF]"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate("discover")}
              className={`transition-colors ${
                currentPage === "/discover"
                  ? "text-[#7E34FF]"
                  : "text-gray-700 hover:text-[#7E34FF]"
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => onNavigate("tokens")}
              className={`transition-colors ${
                currentPage === "/tokens"
                  ? "text-[#7E34FF]"
                  : "text-gray-700 hover:text-[#7E34FF]"
              }`}
            >
              Launched Tokens
            </button>
            <button
              onClick={() => onNavigate("join")}
              className={`transition-colors ${
                currentPage === "/join"
                  ? "text-[#7E34FF]"
                  : "text-gray-700 hover:text-[#7E34FF]"
              }`}
            >
              Join Us
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <button
              onClick={() => onNavigate("profile")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Avatar className="w-9 h-9 border-2 border-[#7E34FF]/20">
                <AvatarImage src={mockUser.avatarUrl} />
                <AvatarFallback className="bg-gradient-to-br from-[#7E34FF] to-[#03EC86] text-white text-sm">
                  {mockUser.username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-gray-900">
                {mockUser.username}
              </span>
            </button>
          ) : (
            <>
              <Button
                variant="ghost"
                className="hidden md:flex text-gray-700"
                onClick={() => handleAuthClick("login")}
              >
                Sign In
              </Button>
              <Button
                className="hidden md:flex bg-[#03EC86] hover:bg-[#02d478] text-white"
                onClick={() => handleAuthClick("signup")}
              >
                Sign Up
              </Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Mobile navigation menu with links to main pages
              </SheetDescription>
              <nav className="flex flex-col gap-6 mt-8 px-6">
                <button
                  onClick={() => handleMobileNavigation("home")}
                  className={`text-left text-lg transition-colors ${
                    currentPage === "/" ? "text-[#7E34FF]" : "text-gray-700"
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleMobileNavigation("discover")}
                  className={`text-left text-lg transition-colors ${
                    currentPage === "/discover"
                      ? "text-[#7E34FF]"
                      : "text-gray-700"
                  }`}
                >
                  Discover
                </button>
                <button
                  onClick={() => handleMobileNavigation("/join")}
                  className="text-left text-lg text-gray-700"
                >
                  Join Us
                </button>

                {!isAuthenticated && (
                  <div className="flex flex-col gap-3 pt-6 border-t border-gray-200">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        handleAuthClick("login");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="w-full bg-[#03EC86] hover:bg-[#02d478] text-white"
                      onClick={() => {
                        handleAuthClick("signup");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        showOTPModal={onAuthSuccess}
      />
    </header>
  );
};
