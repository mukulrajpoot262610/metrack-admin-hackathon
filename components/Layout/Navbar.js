import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { logout } from '../../services/api'

const Navbar = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const [menu, setMenu] = useState(false)
    const { isAuth, user } = useSelector(state => state.auth)

    const handleMenu = () => {
        setMenu(!menu)
    }

    const handleLogout = async () => {
        try {
            const { data } = await logout()
            dispatch(setAuth(data))
            toast.success('Logout Successfull')
            router.replace('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <nav className='w-full fixed z-50 top-0 right-0 pr-10 h-16 bg-black flex justify-end items-center border-b-2'>
            <div className='flex items-center relative'>
                {
                    isAuth ? <h1 className="font-bold cursor-pointer text-white" onClick={handleMenu}>Welcome, {user?.name} <i className="fa-solid fa-caret-down ml-2"></i></h1> : null
                }

                {
                    menu && <ul className="absolute top-10 right-0 menu w-64 p-3 border bg-base-100 rounded-box shadow-md">
                        <li className="menu-title">
                            <span>Menu</span>
                        </li>
                        <li>
                            <Link href="/account" passHref>
                                <a className='flex justify-between'>
                                    Home
                                    <i className="fa-solid fa-house"></i>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/orders" passHref>
                                <a className='flex justify-between'>
                                    Orders
                                    <i className="fa-solid fa-clipboard"></i>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/course" passHref>
                                <a className='flex justify-between'>
                                    Courses
                                    <i className="fa-solid fa-boxes-stacked"></i>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <a className='flex justify-between' onClick={handleLogout}>
                                Logout
                                <i className="fa-solid fa-power-off"></i>
                            </a>
                        </li>
                    </ul>
                }
            </div>
        </nav>
    )
}

export default Navbar