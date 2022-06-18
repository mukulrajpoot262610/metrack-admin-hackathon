import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../services/api'
import { setAuth } from '../../redux/authSlice'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const Sidebar = () => {

    const router = useRouter()
    const dispatch = useDispatch()

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
        <div className='fixed z-50 h-full w-2/12 bg-black flex justify-start items-center flex-col'>
            <div className="mt-12">
                <Image src='/logo.svg' height={100} width={100} alt="" objectFit="contain" />
                <h1 className="font-bold text-white">MentorMap</h1>
            </div>

            <ul className="menu w-full mt-8 p-3 text-white rounded-box bg-black">
                <li className="menu-title">
                    <span className='!text-gray-500'>Menu</span>
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
                    <Link href="/customers" passHref>
                        <a className='flex justify-between'>
                            Users
                            <i className="fa-solid fa-boxes-stacked"></i>
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
        </div>
    )
}

export default Sidebar