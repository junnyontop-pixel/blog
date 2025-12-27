import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditPost from "./pages/EditPost";
import { PostsProvider } from "./context/PostsContext";

function App() {
  return (
    <PostsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </PostsProvider>
  );
}

export default App;