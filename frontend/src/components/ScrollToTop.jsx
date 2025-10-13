import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // gives current route

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top
  }, [pathname]); // run effect whenever route changes

  return null; // this component doesn't render anything
};

export default ScrollToTop;