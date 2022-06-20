import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getUsers } from "../../services/api";
import Table from "./Table";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await getUsers();
        toast.success("users fetched");
        setUsers(data?.data);
      } catch (err) {
        console.log("some error ", err);
        toast.error(err?.response?.data?.msg);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    console.log(filter, "filter is this");
  }, [filter]);

  useEffect(() => {
    if (!users?.length) return;
    setVerifiedUsers(users.filter((i) => i.verified === true));
    setAdmins(users.filter((i) => i.role >= 2));
  }, [users]);

  return (
    <>
      <div id="users" className="p-4">
        <div className="flex items-center justify-between mb-4">
          <section>
            <select
              className="w-full max-w-xs select select-bordered"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="0">Users</option>
              <option value="1">Verfied</option>
              <option value="2">Admins</option>
            </select>
          </section>
          <section className="flex p-4 text-sm font-bold border rounded-lg gap-x-4 border-accent border-opacity-20 bg-base-300">
            <p>Users : {users?.length}</p>
            <p>Verfied: {verifiedUsers?.length}</p>
            <p>Admins: {admins?.length}</p>
          </section>
        </div>
        <Table
          data={filter == 0 ? users : filter == 1 ? verifiedUsers : admins}
          loading={loading}
        />
      </div>
    </>
  );
};

export default Users;
