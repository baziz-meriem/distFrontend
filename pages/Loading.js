import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/router";

const LoadingPage = dynamic(() => import("@/pages/LoadingPage"));

const Loading = () => {
  const router = useRouter();

  useEffect(() => {
    // Simulate a delay before redirecting to the actual page
    const timer = setTimeout(() => {
      router.push("/");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return <LoadingPage />;
};

export default Loading;
