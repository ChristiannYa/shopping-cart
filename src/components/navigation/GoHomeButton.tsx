"use client";

import { useRouter } from "next/navigation";

const GoHomeButton = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <button
      onClick={handleGoHome}
      className="bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors shadow-md hover:cursor-pointer w-fit py-1 px-2 flex items-center justify-center"
    >
      Go Home
    </button>
  );
};

export default GoHomeButton;
