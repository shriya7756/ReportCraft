"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface User {
  id: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("rc_user");
    if (savedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    // Mock login logic
    if (email === "admin@ReportCraft.com" && pass === "admin123") {
      const adminUser: User = { id: "1", email, role: "admin" };
      setUser(adminUser);
      localStorage.setItem("rc_user", JSON.stringify(adminUser));
      toast.success("Welcome back, Admin!");
      router.push("/admin");
    } else if (email && pass) {
      const normalUser: User = { id: Math.random().toString(36).substr(2, 9), email, role: "user" };
      setUser(normalUser);
      localStorage.setItem("rc_user", JSON.stringify(normalUser));
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } else {
      toast.error("Invalid credentials.");
    }
    setIsLoading(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const signup = async (email: string, _pass: string) => {
    setIsLoading(true);
    // Mock signup logic
    const newUser: User = { id: Math.random().toString(36).substr(2, 9), email, role: "user" };
    setUser(newUser);
    localStorage.setItem("rc_user", JSON.stringify(newUser));
    toast.success("Account created! Let's get started.");
    router.push("/dashboard");
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rc_user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
