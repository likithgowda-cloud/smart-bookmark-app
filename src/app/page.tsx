"use client"

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Smart Bookmarks</h1>
        <p className="text-gray-600 mb-8">
          Organize your favorite links with real-time sync across all your devices
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-center text-left text-sm text-gray-700">
            <span className="text-xl mr-3"></span>
            <span>Quick access to your bookmarks</span>
          </div>
          <div className="flex items-center text-left text-sm text-gray-700">
            <span className="text-xl mr-3"></span>
            <span>Private - only you can see your bookmarks</span>
          </div>
          <div className="flex items-center text-left text-sm text-gray-700">
            <span className="text-xl mr-3"></span>
            <span>Real-time sync across devices</span>
          </div>
        </div>

        <LoginButton />
      </div>
    </div>
  );
}
