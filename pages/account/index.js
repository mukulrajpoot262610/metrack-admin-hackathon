import Head from 'next/head'
import React, { useEffect, useState } from 'react'
// import Stats from '../../components/Dashboard/Stats'
import Header from '../../components/Haeder'
// import { GetStats } from '../../services/api'

const Account = () => {

    const [stats, setStats] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await GetStats()
                setStats(data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

    return (
        <section className="text-gray-600 body-font p-4 lg:p-10 relative">
            <Head>
                <title>Dashboard - MentorMap</title>
            </Head>
            <div className="w-full h-full mt-20">
                <Header />
                {/* {
                    stats && <Stats stats={stats} />
                } */}
            </div>
        </section>
    )
}

export default Account