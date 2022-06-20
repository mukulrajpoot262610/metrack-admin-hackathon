import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCourses } from "../../services/api";
import { ConfirmAction } from "../fragments/ConfirmAction";
import Cards from "./Cards";

export default function Courses() {

  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [deletionId, setDeletionId] = useState(null);

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



  return (
    <div className="p-4">
      <Cards />

      <ConfirmAction
        title="Confirm Deletion"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={() => onDelete(deletionId)}
      />
    </div>
  );
}
