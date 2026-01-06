// context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 최초 세션 가져오기
    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);

      if (sessionUser) {
        ensureProfile(sessionUser);
      }

      setLoading(false);
    });

    // 🔹 로그인 / 로그아웃 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);

      if (sessionUser) {
        ensureProfile(sessionUser);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

/* =========================
   🔑 핵심 함수
========================= */
async function ensureProfile(user) {
  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    username:
      user.user_metadata?.user_name ||
      user.user_metadata?.name ||
      "익명",
    avatar_url:
      user.user_metadata?.avatar_url ||
      user.user_metadata?.picture ||
      null,
  });

  if (error) {
    console.error("profiles upsert error:", error);
  }
}