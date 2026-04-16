import Image from "next/image";
import Link from "next/link";

/**
 * Public sign-up route: there is no self-service registration API in this app yet.
 * Users with existing credentials should use Log in; new accounts are created by admins.
 */
const SignUpForm = () => {
  return (
    <div className="relative xl:w-1/3 lg:w-1/3 px-3 md:w-1/2 mx-auto pt-60 ">
      <div className="mt-5 py-8 px-5 bg-effect rounded-md border formSection text-center">
        <Image
          src="/logos/greenDevlift.png"
          width={120}
          height={100}
          alt="exaview logo"
          className="block mx-auto"
        />
        <p className="text-lg text-center my-7 text-light-green font-medium">
          Create an account
        </p>
        <p className="text-sm text-grey mb-6 leading-relaxed">
          Self-service registration is not available here. New accounts are created by
          your organization administrator. If you already have credentials, sign in
          below.
        </p>
        <Link
          href="/login"
          className="btn-green inline-block w-full py-2.5 font-semibold rounded-md text-center"
        >
          Log in
        </Link>
        <p className="text-xs text-grey mt-6">
          <Link href="/" className="text-light-green underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
