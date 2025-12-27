import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditPost from "./pages/EditPost";
import PostView from "./pages/PostView"; // ✅ 추가
import { PostsProvider } from "./context/PostsContext";

function App() {
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