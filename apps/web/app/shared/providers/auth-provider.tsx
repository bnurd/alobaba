import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { UserAuth } from "~/shared/types/types";
import { useTRPC } from "~/shared/libs/trpc";

export interface AuthProviderContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserAuth | null;
  setUser: React.Dispatch<React.SetStateAction<UserAuth | null>>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthProviderContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => {
    // no-op default implementation
  },
  user: null,
  setUser: () => {
    // no-op default implementation
  },
  isLoading: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const trpc = useTRPC();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserAuth | null>(null);

  const profileQuery = useQuery({
    ...trpc.auth.profile.queryOptions(),
    retry: 1,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (profileQuery.data) {
      setIsAuthenticated(true);
      setUser({
        id: profileQuery.data.id,
        email: profileQuery.data.email,
        name: profileQuery.data.name ?? "",
      });
    }
    setIsLoading(false);
  }, [profileQuery.data]);

  if (profileQuery.isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <h2 className="animate-pulse text-center text-2xl font-semibold text-orange-500">
          Alobaba.com
        </h2>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
