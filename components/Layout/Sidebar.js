import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
// import { logout } from '../../services/api'
import { setAuth } from "../../redux/authSlice";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { logout } from "../../services/api";

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const path = router.pathname

  const handleLogout = async () => {
    try {
      const { data } = await logout();
      console.log(data)
      dispatch(setAuth({ data: null }));
      toast.success("Logout Successfull");
      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="fixed z-50 flex flex-col items-center justify-start w-2/12 h-full bg-base-300">
      <div className="mt-12">
        <Image
          src="/logo.svg"
          height={100}
          width={100}
          alt=""
          objectFit="contain"
        />
        <h1 className="font-bold text-white">ME-Track</h1>
      </div>

      <ul className="w-full p-3 mt-8 text-base-content menu rounded-box">
        <li className="menu-title">
          <span className="">Menu</span>
        </li>
        <li>
          <Link href="/account" passHref>
            <a className={`flex justify-between ${path === '/account' ? "font-bold bg-[#212121] border border-gray-700" : ""}`}>
              Home
              <i className="fa-solid fa-house"></i>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/users" passHref>
            <a className={`flex justify-between ${path.includes('/users') ? "font-bold bg-[#212121] border border-gray-700" : ""}`}>
              Users
              <i className="fa-solid fa-boxes-stacked"></i>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/courses" passHref>
            <a className={`flex justify-between ${path.includes('/courses') ? "font-bold bg-[#212121] border border-gray-700" : ""}`}>
              Courses
              <i className="fa-solid fa-boxes-stacked"></i>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/channels" passHref>
            <a className={`flex justify-between ${path.includes('/channels') ? "font-bold bg-[#212121] border border-gray-700" : ""}`}>
              Channels
              <i className="fa-solid fa-boxes-stacked"></i>
            </a>
          </Link>
        </li>
        <li>
          <a className={`flex justify-between ${path === '/logout' ? "font-bold bg-[#212121] border border-gray-700" : ""}`} onClick={handleLogout}>
            Logout
            <i className="fa-solid fa-power-off"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
