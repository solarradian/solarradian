// src/pages/BlogDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import  blogdata  from "../data/blogdata"; // your blog data array

const BlogDetail = () => {
  const { slug } = useParams(); // get slug from URL
  const blog = blogdata.find((b) => b.slug === slug);

  if (!blog) return <div className="p-8 text-center">Blog not found 😔</div>;

  return (
    <div className="min-h-screen bg-white p-8 md:p-20">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">{blog.title}</h1>
      <img src={blog.image} alt={blog.alt} className="w-full h-96 object-cover mb-6 rounded-lg" />
      <p className="text-gray-700 leading-relaxed">{blog.description}</p>
    </div>
  );
};

export default BlogDetail;
