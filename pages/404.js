import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            404 - Page Not Found
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="text-base font-medium text-indigo-600 hover:text-indigo-500"
            >
              Go back home<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
        <img
          className="mx-auto"
          src="/images/404.png"
          alt="Page Not Found"
        />
      </div>
    </div>
  );
};

export default Custom404;
