"use client";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

const Auth = () => {
  const { user, loading, logout } = useAuth();

  return (
    <>
      {loading ? (
        <div className="size-11 bg-gradient-to-r from-orange-50 to-rose-50 border border-slate-200/80 rounded-full animate-pulse"></div>
      ) : (
        <>
          {!user ? (
            <>
              <Link
                href="/signup"
                className="w-full py-3 block px-6 text-center rounded-full transition active:bg-yellow-400   focus:bg-yellow-400 sm:w-max"
              >
                <span className="block text-yellow-800 font-semibold text-sm">
                  Sign up
                </span>
              </Link>
              <Link
                href="/login"
                className="w-full block py-3 px-6 text-center rounded-full transition  hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
              >
                <span className="block text-yellow-900 font-semibold text-sm">
                  Login
                </span>
              </Link>
            </>
          ) : (
            <div className="capitalize text-yellow-900 font-semibold text-sm flex items-center gap-2 ">
              <p>{user.name}</p>
              <button
                onClick={logout}
                className="w-full block py-3 px-6 text-center rounded-full transition  hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
              >
                <span className="block ">Logout</span>
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default Auth;
