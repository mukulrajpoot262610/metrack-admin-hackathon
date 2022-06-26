import React, { useState } from "react";
import toast from "react-hot-toast";
import { addChannel, addCourses, editCourses } from "../../services/api";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";

export default function AddChannel({ channel }) {

    const router = useRouter()
    const [channelImage, setChannelImage] = useState(channel?.channelImage)
    const [channelName, setChannelName] = useState(channel?.channel)
    const [aboutChannel, setAboutChannel] = useState(channel?.aboutChannel)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!channelImage || !channelName || !aboutChannel) {
            return toast.error('All Fields are required')
        }

        const payload = {
            aboutChannel, channelName, channelImage
        }

        try {
            const { data } = await addChannel(payload)
            toast.success('Channel Created 🎉')
            router.replace(`/channels/${data.data._id}`)
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
                    <Link href={`/channels`}>
                        <li><a>Channels</a></li>
                    </Link>
                    {channel && <Link href={`/channels/${channel?._id}`}>
                        <li><a>{channel?.name}</a></li>
                    </Link>
                    }
                    <li>{channel ? "Edit" : "ADD"} Channel</li>
                </ul>
            </div>

            <hr className="my-4 mb-8" />

            <header className="max-w-5xl mx-auto mb-4">
                <h1 className="uppercase font-bold text-xl">{channel ? "Edit" : "ADD"} Channel</h1>
            </header>
            <form onSubmit={channel ? handleEdit : handleSubmit} className="max-w-5xl mx-auto space-y-4">
                <div>
                    <label htmlFor="name" className="custom-label">
                        Channel Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
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
                        value={aboutChannel}
                        onChange={(e) => setAboutChannel(e.target.value)}
                        placeholder="About the course, you can write markdown here"
                        className="custom-textarea"
                    />
                </div>
                <div>
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
                </div>
                <div className="flex items-end justify-end gap-4 py-8">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <Link href={`/courses/${channel?._id}`}>
                        <div className="btn btn-warning">Cancel</div>
                    </Link>
                </div>
            </form>
        </div>
    );
}
