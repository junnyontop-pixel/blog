import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditPost from "./pages/EditPost";
import PostView from "./pages/PostView"; // ✅ 추가
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  // useEffect(() => {
  //   const { data: listener } = supabase.auth.onAuthStateChange(
  //     (event, session) => {
  //       if (session) {
  //         console.log("로그인 성공", session.user);
  //       }
  //     }
  //   );

  //   return () => listener.subscription.unsubscribe();
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/post/:id" element={<PostView />} />
      <Route path="/edit/:id" element={<EditPost />} />
    </Routes>
  );
}

export default App;