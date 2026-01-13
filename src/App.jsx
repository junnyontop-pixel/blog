import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditPost from "./pages/EditPost"; //✅ 추가
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostView from "./pages/PostView";
import MyPage from "./pages/Mypage";  //✅ 추가

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
      {/* 통합 페이지 */}
      <Route path="/mypage" element={<MyPage/>} />
      <Route path="/user/:userId" element={<MyPage />} />
    </Routes>
  );
}

export default App;