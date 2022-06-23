import Link from "next/link";
import React, { useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { deleteCourse, publishCourse, unPublishCourse } from "../../services/api";
import { ConfirmAction } from "../fragments/ConfirmAction";
import Enrolled from "./Enrolled";
import Stats from "./Stats";
import { useRouter } from 'next/router'

export default function Course({ course, loading }) {

  const [isOpen, setIsOpen] = useState(false);
  const [isPublish, setIsPublish] = useState(course?.isPublished)

  const router = useRouter()

  const handleDelete = async (e) => {
    try {
      const { data } = await deleteCourse(course._id)
      toast.success('Course Deleted')
      router.replace('/courses')
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.msg)
    }
  };


  const handlePublish = async (e) => {
    try {
      const { data } = await publishCourse(course._id)
      toast.success('Course Published')
      setIsPublish(data.data.isPublished)
    } catch (err) {
      console.warn(err)
      toast.error(err.response?.data?.msg)
    }
  }

  const handleUnPublish = async (e) => {
    try {
      const { data } = await unPublishCourse(course._id)
      toast.success('Course UnPublished')
      setIsPublish(data.data.isPublished)
    } catch (err) {
      console.warn(err)
      toast.error(err.response?.data?.msg)
    }
  }

  console.log(isPublish)

  return (
    <>
      {
        loading ? <div className="flex justify-center items-center min-h-screen w-full"><LoaderIcon /></div> : <div className="p-4">

          <div className="breadcrumbs mb-4 mx-2 uppercase font-bold text-xs">
            <ul>
              <Link href={'/account'}>
                <li><a>Home</a></li>
              </Link>
              <Link href={`/courses`}>
                <li><a>Courses</a></li>
              </Link>
              <li>{course?.name}</li>
            </ul>
          </div>

          <section className="flex flex-col gap-8 px-4 py-8 border-2 rounded-lg md:flex-row bg-primary bg-opacity-30 border-opacity-40 border-primary">
            <div id="cover" className="flex-1">
              <img src={course?.thumbnail} />
            </div>
            <div id="content" className="flex flex-col flex-1">
              <h1 className="text-3xl font-extrabold">{course?.name}</h1>
              <p className="pt-4 text-sm">
                {course?.description}
              </p>
              <div className="flex pb-4 pt-2">
                {course?.tags.map((e, i) => <p key={i} className="text-2xs uppercase mr-2 font-bold"> #{e.trim()}</p>)}
              </div>
              <div className="flex items-end justify-end flex-1 gap-4">
                <Link href={`/courses/edit?id=${course?._id}`}>
                  <button className="btn btn-warning">edit</button>
                </Link>
                {
                  isPublish ? <button className="btn btn-primary" onClick={handleUnPublish}>unpublish</button> : <button className="btn btn-success" onClick={handlePublish}>publish</button>
                }

                <button onClick={(e) => setIsOpen(true)} className="btn btn-error">
                  delete
                </button>
              </div>
            </div>
          </section>

          <section className="pt-10 w-full">
            <Stats course={course} />
          </section>

          <section className="pt-10">
            <h1 className="uppercase my-2 font-bold px-2">Enrolled Students</h1>
            <Enrolled students={course?.students} />
          </section>

          <section className="pt-10">
            <h1 className="uppercase my-2 font-bold px-2">Projects</h1>
            <Enrolled students={course?.projects} />
          </section>

          <ConfirmAction
            title="Confirm Deletion"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onConfirm={handleDelete}
          />
        </div>
      }

    </>
  );
}
