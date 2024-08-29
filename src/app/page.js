"use client";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome</h2>
        <p className="text-gray-700 mb-4">
          Click the button below to go to the login page.
        </p>
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 transition duration-200"
        >
          Go to Login Page
        </button>
      </div>
    </div>
  );
};

export default HomePage;
