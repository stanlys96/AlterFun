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
  HomePage2,
  JoinUsPage,
  LiveStreamPage,
  ProfilePage,
  TokensPage,
} from "./pages";
import {
  AuthModal,
  Footer,
  Header,
  Header2,
  OTPModal,
  WalletConnectionModal,
} from "./components";
import { useLocation } from "react-router-dom";

type AuthModalMode = "signup" | "login" | null;

function AppContent() {
  const location = useLocation();
  const currentPage = location?.pathname;
  const navigate = useNavigate();
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
      <Header2
        onNavigate={handleNavigate}
        currentPage={currentPage}
        isAuthenticated={isAuthenticated}
        onAuthSuccess={() => setOtpModalOpen(true)}
      />

      <main className="min-h-[calc(100vh-4rem)]">
        <Routes>
          <Route path="/" element={<HomePage2 />} />
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
          <Route
            path="/profile"
            element={<ProfilePage onNavigate={handleNavigate} />}
          />
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
      </main>

      <Footer currentPage="/" onNavigate={navigate} />

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
