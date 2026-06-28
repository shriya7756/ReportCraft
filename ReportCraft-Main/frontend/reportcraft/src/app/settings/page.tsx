"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Save,
  CheckCircle2,
  Moon,
  Sun,
  Monitor,
  BellRing,
  BellOff,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Security", icon: Shield },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    reportComplete: true,
    researchTips: false,
    newsletter: true,
  });

  const [privacy, setPrivacy] = useState({
    publicProfile: false,
    shareAnalytics: true,
    autoSave: true,
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[var(--foreground)]">
              Settings
            </h1>
            <p className="text-[var(--foreground-secondary)]">
              Manage your account preferences and application settings
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      activeTab === tab.id
                        ? "bg-[var(--primary-50)] text-[var(--primary-700)]"
                        : "text-[var(--foreground-secondary)] hover:bg-[var(--neutral-100)] dark:hover:bg-[var(--neutral-800)] hover:text-[var(--foreground)]"
                    )}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <div className="flex-1">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-[var(--neutral-800)] rounded-2xl border border-[var(--border)] shadow-sm overflow-hidden"
              >
                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">
                      Profile Information
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) =>
                            setProfile({ ...profile, name: e.target.value })
                          }
                          placeholder="Enter your name"
                          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--neutral-400)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                          }
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--neutral-400)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                          Bio
                        </label>
                        <textarea
                          value={profile.bio}
                          onChange={(e) =>
                            setProfile({ ...profile, bio: e.target.value })
                          }
                          placeholder="Tell us about yourself"
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--neutral-400)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:border-transparent transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Appearance Tab */}
                {activeTab === "appearance" && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">
                      Appearance
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-[var(--foreground)] mb-4">
                          Theme
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { id: "light", label: "Light", icon: Sun },
                            { id: "dark", label: "Dark", icon: Moon },
                            { id: "system", label: "System", icon: Monitor },
                          ].map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setTheme(option.id)}
                              className={cn(
                                "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                                theme === option.id
                                  ? "border-[var(--primary-500)] bg-[var(--primary-50)]"
                                  : "border-[var(--border)] hover:border-[var(--primary-300)]"
                              )}
                            >
                              <option.icon
                                className={cn(
                                  "w-6 h-6",
                                  theme === option.id
                                    ? "text-[var(--primary-600)]"
                                    : "text-[var(--foreground-secondary)]"
                                )}
                              />
                              <span
                                className={cn(
                                  "text-sm font-medium",
                                  theme === option.id
                                    ? "text-[var(--primary-700)]"
                                    : "text-[var(--foreground-secondary)]"
                                )}
                              >
                                {option.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">
                      Notification Preferences
                    </h2>

                    <div className="space-y-4">
                      {[
                        {
                          id: "emailUpdates",
                          label: "Product Updates",
                          description: "Receive updates about new features and improvements",
                        },
                        {
                          id: "reportComplete",
                          label: "Report Completion",
                          description: "Get notified when your research reports are ready",
                        },
                        {
                          id: "researchTips",
                          label: "Research Tips",
                          description: "Weekly tips to improve your research workflow",
                        },
                        {
                          id: "newsletter",
                          label: "Newsletter",
                          description: "Monthly newsletter with AI research insights",
                        },
                      ].map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-[var(--background-secondary)]"
                        >
                          <div>
                            <h3 className="font-medium text-[var(--foreground)]">
                              {item.label}
                            </h3>
                            <p className="text-sm text-[var(--foreground-secondary)]">
                              {item.description}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              setNotifications({
                                ...notifications,
                                [item.id]: !notifications[item.id as keyof typeof notifications],
                              })
                            }
                            className={cn(
                              "relative w-12 h-6 rounded-full transition-colors",
                              notifications[item.id as keyof typeof notifications]
                                ? "bg-[var(--primary-500)]"
                                : "bg-[var(--neutral-300)]"
                            )}
                          >
                            <span
                              className={cn(
                                "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                                notifications[item.id as keyof typeof notifications]
                                  ? "translate-x-6"
                                  : ""
                              )}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Privacy Tab */}
                {activeTab === "privacy" && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">
                      Privacy & Security
                    </h2>

                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-[var(--background-secondary)]">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-[var(--foreground)]">
                            Public Profile
                          </h3>
                          <button
                            onClick={() =>
                              setPrivacy({ ...privacy, publicProfile: !privacy.publicProfile })
                            }
                            className={cn(
                              "relative w-12 h-6 rounded-full transition-colors",
                              privacy.publicProfile
                                ? "bg-[var(--primary-500)]"
                                : "bg-[var(--neutral-300)]"
                            )}
                          >
                            <span
                              className={cn(
                                "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                                privacy.publicProfile ? "translate-x-6" : ""
                              )}
                            />
                          </button>
                        </div>
                        <p className="text-sm text-[var(--foreground-secondary)]">
                          Allow others to see your profile and research activity
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[var(--background-secondary)]">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-[var(--foreground)]">
                            Share Analytics
                          </h3>
                          <button
                            onClick={() =>
                              setPrivacy({ ...privacy, shareAnalytics: !privacy.shareAnalytics })
                            }
                            className={cn(
                              "relative w-12 h-6 rounded-full transition-colors",
                              privacy.shareAnalytics
                                ? "bg-[var(--primary-500)]"
                                : "bg-[var(--neutral-300)]"
                            )}
                          >
                            <span
                              className={cn(
                                "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                                privacy.shareAnalytics ? "translate-x-6" : ""
                              )}
                            />
                          </button>
                        </div>
                        <p className="text-sm text-[var(--foreground-secondary)]">
                          Help us improve by sharing anonymous usage data
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[var(--background-secondary)]">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-[var(--foreground)]">
                            Auto-Save Reports
                          </h3>
                          <button
                            onClick={() =>
                              setPrivacy({ ...privacy, autoSave: !privacy.autoSave })
                            }
                            className={cn(
                              "relative w-12 h-6 rounded-full transition-colors",
                              privacy.autoSave
                                ? "bg-[var(--primary-500)]"
                                : "bg-[var(--neutral-300)]"
                            )}
                          >
                            <span
                              className={cn(
                                "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                                privacy.autoSave ? "translate-x-6" : ""
                              )}
                            />
                          </button>
                        </div>
                        <p className="text-sm text-[var(--foreground-secondary)]">
                          Automatically save generated reports to your library
                        </p>
                      </div>

                      <div className="pt-6 border-t border-[var(--border)]">
                        <h3 className="font-medium text-[var(--foreground)] mb-4">
                          Danger Zone
                        </h3>
                        <button className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors text-sm font-medium">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="p-6 border-t border-[var(--border)] bg-[var(--background-secondary)] flex items-center justify-between">
                  <p className="text-sm text-[var(--foreground-secondary)]">
                    Changes are saved automatically
                  </p>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient text-white font-medium hover:shadow-lg transition-all disabled:opacity-70"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
