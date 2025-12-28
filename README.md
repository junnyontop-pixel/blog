# 📝 Blog with Supabase

React + Supabase로 만든 간단한 블로그 서비스입니다.  
글 작성, 수정, 삭제가 가능하며 Supabase를 백엔드로 사용해  
새로고침 후에도 데이터가 유지됩니다.

---

## ✨ Features

- 📄 게시글 목록 조회
- ➕ 게시글 작성
- ✏️ 게시글 수정
- 🗑 게시글 삭제
- 🔄 새로고침 후에도 데이터 유지 (Supabase 연동)
- 📝 Markdown 지원 (코드 블럭 하이라이팅 포함)

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Context API
- React Markdown
- Highlight.js

### Backend
- Supabase (PostgreSQL)
- Supabase JS SDK

---

## 📂 Project Structure

```text
src/
 ├─ pages/
 │   ├─ Home.jsx
 │   ├─ EditPost.jsx
 │   └─ PostView.jsx
 ├─ context/
 │   └─ PostsContext.jsx
 ├─ utils/
 │   └─ stripMarkdown.js
 ├─ lib/
 │   └─ supabase.js
 └─ App.jsx