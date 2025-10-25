import React, { useState } from "react";
import BlogCard from "./BlogCard";

const BlogContainer = ({ blogs, blogsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* Blog Grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {currentBlogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-10">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 border rounded-md ${
              currentPage === page
                ? "bg-yellow-500 text-white border-yellow-500"
                : "bg-white hover:bg-yellow-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogContainer;