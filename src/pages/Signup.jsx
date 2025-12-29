import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const navigate = useNavigate();

  return (
    <div className="auth_page">
      <div className="auth_card">
        <h1 className="auth_title">Sign up</h1>

        <button className="auth_btn github">
          Sign up with GitHub
        </button>

        <p className="auth_footer">
          이미 계정이 있나요?{" "}
          <span onClick={() => navigate("/login")}>로그인</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;