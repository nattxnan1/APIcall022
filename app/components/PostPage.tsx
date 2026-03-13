"use client";

import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
}

const PostPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTitle("");
    setContent("");
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-10">

      {/* Create Post */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl border border-blue-200">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Create Post
        </h1>

        <input
          type="text"
          placeholder="Title"
          className="w-full border border-blue-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          className="w-full border border-blue-300 rounded-lg p-3 mb-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={createPost}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition shadow-md"
        >
          Create Post
        </button>
      </div>

      {/* Post List */}
      <div className="w-full max-w-2xl mt-10">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">
          Post List
        </h2>

        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-blue-200 rounded-xl p-5 mb-5 shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {post.title}
            </h3>
            <p className="text-gray-600">{post.content}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PostPage;