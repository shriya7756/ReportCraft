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
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("rc_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
    setIsLoading(true);
    // Simulate a short network delay so loading states are visible
    await new Promise((r) => setTimeout(r, 600));

    if (!email || !pass) {
      setIsLoading(false);
      throw new Error("Please enter your email and password.");
    }

    if (email === "admin@ReportCraft.com" && pass === "admin123") {
      const adminUser: User = { id: "1", email, role: "admin" };
      setUser(adminUser);
      localStorage.setItem("rc_user", JSON.stringify(adminUser));
      toast.success("Welcome back, Admin!");
      setIsLoading(false);
      router.push("/admin");
    } else if (email && pass) {
      // Mock: any non-empty email+pass combo works (demo mode)
      const normalUser: User = {
        id: Math.random().toString(36).substring(2, 11),
        email,
        role: "user",
      };
      setUser(normalUser);
      localStorage.setItem("rc_user", JSON.stringify(normalUser));
      toast.success("Signed in successfully!");
      setIsLoading(false);
      router.push("/dashboard");
    } else {
      setIsLoading(false);
      throw new Error("Wrong email or password. Try again.");
    }
  };

  const signup = async (email: string, pass: string): Promise<void> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    // Check for duplicate (demo: just check localStorage)
    const existingUser = localStorage.getItem("rc_user");
    if (existingUser) {
      try {
        const parsed = JSON.parse(existingUser);
        if (parsed.email === email) {
          setIsLoading(false);
          throw new Error("An account with that email already exists. Sign in instead.");
        }
      } catch (err) {
        if (err instanceof Error && err.message.includes("already exists")) {
          setIsLoading(false);
          throw err;
        }
      }
    }

    if (!email || !pass) {
      setIsLoading(false);
      throw new Error("Please fill in all fields.");
    }

    const newUser: User = {
      id: Math.random().toString(36).substring(2, 11),
      email,
      role: "user",
    };
    setUser(newUser);
    localStorage.setItem("rc_user", JSON.stringify(newUser));
    toast.success("Account created! Let's get started.");
    setIsLoading(false);
    router.push("/dashboard");
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
