import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
// import { logout } from '../../services/api'

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const { isAuth, user } = useSelector((state) => state.auth);

  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
      toast.success("Logout Successfull");
      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="fixed top-0 right-0 z-50 flex items-center justify-end w-full h-16 pr-10 border-b border-b-black bg-base-200">
      <div className="relative flex items-center">
        {isAuth ? (
          <h1
            className="font-bold text-white cursor-pointer"
            onClick={handleMenu}
          >
            Welcome, {user?.name}{" "}
            <i className="ml-2 fa-solid fa-caret-down"></i>
          </h1>
        ) : null}

        {menu && (
          <ul className="absolute right-0 w-64 p-3 border shadow-md top-10 menu bg-base-300 rounded-box">
            <li className="menu-title">
              <span>Menu</span>
            </li>
            <li>
              <Link href="/account" passHref>
                <a className="flex justify-between">
                  Home
                  <i className="fa-solid fa-house"></i>
                </a>
              </Link>
            </li>

            <li>
              <Link href="/course" passHref>
                <a className="flex justify-between">
                  Courses
                  <i className="fa-solid fa-boxes-stacked"></i>
                </a>
              </Link>
            </li>
            <li>
              <a className="flex justify-between" onClick={handleLogout}>
                Logout
                <i className="fa-solid fa-power-off"></i>
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
