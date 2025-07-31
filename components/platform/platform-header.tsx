"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/lib/auth-context";
import { LogOut, User } from "lucide-react";

export function PlatformHeader() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
            <span className="text-sm font-bold text-white">IL</span>
          </div>
          <span className="text-xl font-bold">InternLink</span>
        </Link>

        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-2 text-sm">
              <User className="w-4 h-4" />
              <span className="hidden md:inline">{user.name}</span>
              <span className="text-muted-foreground">({user.userType})</span>
            </div>
          )}
          <ThemeToggle />
          {user ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
