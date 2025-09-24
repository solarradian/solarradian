import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogContent = ({ blogs, activeBlog }) => {
  const navigate = useNavigate();
  const currentIndex = blogs.findIndex(blog => blog.id === activeBlog.id);
  const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  return (
    <>
      <div className="blog-content bg-white rounded-xl shadow-md p-6 md:p-8">
        {activeBlog.component && React.createElement(activeBlog.component)}
      </div>

      {/* Next/Previous Navigation */}
      <div className="flex justify-between items-center mt-8">
        {prevBlog ? (
          <button
            onClick={() => navigate(`/blog/${prevBlog.slug}`)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            ⬅ {prevBlog.title}
          </button>
        ) : (
          <div></div>
        )}

        {nextBlog ? (
          <button
            onClick={() => navigate(`/blog/${nextBlog.slug}`)}
            className="px-4 py-2 bg-imp-text text-white rounded-md "
          >
            {nextBlog.title} ➡
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default BlogContent;