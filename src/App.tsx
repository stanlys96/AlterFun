import { useState } from 'react';
import { WalletProvider, useWallet } from './contexts/WalletContext';
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
import ConnectWalletModal from './components/ConnectWalletModal';
import UsernameSetupModal from './components/UsernameSetupModal';

type Page = 'home' | 'creators' | 'creator' | 'profile' | 'join' | 'apply' | 'apply-thanks';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCreatorSlug, setSelectedCreatorSlug] = useState<string>('');
  const [applicationEmail, setApplicationEmail] = useState<string>('');
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const { needsUsername } = useWallet();

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

  const handleConnectWallet = () => {
    setWalletModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onNavigate={handleNavigate}
        currentPage={currentPage}
        onConnectWallet={handleConnectWallet}
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
            onConnectWallet={handleConnectWallet}
          />
        )}
        {currentPage === 'profile' && <Profile onNavigate={handleNavigate} />}
        {currentPage === 'join' && <JoinUs onNavigate={handleNavigate} />}
        {currentPage === 'apply' && <Apply onNavigate={handleNavigate} />}
        {currentPage === 'apply-thanks' && <ApplyThanks email={applicationEmail} />}
      </main>

      <Footer />

      <ConnectWalletModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />

      {needsUsername && <UsernameSetupModal />}
    </div>
  );
}

function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  );
}

export default App;
