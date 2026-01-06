import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <img
          src="favicon.png"
          alt="404 Not Found"
          className="mx-auto mb-8 w-64 h-64"
        />
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <Link
          to="/"
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
