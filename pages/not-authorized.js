import Link from "next/link";

const NotAuthorized = () => {
  return (
    <div className="h-4/5 mt-20 flex items-center justify-center ">
      <div className="max-w-md w-full space-y-8 max-h-screen">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Not Authorized
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Sorry, you are not authorized to access this page.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="text-base font-medium text-dark-green hover:text-light-green"
            >
              Go back home<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
          <h1 className="text-7xl mt-7 font-extrabold">403</h1>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;
