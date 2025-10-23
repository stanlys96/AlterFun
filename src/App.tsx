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
  CreatorListsPage,
  CreatorProfilePage,
  HomePage,
  JoinUsPage,
  ProfilePage,
} from "./pages";
import {
  AuthModal,
  Footer,
  Header,
  OTPModal,
  WalletConnectionModal,
} from "./components";

type Page =
  | "home"
  | "creators"
  | "creator"
  | "profile"
  | "join"
  | "apply"
  | "apply-thanks";
type AuthModalMode = "signup" | "login" | null;

function AppContent() {
  const navigate = useNavigate();
  const [selectedCreatorSlug, setSelectedCreatorSlug] = useState<string>("");
  const [applicationEmail, setApplicationEmail] = useState<string>("");
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>(null);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const { isAuthenticated, isWalletConnected } = useAuth();

  const handleNavigate = (page: string, slugOrEmail?: string) => {
    navigate(`/${page}`);
    if (slugOrEmail) {
      if (page === "apply-thanks") {
        setApplicationEmail(slugOrEmail);
      } else {
        setSelectedCreatorSlug(slugOrEmail);
      }
    }
    window.scrollTo(0, 0);
  };

  const handleBuyAction = () => {
    if (!isAuthenticated) {
      setAuthModalMode("signup");
    } else if (!isWalletConnected) {
      setWalletModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onNavigate={handleNavigate}
        onSignUp={() => setAuthModalMode("signup")}
        onSignIn={() => setAuthModalMode("login")}
      />

      <main className="min-h-[calc(100vh-4rem)]">
        <Routes>
          <Route
            path="/"
            element={<HomePage handleNavigate={handleNavigate} />}
          />
          <Route
            path="/creators"
            element={<CreatorListsPage onNavigate={handleNavigate} />}
          />
          <Route
            path="/creator"
            element={
              <CreatorProfilePage
                slug={selectedCreatorSlug}
                onBuyClick={handleBuyAction}
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
        </Routes>
      </main>

      <Footer />

      <AuthModal
        isOpen={authModalMode !== null}
        onClose={() => setAuthModalMode(null)}
        initialMode={authModalMode || "signup"}
      />

      <WalletConnectionModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />
      <OTPModal />
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
