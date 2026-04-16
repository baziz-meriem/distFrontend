import React, { useState } from "react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import {
  login,
  isLoginSuccess,
  buildUserFromLoginResponse,
  persistAuthToken,
  getTokenFromLoginPayload,
} from "@/services/authService";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const DEMO_CREDENTIALS = {
  sadm: {
    label: "Super admin (SADM)",
    email: "admin@example.com",
    password: "demo123456",
  },
  consommateur: {
    label: "Customer",
    email: "demo@example.com",
    password: "demo123456",
  },
};

const ConnectForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSlug, setLoginSlug] = useState("sadm");
  const [submitting, setSubmitting] = useState(false);

  /**
   * Always pass email/password/slug explicitly so demo "sign in" works
   * in the same tick (React state from setState would still be stale).
   */
  const performLogin = async (emailVal, passwordVal, slug) => {
    const trimmed = String(emailVal ?? "").trim();
    if (!trimmed || !passwordVal) {
      toast.error("Please enter email and password");
      return;
    }

    setSubmitting(true);
    try {
      const response = await login(trimmed, passwordVal, slug);
      const { data } = response;

      if (!isLoginSuccess(data)) {
        toast.error(data?.message || "Login failed");
        return;
      }

      const user = buildUserFromLoginResponse(data, slug);
      const token = getTokenFromLoginPayload(data) || user.token;

      if (!token) {
        toast.error("Login succeeded but no token was returned. Check API response.");
        return;
      }

      const session = { ...user, token };
      persistAuthToken(token);
      Cookies.set("user", JSON.stringify(session), { expires: 7, path: "/" });
      toast.success("Logged in");
      // Full navigation guarantees the `user` cookie is visible to middleware.
      // Tiny delay lets the toast paint; `await router.push` also felt slow (waits on /dashboard).
      if (typeof window !== "undefined") {
        window.setTimeout(() => {
          window.location.assign("/dashboard");
        }, 120);
        return;
      }
      void router.replace("/dashboard");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        error.message ||
        "Login failed";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await performLogin(email, password, loginSlug);
  };

  /** Fill fields and sign in immediately (avoids stale state bug). */
  const signInWithDemo = async (slug) => {
    const d = DEMO_CREDENTIALS[slug];
    setLoginSlug(slug);
    setEmail(d.email);
    setPassword(d.password);
    await performLogin(d.email, d.password, slug);
  };

  return (
    <div className="relative mx-auto w-full max-w-md px-3 pt-60 md:max-w-lg">
      <ToastContainer />
      <div className="googleLogin rounded-md">
        <div className="GoogleLogBtn flex cursor-pointer rounded-md bg-effect bg-creem-green px-3 py-3 text-dark-green hover:bg-dark-green/10">
          <div>Log in with Google</div>
          <div>
            <FontAwesomeIcon icon={faGoogle} width="23" />
          </div>
        </div>
      </div>

      <div className="formSection mt-5 rounded-md border border-gray-300 bg-white py-6 px-5 shadow-md">
        <Image
          src="/logos/greenDevlift.png"
          width={120}
          height={100}
          alt="exaview logo"
          className="mx-auto block"
        />
        <p className="my-7 text-center text-lg font-medium text-dark-green">
          Log in to your account
        </p>

        <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4 text-left text-sm text-gray-800">
          <p className="mb-3 font-semibold text-dark-green">Demo accounts</p>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-dark-green">
                {DEMO_CREDENTIALS.sadm.label}
              </p>
              <p className="mt-1 text-gray-700">
                Email:{" "}
                <code className="rounded bg-white px-1.5 py-0.5 text-gray-900 shadow-sm">
                  {DEMO_CREDENTIALS.sadm.email}
                </code>
              </p>
              <p className="mt-1 text-gray-700">
                Password:{" "}
                <code className="rounded bg-white px-1.5 py-0.5 text-gray-900 shadow-sm">
                  {DEMO_CREDENTIALS.sadm.password}
                </code>
              </p>
              <button
                type="button"
                disabled={submitting}
                onClick={() => signInWithDemo("sadm")}
                className="mt-3 w-full rounded-md bg-dark-green px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95 disabled:opacity-50"
              >
                {submitting ? "Signing in…" : "Sign in as super admin"}
              </button>
            </div>
            <hr className="border-gray-200" />
            <div>
              <p className="font-medium text-dark-green">
                {DEMO_CREDENTIALS.consommateur.label}
              </p>
              <p className="mt-1 text-gray-700">
                Email:{" "}
                <code className="rounded bg-white px-1.5 py-0.5 text-gray-900 shadow-sm">
                  {DEMO_CREDENTIALS.consommateur.email}
                </code>
              </p>
              <p className="mt-1 text-gray-700">
                Password:{" "}
                <code className="rounded bg-white px-1.5 py-0.5 text-gray-900 shadow-sm">
                  {DEMO_CREDENTIALS.consommateur.password}
                </code>
              </p>
              <button
                type="button"
                disabled={submitting}
                onClick={() => signInWithDemo("consommateur")}
                className="mt-3 w-full rounded-md border-2 border-dark-green bg-white px-3 py-2.5 text-sm font-semibold text-dark-green hover:bg-gray-50 disabled:opacity-50"
              >
                {submitting ? "Signing in…" : "Sign in as customer"}
              </button>
            </div>
          </div>
        </div>

        <div className="mb-3 flex rounded-lg border border-gray-300 bg-gray-100 p-1 text-xs">
          <button
            type="button"
            className={`flex-1 rounded-md py-2.5 font-semibold transition ${
              loginSlug === "sadm"
                ? "bg-dark-green text-white shadow-sm"
                : "bg-transparent text-gray-600 hover:bg-white/80"
            }`}
            onClick={() => setLoginSlug("sadm")}
          >
            Super admin
          </button>
          <button
            type="button"
            className={`flex-1 rounded-md py-2.5 font-semibold transition ${
              loginSlug === "consommateur"
                ? "bg-dark-green text-white shadow-sm"
                : "bg-transparent text-gray-600 hover:bg-white/80"
            }`}
            onClick={() => setLoginSlug("consommateur")}
          >
            Customer
          </button>
        </div>
        <p className="mb-4 text-center text-[11px] text-gray-500">
          Choose account type for manual login below, or use the demo buttons
          above to sign in in one step.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="my-4 flex justify-between border-b border-gray-400 py-1">
            <input
              className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              width="20"
              className="text-gray-500"
            />
          </div>
          <div className="my-4 flex justify-between border-b border-gray-400 py-1">
            <input
              className="w-full bg-transparent text-gray-900 outline-none placeholder:text-gray-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
            />
            <FontAwesomeIcon icon={faLock} width="20" className="text-gray-500" />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-left">
              <Link
                href="/forgetPassword"
                className="font-medium text-dark-green underline decoration-light-green hover:text-light-green"
              >
                Forgot password?
              </Link>
            </div>
            <div className="text-xs text-right text-gray-600">
              Need access?{" "}
              <Link
                href="/contact"
                className="font-medium text-dark-green underline hover:text-light-green"
              >
                Contact us
              </Link>
            </div>
          </div>
          <div className="py-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn-green w-full py-3 font-semibold disabled:opacity-60"
            >
              {submitting ? "Signing in…" : "Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConnectForm;
