import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import {
  AboutPage,
  DashboardPage,
  HomePage,
  MarketPage,
  PrimeRealmPage,
  TalentDetail,
  TalentsPage,
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to true for mockup

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
  const { isAuthenticated, isWalletConnected, signOut, user } = useAuth();

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
        onNavigate={(page: string) => handleNavigate(page)}
        isLoggedIn={isAuthenticated}
        user={user}
        onSignOut={signOut}
        onPressGetStarted={() => setAuthModalMode("signup")}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/talents" element={<TalentsPage />} />
        <Route
          path="/talents/:talent"
          element={
            <TalentDetail
              onUnAuthenticatedPressButton={() => setAuthModalMode("signup")}
            />
          }
        />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/prime" element={<PrimeRealmPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
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
