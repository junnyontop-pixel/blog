import '../App.css';
import { useState } from "react";
import { usePosts } from "../context/PostsContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { posts } = usePosts();
  const navigate = useNavigate();

  const getExcerpt = (text, limit = 80) => {
    const singleLine = text.replace(/\n/g, " ");
    return singleLine.length > limit
      ? singleLine.slice(0, limit) + "…"
      : singleLine;
  };

  return (
    <>
      <div className="header_container">
        <header id='header'>
          <div id="bar_container">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
          </div>
          <div id="title_container">
            <h2 id='title'>Blog</h2>
          </div>
          <div id="login_container">
            <button id="login_btn">login</button>
          </div>
          <div id="signup_container">
            <button id="signup_btn">sign up</button>
          </div>
          {/* 나중에 검색기능 추가 */}

          {/* 여기에 */}

        </header>
      </div>

      <div id="content_container">
        {posts.map((post) => (
          <div className="contents" key={post.id} onClick={() => navigate(`/post/${post.id}`)}>
            <h4 className="title">{post.title}</h4>
            <p className="main_content">{getExcerpt(post.content, 80)}</p>

            {/* 좋아요 아이콘 */}
            <svg onClick={(e) => {e.stopPropagation(); console.log("좋아요!");}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/></svg>

            {/* 최고에요 아이콘 */}
            <svg onClick={(e) => {e.stopPropagation();console.log("좋아요!");}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m713-280 127-297v-23H588l19-134-55 55q-8-8-28-28.5T496-736l144-144 32 32q14 14 19.5 31.5T694-780l-14 100h160q33 0 56.5 23.5T920-600v23q0 8-1.5 16t-4.5 16l-93 216q-10 22-30 35.5T747-280h-34ZM240-120H40v-400h200v80H120v240h120v80Zm267 0H160v-360l240-240 32 32q14 14 19.5 31.5T454-620l-14 100h160q33 0 56.5 23.5T680-440v24q0 8-1.5 15.5T674-385l-93 217q-10 22-30 35t-44 13Zm0-80 93-216v-24H348l19-134-127 127v247h267Zm-267 0v-247 247Z"/></svg>

            {/* edit 아이콘 */}
            <svg onClick={(e) => {e.stopPropagation(); navigate(`/edit/${post.id}`);}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;