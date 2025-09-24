import React from 'react';
import { Link } from 'react-router-dom';

const BlogNavigation = ({ blogs, activeBlog }) => {
  return (
    <div className="flex justify-center gap-4 mb-8">
      {blogs.map((blog) => (
        <Link
          key={blog.id}
          to={`/blog/${blog.slug}`}
          className={`px-4 py-2 rounded-md font-medium transition ${
            activeBlog.id === blog.id
              ? "bg-imp-text text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {blog.title}
        </Link>
      ))}
    </div>
  );
};

export default BlogNavigation;