import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../lib/supabase";
import { config } from "../config";
import { useWallet } from "@solana/wallet-adapter-react";

type User = {
  id: string;
  email: string | null;
  wallet_address: string | null;
  username: string | null;
  profile_picture_url: string | null;
  sparks: number | null;
  prime_member: boolean | null;
  level: number | null;
  experience: number | null;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isWalletConnected: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithTwitter: () => Promise<void>;
  signUpWithEmail: (email: string, username?: string) => Promise<void>;
  signInWithEmail: (email: string) => Promise<void>;
  verifyOtp: (email: string, otpCode: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  connectWallet: (walletType: "phantom" | "solflare") => Promise<void>;
  disconnectWallet: () => Promise<void>;
  signInWithSolanaWallet: () => Promise<void>;
  currentCreatorChapter: any;
  setCurrentCreatorChapter: (value: any) => void;
  updateUser: (email: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentCreatorChapter, setCurrentCreatorChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const { publicKey } = useWallet();
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        try {
          // const { data } = await supabase
          //   .from("users")
          //   .select("*")
          //   .eq("email", session?.user?.email)
          //   .maybeSingle();
          // setUser({
          // id: session.user.id,
          // email: session?.user?.email || null,
          // wallet_address: null,
          // username: data?.username,
          // profile_picture_url: data?.avatar_url,
          // sparks: data?.sparks,
          // prime_member: data?.prime_member,
          // level: data?.level,
          // experience: data?.experience,
          // });
        } catch (e) {
          console.log(e, "<<< E");
        }
      } else {
        setUser(null);
      }
    });
    initializeAuth();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const initializeAuth = async () => {
    try {
      const {
        data: { session },
      } = await supabase?.auth?.getSession();
      if (session?.user) {
        try {
          const { data } = await supabase
            .from("users")
            .select("*")
            .eq("email", session?.user?.email)
            .maybeSingle();
          setUser({
            id: session.user.id,
            email: data?.email,
            wallet_address: null,
            username: data?.username,
            profile_picture_url: data?.avatar_url,
            sparks: data?.sparks,
            prime_member: data?.prime_member,
            level: data?.level,
            experience: data?.experience,
          });
        } catch (e) {
          console.log(e, "<<< E");
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (email: string) => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
    setUser({
      id: data?.id,
      email: data?.email || null,
      wallet_address: null,
      username: data?.username,
      profile_picture_url: data?.avatar_url,
      sparks: data?.sparks,
      prime_member: data?.prime_member,
      level: data?.level,
      experience: data?.experience,
    });
  };

  const signInWithSolanaWallet = async () => {
    const { error } = await supabase.auth.signInWithWeb3({
      chain: "solana",
      statement: "I accept the Terms of Service at https://alterfun.com",
    });
    if (error) throw error;
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
  };

  const signInWithTwitter = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) throw error;
  };

  const signUpWithEmail = async (email: string, username?: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          username: username || email.split("@")[0],
        },
      },
    });
    if (error) throw error;
  };

  const signInWithEmail = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) throw error;
  };

  const verifyOtp = async (email: string, otpCode: string) => {
    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: otpCode, // The 6-digit code the user received
      type: "email", // The type is 'email' for email OTP
    });
    if (error) throw error;
    await updateUser(email);
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (e) {
      console.log(e, "<<< E");
    }
  };

  const resetPassword = async (email: string) => {
    if (config.useMockData) {
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
  };

  const connectWallet = async (walletType: "phantom" | "solflare") => {
    if (!user) {
      throw new Error("Please sign in first");
    }

    if (config.useMockData) {
      const mockWalletAddress = `${
        walletType === "phantom" ? "5xJq" : "7mKp"
      }...${walletType === "phantom" ? "p7m" : "n9q"}`;
      const updatedUser = { ...user, wallet_address: mockWalletAddress };
      setUser(updatedUser);
      localStorage.setItem("mock_user", JSON.stringify(updatedUser));
      localStorage.setItem(
        "mock_wallet",
        JSON.stringify({
          type: walletType,
          address: mockWalletAddress,
        })
      );
      return;
    }

    const mockWalletAddress = `${
      walletType === "phantom" ? "5xJq" : "7mKp"
    }...${walletType === "phantom" ? "p7m" : "n9q"}`;

    const username = user.email?.split("@")[0] || `user_${user.id.slice(0, 8)}`;

    const { error } = await supabase.from("users").upsert({
      id: user.id,
      wallet_address: mockWalletAddress,
      username: username,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;

    setUser({ ...user, wallet_address: mockWalletAddress });
  };

  const disconnectWallet = async () => {
    if (!user) return;

    if (config.useMockData) {
      const updatedUser = { ...user, wallet_address: null };
      setUser(updatedUser);
      localStorage.setItem("mock_user", JSON.stringify(updatedUser));
      localStorage.removeItem("mock_wallet");
      return;
    }

    const { error } = await supabase
      .from("users")
      .update({ wallet_address: null, updated_at: new Date().toISOString() })
      .eq("id", user.id);

    if (error) throw error;

    setUser({ ...user, wallet_address: null });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isWalletConnected: !!publicKey?.toBase58(),
        loading,
        signInWithGoogle,
        signInWithTwitter,
        signUpWithEmail,
        signInWithEmail,
        signOut,
        resetPassword,
        connectWallet,
        disconnectWallet,
        verifyOtp,
        signInWithSolanaWallet,
        currentCreatorChapter,
        setCurrentCreatorChapter,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
