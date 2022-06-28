import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getChannels, getCourses } from "../../services/api";
import { ConfirmAction } from "../fragments/ConfirmAction";
import Cards from "./Cards";
import Link from "next/dist/client/link";

export default function Channels() {

    const [loading, setLoading] = useState(false);
    const [channels, setChannels] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [deletionId, setDeletionId] = useState(null);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const { data } = await getChannels();
                setChannels(data?.data);
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


            <div className="breadcrumbs mb-4 mx-2 uppercase font-bold text-xs">
                <ul>
                    <Link href={'/account'}>
                        <li><a>Home</a></li>
                    </Link>
                    <li>Channels</li>
                </ul>
            </div>

            <hr className="my-4 mb-8 border-gray-700" />

            <header className="my-2 mb-8 flex justify-between items-end">
                <div className="flex items-center justify-start">
                    <div className="relative flex">
                        <input type="search" id="search-dropdown" className="block p-3 z-20 text-sm input custom-input" placeholder="Search..." required="" />
                        <button type="submit" className="btn">Search</button>
                    </div>
                </div>

                <Link href={`/channels/edit`}>
                    <button className="btn">Add Channel</button>
                </Link>
            </header>
            <Cards channels={channels} />
            <ConfirmAction
                title="Confirm Deletion"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onConfirm={() => onDelete(deletionId)}
            />
        </div>
    );
}
