import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setAuth } from "../redux/authSlice"

export function useLoadingWithRefresh() {

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin-refresh`, {
                    withCredentials: true
                })
                dispatch(setAuth(data))
                setLoading(false)
            } catch (err) {
                console.log(err.message)
                setLoading(false)
            }
        })()
    }, [dispatch])

    return { loading }
}