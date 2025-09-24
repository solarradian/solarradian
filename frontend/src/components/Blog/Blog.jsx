import React from 'react';
import { useParams } from 'react-router-dom';
import BlogNavigation from './BlogNavigation';
import BlogContent from './BlogContent';

const Blog = ({ blogs }) => {
  const { slug } = useParams();
  const activeBlog = slug 
    ? blogs.find(blog => blog.slug === slug) 
    : blogs[0]; // Default to first blog if no slug

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <BlogNavigation blogs={blogs} activeBlog={activeBlog} />
        <BlogContent blogs={blogs} activeBlog={activeBlog} />
      </div>
    </div>
  );
};

export default Blog;