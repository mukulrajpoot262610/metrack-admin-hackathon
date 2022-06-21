import React, { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import EditCourse from "../../../components/courses/EditCourse";
import { getCourse } from "../../../services/api";
import { useRouter } from "next/dist/client/router";

export default function Edit() {

  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState();
  const router = useRouter()
  const id = router.query.id

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await getCourse(id);
        setCourse(data?.data);
      } catch (err) {
        console.log("some error ", err);
        toast.error(err?.response?.data?.msg);
      } finally {
        setLoading(false);
      }
    };

    id && getData();

  }, [id]);

  return (
    <>
      {
        id ? (loading ? <div className="flex justify-center items-center min-h-screen w-full"><LoaderIcon /></div> : <EditCourse course={course} />) : <EditCourse />
      }
    </>
  );
}
