import { useState } from "react";
import { Menu, X, Zap, Sparkles } from "lucide-react";

interface HeaderProps {
  onNavigate: (
    page: "home" | "talents" | "market" | "prime" | "dashboard" | "about"
  ) => void;
  isLoggedIn?: boolean;
  userName?: string;
  userSparks?: number;
  onSignOut?: () => void;
}

export function Header({
  onNavigate,
  isLoggedIn = false,
  userName = "",
  userSparks = 0,
  onSignOut,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (
    page: "home" | "talents" | "market" | "prime" | "dashboard" | "about"
  ) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span
              className="text-2xl text-gray-900"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              AlterFUN
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavClick("home")}
              className="text-gray-700 hover:text-purple-600 transition-colors font-semibold"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick("talents")}
              className="text-gray-700 hover:text-purple-600 transition-colors font-semibold"
            >
              Talents
            </button>
            <button
              onClick={() => handleNavClick("market")}
              className="text-gray-700 hover:text-purple-600 transition-colors font-semibold"
            >
              Market
            </button>
            <button
              onClick={() => handleNavClick("prime")}
              className="text-gray-700 hover:text-purple-600 transition-colors font-semibold"
            >
              Prime Realm
            </button>
            <button
              onClick={() => handleNavClick("about")}
              className="text-gray-700 hover:text-purple-600 transition-colors font-semibold"
            >
              About
            </button>
          </nav>

          {/* Right Side - User Info or CTA */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                {/* Sparks Balance */}
                <div className="flex items-center gap-2 bg-purple-100 border border-purple-300 px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4 text-purple-600 fill-purple-600" />
                  <span className="font-bold text-purple-900">
                    {userSparks.toLocaleString()}
                  </span>
                </div>

                {/* User Menu */}
                <button
                  onClick={() => handleNavClick("dashboard")}
                  className="text-gray-700 hover:text-purple-600 transition-colors font-semibold"
                >
                  {userName}
                </button>

                {/* Sign Out */}
                <button
                  onClick={onSignOut}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all shadow-lg font-semibold">
                Get Started
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center hover:bg-purple-200 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-purple-600" />
            ) : (
              <Menu className="w-6 h-6 text-purple-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-purple-200">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => handleNavClick("home")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-semibold py-2 text-left"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick("talents")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-semibold py-2 text-left"
              >
                Talents
              </button>
              <button
                onClick={() => handleNavClick("market")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-semibold py-2 text-left"
              >
                Market
              </button>
              <button
                onClick={() => handleNavClick("prime")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-semibold py-2 text-left"
              >
                Prime Realm
              </button>
              <button
                onClick={() => handleNavClick("about")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-semibold py-2"
              >
                About
              </button>

              {isLoggedIn ? (
                <>
                  <div className="border-t border-purple-200 pt-4 mt-2">
                    <div className="flex items-center gap-2 bg-purple-100 border border-purple-300 px-4 py-2 rounded-full mb-3 inline-flex">
                      <Zap className="w-4 h-4 text-purple-600 fill-purple-600" />
                      <span className="font-bold text-purple-900">
                        {userSparks.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleNavClick("dashboard")}
                      className="text-gray-700 hover:text-purple-600 transition-colors font-semibold py-2 block"
                    >
                      {userName}
                    </button>
                    <button
                      onClick={() => {
                        onSignOut?.();
                        setIsMenuOpen(false);
                      }}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold mt-2"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-all shadow-lg font-semibold mt-2">
                  Get Started
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
