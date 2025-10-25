import React from "react";
import BlogContainer from "../components/BlogContainer";
import  blogdata  from "../data/blogdata.js";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Solar Radian Blogs ☀️
      </h1>
      <BlogContainer blogs={blogdata }  blogsPerPage={6}/>
    </div>
  );
};

export default Blog;