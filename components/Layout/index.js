import React from 'react'
import Navbar from './Navbar'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Sidebar from './Sidebar'
import Loader from './Loader'
import { useLoadingWithRefresh } from '../../hooks/useLoadingWithRefresh'

const Layout = ({ children }) => {

    const router = useRouter()
    const { loading } = useLoadingWithRefresh()

    return (
        loading ? <Loader /> :
            <>
                {
                    router.pathname !== '/' && <Navbar />
                }
                <main className='w-full flex justify-center items-center flex-col'>
                    <Head>
                        <title>MentorMap Admin Panel</title>
                    </Head>
                    <div className='flex w-full'>
                        {
                            router.pathname !== '/' && router.pathname !== '/auth/forget-password' && <div className='hidden lg:block w-2/12'>
                                <Sidebar />
                            </div>
                        }
                        {
                            router.pathname !== '/' && router.pathname !== '/auth/forget-password' ? <div className='w-full lg:w-10/12'>
                                {children}
                            </div> : <div className='w-full'>{children}</div>
                        }

                    </div>
                </main>
            </>
    )
}

export default Layout