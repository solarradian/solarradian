// hooks/useBlogNavigation.js
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * Custom hook for blog navigation functionality
 * @param {Array} blogs - Array of blog objects
 * @returns {Object} Navigation state and functions
 */
const useBlogNavigation = (blogs) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Find initial active blog based on URL slug or default to first blog
  const findInitialBlog = useCallback(() => {
    if (slug) {
      return blogs.find(blog => blog.slug === slug) || blogs[0];
    }
    return blogs[0];
  }, [slug, blogs]);

  const [activeBlog, setActiveBlog] = useState(findInitialBlog);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update state when URL or blogs change
  useEffect(() => {
    const newActiveBlog = findInitialBlog();
    setActiveBlog(newActiveBlog);
    setCurrentIndex(blogs.findIndex(blog => blog.id === newActiveBlog.id));
  }, [slug, blogs, findInitialBlog]);

  // Get previous blog if exists
  const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;

  // Get next blog if exists
  const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  /**
   * Navigate to a specific blog
   * @param {Object} blog - Blog object to navigate to
   */
  const goToBlog = useCallback((blog) => {
    if (blog && blog.slug) {
      navigate(`/blog/${blog.slug}`);
      // Scroll to top for better UX
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [navigate]);

  /**
   * Navigate to the previous blog
   */
  const goToPrevBlog = useCallback(() => {
    if (prevBlog) {
      goToBlog(prevBlog);
    }
  }, [prevBlog, goToBlog]);

  /**
   * Navigate to the next blog
   */
  const goToNextBlog = useCallback(() => {
    if (nextBlog) {
      goToBlog(nextBlog);
    }
  }, [nextBlog, goToBlog]);

  /**
   * Navigate to a blog by its ID
   * @param {number} id - ID of the blog to navigate to
   */
  const goToBlogById = useCallback((id) => {
    const blog = blogs.find(b => b.id === id);
    if (blog) {
      goToBlog(blog);
    }
  }, [blogs, goToBlog]);

  /**
   * Navigate to a blog by its index
   * @param {number} index - Index of the blog to navigate to
   */
  const goToBlogByIndex = useCallback((index) => {
    if (index >= 0 && index < blogs.length) {
      goToBlog(blogs[index]);
    }
  }, [blogs, goToBlog]);

  /**
   * Get blog by ID
   * @param {number} id - ID of the blog to find
   * @returns {Object|null} Found blog or null
   */
  const getBlogById = useCallback((id) => {
    return blogs.find(blog => blog.id === id) || null;
  }, [blogs]);

  /**
   * Get blog by slug
   * @param {string} slug - Slug of the blog to find
   * @returns {Object|null} Found blog or null
   */
  const getBlogBySlug = useCallback((slug) => {
    return blogs.find(blog => blog.slug === slug) || null;
  }, [blogs]);

  return {
    activeBlog,
    currentIndex,
    prevBlog,
    nextBlog,
    totalBlogs: blogs.length,
    goToBlog,
    goToPrevBlog,
    goToNextBlog,
    goToBlogById,
    goToBlogByIndex,
    getBlogById,
    getBlogBySlug
  };
};

export default useBlogNavigation;