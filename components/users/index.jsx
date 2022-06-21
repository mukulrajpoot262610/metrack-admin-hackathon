import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { deleteUser, getUsers } from "../../services/api";
import { ConfirmAction } from "../fragments/ConfirmAction";
import Table from "./Table";
import Link from "next/link";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [filter, setFilter] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [deletionId, setDeletionId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await getUsers();
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

  const handleDelete = (id) => {
    setIsOpen(true);
    setDeletionId(id);
  };

  const onDelete = async (id) => {
    try {
      console.log({ id });
      const res = await deleteUser(id);
      toast.success(res?.data?.msg);
      setDeletionId(null);
      setUsers((users) => users.filter((i) => i._id != deletionId));
    } catch (err) {
      setDeletionId(null);
      toast.error(err?.response?.data?.msg);
    }
  };

  useEffect(() => {
    if (!users?.length) return;
    setVerifiedUsers(users.filter((i) => i.verified === true));
    setAdmins(users.filter((i) => i.role >= 2));
  }, [users]);

  return (
    <>
      <div id="users" className="p-4">

        <div className="breadcrumbs mb-4 mx-2 uppercase font-bold text-xs">
          <ul>
            <Link href={'/account'}>
              <li><a>Home</a></li>
            </Link>
            <li>Users</li>
          </ul>
        </div>

        <hr className="my-4 mb-8 border-zinc-700" />
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
          handleDelete={handleDelete}
          data={filter == 0 ? users : filter == 1 ? verifiedUsers : admins}
          loading={loading}
        />
      </div>
      <ConfirmAction
        title="Confirm Deletion"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={() => onDelete(deletionId)}
      />
    </>
  );
};

export default Users;
