import Head from "next/head";
import React, { useEffect, useState } from "react";
// import Stats from '../../components/Dashboard/Stats'
import Header from "../../components/Header";
// import { GetStats } from '../../services/api'

const Account = () => {
  const [stats, setStats] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const { data } = await GetStats()
        // setStats(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="relative p-4 text-gray-600 body-font lg:p-10">
      <Head>
        <title>Dashboard - MentorMap</title>
      </Head>
      <div className="w-full h-full">
        <Header />
        {/* {
                    stats && <Stats stats={stats} />
                } */}
      </div>
    </section>
  );
};

export default Account;
