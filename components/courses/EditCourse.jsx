import React, { useState } from "react";
import toast from "react-hot-toast";
import { addCourses, editCourses } from "../../services/api";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";

export default function EditCourse({ course }) {

  const router = useRouter()
  const [name, setName] = useState(course?.name)
  const [description, setDescription] = useState(course?.description)
  const [channelImage, setChannelImage] = useState(course?.channelImage)
  const [thumbnail, setThumbnail] = useState(course?.thumbnail)
  const [video, setVideo] = useState(course?.video)
  const [channel, setChannel] = useState(course?.channel)
  const [tags, setTags] = useState(course?.tags.join(","))
  const [level, setLevel] = useState(course?.level)
  const [category, setCategory] = useState(course?.category)
  const [domain, setDomain] = useState(course?.domain)
  const [aboutChannel, setAboutChannel] = useState(course?.aboutChannel)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !description || !channelImage || !thumbnail || !video || !channel || !tags || !level) {
      return toast.error('All Fields are required')
    }

    const payload = {
      name, description, channelImage, thumbnail, video, channel, tags, level, aboutChannel, domain, category
    }

    try {
      const { data } = await addCourses(payload)
      toast.success('Course Created 🎉')
      router.replace(`/courses/${data.data._id}`)
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.msg)
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    const payload = {
      id: course._id, name, description, channelImage, thumbnail, video, channel, tags, level, aboutChannel, domain, category
    }

    try {
      const { data } = await editCourses(payload)
      toast.success('Course Edited 🎉')
      router.replace(`/courses/${course._id}`)
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.msg)
    }
  }

  return (
    <div className="p-4">

      <div className="breadcrumbs mb-4 max-w-5xl mx-auto uppercase font-bold text-xs">
        <ul>
          <Link href={'/account'}>
            <li><a>Home</a></li>
          </Link>
          <Link href={`/courses`}>
            <li><a>Courses</a></li>
          </Link>
          {course && <Link href={`/courses/${course?._id}`}>
            <li><a>{course?.name}</a></li>
          </Link>
          }
          <li>{course ? "Edit" : "ADD"} Course</li>
        </ul>
      </div>

      <hr className="my-4 mb-8" />

      <header className="max-w-5xl mx-auto mb-4">
        <h1 className="uppercase font-bold text-xl">{course ? "Edit" : "ADD"} Course</h1>
      </header>
      <form onSubmit={course ? handleEdit : handleSubmit} className="max-w-5xl mx-auto space-y-4">
        <div>
          <label htmlFor="name" className="custom-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of course"
            className="custom-input"
          />
        </div>
        <div>
          <label htmlFor="description" className="custom-label">
            Description
          </label>
          <textarea
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="About the course, you can write markdown here"
            className="custom-textarea"
          />
        </div>
        <label htmlFor="thumbnail" className="custom-label">
          Thumbnail
        </label>
        <input
          id="thumbnail"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          type="text"
          placeholder="Add Thumbnail Link"
          className="custom-input"
        />
        <label htmlFor="channelImage" className="custom-label">
          Channel Image
        </label>
        <input
          id="channelImage"
          value={channelImage}
          onChange={(e) => setChannelImage(e.target.value)}
          type="text"
          placeholder="Add Channel Image Link"
          className="custom-input"
        />
        <div>
          <label htmlFor="video" className="custom-label">
            Video
          </label>
          <input
            id="video"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            type="text"
            placeholder="Add Video Link"
            className="custom-input"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="channel" className="custom-label">
              Channel
            </label>
            <input
              id="channel"
              type="text"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              placeholder="Channel Name"
              className="custom-input"
            />
          </div>
          <div>
            <label htmlFor="about-channel" className="custom-label">
              About Channel
            </label>
            <input
              id="about-channel"
              type="text"
              value={aboutChannel}
              onChange={(e) => setAboutChannel(e.target.value)}
              placeholder="About Channel"
              className="custom-input"
            />
          </div>
          <div>
            <label htmlFor="tags" className="custom-label">
              Tags (comma separated)
            </label>
            <input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              type="text"
              placeholder="Tags"
              className="custom-input"
            />
          </div>
          <div>
            <label htmlFor="level" className="custom-label">
              Level
            </label>
            <select
              className="w-full select select-bordered custom-input"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="0">Beginner</option>
              <option value="1">Intermediate</option>
              <option value="2">Advanced</option>
            </select>
          </div>

          <div>
            <label htmlFor="domain" className="custom-label">
              Domain
            </label>
            <select
              className="w-full select select-bordered custom-input"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            >
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
              <option value="web3">Web3.0 Development</option>
            </select>
          </div>
          <div>
            <label htmlFor="category" className="custom-label">
              Categories
            </label>
            <select
              className="w-full select select-bordered custom-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="htmlcss">HTML/CSS</option>
              <option value="javascript">Javascript</option>
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="angular">Angular</option>
              <option value="node">Node</option>
              <option value="python">Python</option>
              <option value="django">Django</option>
              <option value="flutter">Flutter</option>
            </select>
          </div>

        </div>
        <div className="flex items-end justify-end gap-4 py-8">
          <button type="submit" className="btn btn-primary">Save</button>
          <Link href={`/courses/${course?._id}`}>
            <div className="btn btn-warning">Cancel</div>
          </Link>
        </div>
      </form>
    </div>
  );
}
