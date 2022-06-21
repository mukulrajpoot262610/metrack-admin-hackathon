import React, { useState } from "react";
import toast from "react-hot-toast";
import { addCourses } from "../../services/api";
import Link from "next/dist/client/link";

export default function EditCourse({ course }) {

  const [name, setName] = useState(course?.name)
  const [description, setDescription] = useState(course?.description)
  const [channelImage, setChannelImage] = useState(course?.channelImage)
  const [thumbnail, setThumbnail] = useState(course?.thumbnail)
  const [video, setVideo] = useState(course?.video)
  const [channel, setChannel] = useState(course?.channel)
  const [tags, setTags] = useState(course?.tags)
  const [level, setLevel] = useState(course?.level)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !description || !channelImage || !thumbnail || !video || !channel || !tags || !level) {
      return toast.error('All Fields are required')
    }

    const payload = {
      name, description, channelImage, thumbnail, video, channel, tags, level
    }

    try {
      const { data } = await addCourses(payload)
      toast.success('Course Created 🎉')
      console.log(data)
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.msg)
    }
  }

  return (
    <div className="p-4">

      <div className="breadcrumbs mb-4 max-w-5xl mx-auto uppercase font-bold text-xs">
        <ul>
          <li><a>Home</a></li>
          <Link>
            <li><a>Courses</a></li>
          </Link>
          <li>{course ? "Edit" : "ADD"} Course</li>
        </ul>
      </div>

      <hr className="my-4 mb-8" />

      <header className="max-w-5xl mx-auto mb-4">
        <h1 className="uppercase font-bold text-xl">{course ? "Edit" : "ADD"} Course</h1>
      </header>
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-4">
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
          {/* <div>
            <label htmlFor="title" className="custom-label">
              Respect
            </label>
            <input
              id="title"
              type="number"
              placeholder="title"
              className="custom-input"
            />
          </div> */}
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
        </div>
        <div className="flex items-end justify-end gap-4 py-8">
          <button className="btn btn-primary">Publish</button>
          <button className="btn btn-warning">Cancel</button>
        </div>
      </form>
    </div>
  );
}
