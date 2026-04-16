import Image from "next/image";
import Link from "next/link";

/**
 * Legacy route `/signup`: there is no self-service registration API.
 * Accounts are created by administrators; we explain that and point to contact + login.
 */
const SignUpForm = () => {
  return (
    <div className="relative mx-auto w-full max-w-md px-3 pt-60 md:max-w-lg">
      <div className="formSection mt-5 rounded-md border border-gray-300 bg-white py-8 px-5 text-center shadow-md">
        <Image
          src="/logos/greenDevlift.png"
          width={120}
          height={100}
          alt="exaview logo"
          className="mx-auto block"
        />
        <p className="my-7 text-center text-lg font-medium text-dark-green">
          No public sign-up
        </p>
        <p className="mb-6 text-left text-sm leading-relaxed text-gray-600">
          New users cannot create their own account here. Your organization’s admin
          provisions accounts. If you need access, reach out through our contact
          page.
        </p>
        <Link
          href="/contact"
          className="btn-green mb-3 inline-block w-full rounded-md py-2.5 text-center font-semibold"
        >
          Request access (contact)
        </Link>
        <Link
          href="/login"
          className="mb-3 inline-block w-full rounded-md border-2 border-dark-green py-2.5 text-center font-semibold text-dark-green hover:bg-gray-50"
        >
          I already have credentials — Log in
        </Link>
        <p className="text-xs text-gray-500">
          <Link href="/" className="text-light-green underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
