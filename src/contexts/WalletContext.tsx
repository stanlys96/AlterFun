import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

type WalletContextType = {
  isConnected: boolean;
  walletAddress: string | null;
  username: string | null;
  solBalance: number;
  needsUsername: boolean;
  connect: () => void;
  disconnect: () => void;
  setUsername: (username: string) => Promise<boolean>;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [username, setUsernameState] = useState<string | null>(null);
  const [solBalance, setSolBalance] = useState(0);
  const [needsUsername, setNeedsUsername] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('wallet_connected');
    if (stored) {
      const data = JSON.parse(stored);
      setIsConnected(true);
      setWalletAddress(data.address);
      setSolBalance(data.balance);
      loadUsername(data.address);
    }
  }, []);

  const loadUsername = async (address: string) => {
    const { data } = await supabase
      .from('users')
      .select('username')
      .eq('wallet_address', address)
      .maybeSingle();

    if (data) {
      setUsernameState(data.username);
      setNeedsUsername(false);
    } else {
      setNeedsUsername(true);
    }
  };

  const connect = async () => {
    const mockAddress = '5xJq...p7m';
    const mockBalance = 12.45;

    setIsConnected(true);
    setWalletAddress(mockAddress);
    setSolBalance(mockBalance);

    localStorage.setItem('wallet_connected', JSON.stringify({
      address: mockAddress,
      balance: mockBalance
    }));

    await loadUsername(mockAddress);
  };

  const setUsername = async (newUsername: string): Promise<boolean> => {
    if (!walletAddress) return false;

    const { data: existing } = await supabase
      .from('users')
      .select('username')
      .eq('username', newUsername)
      .maybeSingle();

    if (existing) {
      return false;
    }

    const { error } = await supabase
      .from('users')
      .upsert({
        wallet_address: walletAddress,
        username: newUsername,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'wallet_address'
      });

    if (!error) {
      setUsernameState(newUsername);
      setNeedsUsername(false);
      return true;
    }

    return false;
  };

  const disconnect = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setUsernameState(null);
    setSolBalance(0);
    setNeedsUsername(false);
    localStorage.removeItem('wallet_connected');
  };

  return (
    <WalletContext.Provider value={{
      isConnected,
      walletAddress,
      username,
      solBalance,
      needsUsername,
      connect,
      disconnect,
      setUsername
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}
