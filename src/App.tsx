import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroBanner from './components/HeroBanner';
import LiveStreaming from './components/LiveStreaming';
import MarketDiscovery from './components/MarketDiscovery';
import CreatorLists from './components/CreatorLists';
import CreatorProfile from './components/CreatorProfile';
import Profile from './components/Profile';
import JoinUs from './components/JoinUs';
import Apply from './components/Apply';
import ApplyThanks from './components/ApplyThanks';
import AuthModal from './components/AuthModal';
import WalletConnectionModal from './components/WalletConnectionModal';

type Page = 'home' | 'creators' | 'creator' | 'profile' | 'join' | 'apply' | 'apply-thanks';
type AuthModalMode = 'signup' | 'login' | null;

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCreatorSlug, setSelectedCreatorSlug] = useState<string>('');
  const [applicationEmail, setApplicationEmail] = useState<string>('');
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>(null);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const { isAuthenticated, isWalletConnected } = useAuth();

  const handleNavigate = (page: string, slugOrEmail?: string) => {
    setCurrentPage(page as Page);
    if (slugOrEmail) {
      if (page === 'apply-thanks') {
        setApplicationEmail(slugOrEmail);
      } else {
        setSelectedCreatorSlug(slugOrEmail);
      }
    }
    window.scrollTo(0, 0);
  };

  const handleBuyAction = () => {
    if (!isAuthenticated) {
      setAuthModalMode('signup');
    } else if (!isWalletConnected) {
      setWalletModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onNavigate={handleNavigate}
        currentPage={currentPage}
        onSignUp={() => setAuthModalMode('signup')}
        onSignIn={() => setAuthModalMode('login')}
      />

      <main className="min-h-[calc(100vh-4rem)]">
        {currentPage === 'home' && (
          <>
            <HeroBanner />
            <LiveStreaming onNavigate={handleNavigate} />
            <MarketDiscovery onNavigate={handleNavigate} />
          </>
        )}
        {currentPage === 'creators' && <CreatorLists onNavigate={handleNavigate} />}
        {currentPage === 'creator' && (
          <CreatorProfile
            slug={selectedCreatorSlug}
            onBuyClick={handleBuyAction}
          />
        )}
        {currentPage === 'profile' && <Profile onNavigate={handleNavigate} />}
        {currentPage === 'join' && <JoinUs onNavigate={handleNavigate} />}
        {currentPage === 'apply' && <Apply onNavigate={handleNavigate} />}
        {currentPage === 'apply-thanks' && <ApplyThanks email={applicationEmail} />}
      </main>

      <Footer />

      <AuthModal
        isOpen={authModalMode !== null}
        onClose={() => setAuthModalMode(null)}
      />

      <WalletConnectionModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
