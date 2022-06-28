import React, { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { getChannel, getCourse } from "../../../services/api";
import { useRouter } from "next/dist/client/router";
import AddChannel from "../../../components/channel/AddChannel";

export default function EditChannel() {

    const [loading, setLoading] = useState(false);
    const [channel, setChannel] = useState();
    const router = useRouter()
    const id = router.query.id

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const { data } = await getChannel(id);
                setChannel(data?.data);
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
                id ? (loading ? <div className="flex justify-center items-center min-h-screen w-full"><LoaderIcon /></div> : <AddChannel channel={channel} />) : <AddChannel />
            }
        </>
    );
}
