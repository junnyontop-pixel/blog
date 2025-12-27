import { createContext, useContext, useState } from "react";

const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([
    { id: 1, title: "파이썬 독학", content: "파이썬 어쩌구저쩌구...." },
    { id: 2, title: "js 독학", content: "js 어쩌구저쩌구...." },
    { id: 3, title: "자바 독학", content: "자바 어쩌구저쩌구...." },
  ]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostsContext);
}