import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Blog from '../../components/Blog/Blog';
import { blogData } from '../../utils/blogData';
import * as BlogComponents from '../../blogFiles';

const BlogPage = () => {
  // Map component names to actual components
  const blogsWithComponents = blogData.map(blog => ({
    ...blog,
    component: BlogComponents[blog.component]
  }));

  return (
    <Routes>
      <Route path="/" element={<Blog blogs={blogsWithComponents} />} />
      <Route path=":slug" element={<Blog blogs={blogsWithComponents} />} />
    </Routes>
  );
};

export default BlogPage;