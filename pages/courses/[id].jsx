import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import Course from "../../components/courses/Course";
import { getCourse } from "../../services/api";

export default function CourseDetail() {

  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState();
  const router = useRouter()
  const id = router.query.id

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const { data } = await getCourse(id);
        setCourse(data?.data);
        setLoading(false)
      } catch (err) {
        console.log("some error ", err);
        toast.error(err?.response?.data?.msg);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  console.log(course)

  return (
    <>
      {
        !course ? <LoaderIcon /> : <Course course={course} loading={loading} />
      }

    </>
  );
}
