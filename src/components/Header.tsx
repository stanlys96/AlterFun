import { Search, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { supabase, Creator } from "../lib/supabase";
import { useLocation } from "react-router-dom";

type HeaderProps = {
  onNavigate: (page: string, slug?: string) => void;
  onSignUp: () => void;
  onSignIn: () => void;
};

export default function Header({
  onNavigate,
  onSignUp,
  onSignIn,
}: HeaderProps) {
  const location = useLocation();
  const { user, isAuthenticated, signOut } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Creator[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      searchCreators();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const searchCreators = async () => {
    setIsSearching(true);
    const { data } = await supabase
      .from("creators")
      .select("*")
      .eq("enabled", true)
      .ilike("name", `%${searchQuery}%`)
      .limit(5);

    if (data) {
      setSearchResults(data);
    }
    setIsSearching(false);
  };

  const handleCreatorClick = (slug: string) => {
    onNavigate("creator", slug);
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate("")}
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src="https://i.imgur.com/nBAB1gi.png"
                alt="ALTERFUN"
                className="h-8"
              />
            </button>

            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => onNavigate("creators")}
                className={`text-sm font-medium transition-colors ${
                  location?.pathname === "/creators"
                    ? "text-[#7E34FF]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Creator Lists
              </button>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  Are you a Streamer?
                </span>
                <button
                  onClick={() => onNavigate("join")}
                  className="px-4 py-1.5 bg-gradient-to-r from-[#7E34FF] to-purple-700 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all"
                >
                  Join Us
                </button>
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search creators..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#7E34FF]"
                      autoFocus
                    />
                  </div>
                  {isSearching && (
                    <div className="p-4 text-center text-sm text-gray-500">
                      Searching...
                    </div>
                  )}
                  {!isSearching && searchResults.length > 0 && (
                    <div className="max-h-64 overflow-y-auto">
                      {searchResults.map((creator) => (
                        <button
                          key={creator.id}
                          onClick={() => handleCreatorClick(creator.slug)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
                        >
                          <img
                            src={creator.avatar_url}
                            alt={creator.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {creator.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {(creator.subscribers / 1000).toFixed(1)}k
                              subscribers
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  {!isSearching &&
                    searchQuery.trim() &&
                    searchResults.length === 0 && (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No creators found
                      </div>
                    )}
                </div>
              )}
            </div>

            {!isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={onSignIn}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={onSignUp}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/30"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate("profile")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                    location?.pathname === "/profile"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {user?.username || "Profile"}
                  </span>
                </button>

                <button
                  onClick={signOut}
                  className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
