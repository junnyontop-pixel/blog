import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { supabase } from "../lib/supabase";

function Login() {
  const navigate = useNavigate();

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  return (
    <div className="auth_page">
      <div className="auth_card">
        <h1 className="auth_title">Login</h1>

        <button className="auth_btn github" onClick={handleGithubLogin}>
          Continue with GitHub
        </button>

        <button className="auth_btn google" disabled>
          Google (준비중)
        </button>

        <button className="auth_btn kakao" disabled>
          Kakao (준비중)
        </button>

        <p className="auth_footer">
          아직 계정이 없나요?{" "}
          <span onClick={() => navigate("/signup")}>회원가입</span>
        </p>
      </div>
    </div>
  );
}

export default Login;