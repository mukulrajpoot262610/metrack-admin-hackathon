import React from "react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import Head from "next/head";
import Sidebar from "./Sidebar";
import Loader from "./Loader";
import { useLoadingWithRefresh } from "../../hooks/useLoadingWithRefresh";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  const router = useRouter();
  const { loading } = useLoadingWithRefresh();

  return loading ? (
    <Loader />
  ) : (
    <>
      {router.pathname !== "/" && <Navbar />}
      <Toaster />
      <main className="flex flex-col items-center justify-center w-full">
        <Head>
          <title>MentorMap Admin Panel</title>
        </Head>
        <div className="flex w-full">
          {router.pathname !== "/" &&
            router.pathname !== "/auth/forget-password" && (
              <div className="hidden w-2/12 lg:block">
                <Sidebar />
              </div>
            )}
          {router.pathname !== "/" &&
          router.pathname !== "/auth/forget-password" ? (
            <div className="w-full mt-16 lg:w-10/12">{children}</div>
          ) : (
            <div className="w-full pt-16">{children}</div>
          )}
        </div>
      </main>
    </>
  );
};

export default Layout;
