"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-t-4 border-[#F7931E] border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans">
      <header className="bg-white shadow p-6 flex justify-between items-center">
        <h1 className="text-3xl font-medium text-[#1d1d1f]">Dashboard</h1>
        <div className="flex items-center">
          <span className="mr-4 text-gray-700">{user?.email}</span>
          <button
            onClick={handleSignOut}
            className="bg-[#f7882a] text-white py-2 px-4 rounded-xl hover:bg-[#e07e0e]"
          >
            Sign Out
          </button>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-medium text-[#1d1d1f] mb-4">Welcome to Your Dashboard</h2>
          <p className="text-[#86868b] text-lg font-light">Securely manage and access your documents here.</p>
        </div>
      </main>
    </div>
  );
}
