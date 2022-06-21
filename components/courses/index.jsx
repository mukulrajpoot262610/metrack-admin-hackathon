import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCourses } from "../../services/api";
import { ConfirmAction } from "../fragments/ConfirmAction";
import Cards from "./Cards";
import Link from "next/dist/client/link";

export default function Courses() {

  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [deletionId, setDeletionId] = useState(null);
  const [activeSearch, setActiveSearch] = useState()

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await getCourses();
        setCourses(data?.data);
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

  console.log(courses)

  return (
    <div className="p-4">


      <div className="breadcrumbs mb-4 mx-2 uppercase font-bold text-xs">
        <ul>
          <Link href={'/account'}>
            <li><a>Home</a></li>
          </Link>
          <li>Courses</li>
        </ul>
      </div>

      <hr className="my-4 mb-8 border-gray-700" />

      <header className="my-2 mb-8 flex justify-between items-end">
        <div className="flex items-center justify-start">
          <select
            className="w-fit select select-bordered"
            value={activeSearch}
            onChange={(e) => setActiveSearch(e.target.value)}
          >
            <option value="0">Courses</option>
            <option value="1">Channels</option>
          </select>

          <div className="relative flex">
            <input type="search" id="search-dropdown" className="block p-3 z-20 text-sm input custom-input" placeholder="Search..." required="" />
            <button type="submit" className="btn">Search</button>
          </div>
        </div>

        <Link href={`/courses/edit`}>
          <button className="btn">Add Course</button>
        </Link>
      </header>
      <Cards courses={courses} />
      <ConfirmAction
        title="Confirm Deletion"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={() => onDelete(deletionId)}
      />
    </div>
  );
}
