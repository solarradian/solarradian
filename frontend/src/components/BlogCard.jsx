// BlogCard.jsx
import { Link } from "react-router-dom";

const BlogCard = ({ title, image, description, slug, alt }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <img src={image} alt={alt || title} className="w-full h-56 object-cover" />
      <div className="p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">{title}</h2>
          <p className="text-gray-600 leading-relaxed mb-5 line-clamp-3">{description}</p>
        </div>
        <Link
          to={`/blogs/${slug}`} // <-- dynamic link
          className="text-orange-600 font-semibold hover:underline mt-auto"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;