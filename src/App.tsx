import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import {
  ApplyPage,
  ApplyThanksPage,
  CreatorDetailPage,
  CreatorListsPage,
  CreatorProfilePage,
  DiscoverPage,
  HomePage,
  JoinUsPage,
  LiveStreamPage,
  ProfilePage,
  ProfilePage2,
  TokensPage,
} from "./pages";
import {
  AuthModal,
  Header,
  OTPModal,
  WalletConnectionModal,
} from "./components";
import { useLocation } from "react-router-dom";

type AuthModalMode = "signup" | "login" | null;

function AppContent() {
  const location = useLocation();
  // const currentPage = location?.pathname;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<
    "home" | "talents" | "market" | "prime" | "dashboard" | "about"
  >("home");
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true for mockup

  // Mock user data
  const userData = {
    name: "Sarah Tanaka",
    sparks: 12500,
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setCurrentPage("home");
  };
  const [selectedCreatorSlug, setSelectedCreatorSlug] = useState<string>("");
  const [applicationEmail, setApplicationEmail] = useState<string>("");
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>(null);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState<boolean>(false);
  const { isAuthenticated, isWalletConnected } = useAuth();

  const handleNavigate = (page: string, slugOrEmail?: string) => {
    window.scrollTo(0, 0);
    navigate(`/${page}`);
    if (slugOrEmail) {
      if (page === "apply-thanks") {
        setApplicationEmail(slugOrEmail);
      } else {
        setSelectedCreatorSlug(slugOrEmail);
      }
    }
  };

  const handleBuyAction = () => {
    if (!isAuthenticated) {
      setAuthModalMode("signup");
    } else if (!isWalletConnected) {
      setWalletModalOpen(true);
    }
  };

  const showOTPModal = () => {
    setAuthModalMode(null);
    setOtpModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onNavigate={setCurrentPage}
        isLoggedIn={isLoggedIn}
        userName={userData.name}
        userSparks={userData.sparks}
        onSignOut={handleSignOut}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/creators"
          element={<CreatorListsPage onNavigate={handleNavigate} />}
        />
        <Route
          path="/creator/:creator"
          element={
            <CreatorDetailPage
              onFollowClick={handleBuyAction}
              onBack={() => {
                navigate(-1);
                window.scrollTo(0, 0);
              }}
            />
          }
        />
        <Route path="/profile" element={<ProfilePage2 />} />
        <Route
          path="/join"
          element={<JoinUsPage onNavigate={handleNavigate} />}
        />
        <Route
          path="/apply"
          element={<ApplyPage onNavigate={handleNavigate} />}
        />
        <Route
          path="/apply-thanks"
          element={<ApplyThanksPage email={applicationEmail} />}
        />
        <Route
          path="/discover"
          element={<DiscoverPage onCreatorClick={handleNavigate} />}
        />
        <Route path="/live-stream" element={<LiveStreamPage />} />
        <Route path="/tokens" element={<TokensPage />} />
      </Routes>
      <AuthModal
        isOpen={authModalMode !== null}
        onClose={() => setAuthModalMode(null)}
        initialMode={authModalMode || "signup"}
        showOTPModal={showOTPModal}
      />

      <WalletConnectionModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />
      <OTPModal open={otpModalOpen} onClose={() => setOtpModalOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
