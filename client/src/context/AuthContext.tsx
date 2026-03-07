import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface User {
  username: string;
  name: string;
  balance: number;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<string | null>;
  logout: () => void;
  refreshBalance: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("greenbite-user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (username: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const data = await res.json();
      return data.error || "Login failed";
    }
    const userData = await res.json();
    setUser(userData);
    localStorage.setItem("greenbite-user", JSON.stringify(userData));
    return null;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("greenbite-user");
  }, []);

  const refreshBalance = useCallback(async () => {
    if (!user) return;
    const res = await fetch(`/api/auth/balance/${user.username}`);
    if (res.ok) {
      const data = await res.json();
      setUser((prev) => (prev ? { ...prev, balance: data.balance } : null));
      const saved = localStorage.getItem("greenbite-user");
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.balance = data.balance;
        localStorage.setItem("greenbite-user", JSON.stringify(parsed));
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshBalance }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
