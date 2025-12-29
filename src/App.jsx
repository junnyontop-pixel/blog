import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditPost from "./pages/EditPost";
import PostView from "./pages/PostView"; // ✅ 추가
import { PostsProvider } from "./context/PostsContext";
import { supabase } from "./lib/supabase";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect } from "react";

function App() {
  supabase.from("posts").select("*").then(({ data, error }) => {
    console.log("supabase test:", { data, error });
  });

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          console.log("로그인 성공", session.user);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <PostsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post/:id" element={<PostView />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </PostsProvider>
  );
}

export default App;