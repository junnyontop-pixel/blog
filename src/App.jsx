import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditPost from "./pages/EditPost";
import PostView from "./pages/PostView"; // ✅ 추가
import { PostsProvider } from "./context/PostsContext";
import { supabase } from "./lib/supabase";

function App() {
  supabase.from("posts").select("*").then(({ data, error }) => {
    console.log("supabase test:", { data, error });
  });

  return (
    <PostsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostView />} /> {/* ✅ 보기 */}
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </PostsProvider>
  );
}

export default App;