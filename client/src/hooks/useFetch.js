import { useEffect, useState } from "react"
import axios from "axios"

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await axios.get(url)
        setData(res.data)
      } catch (error) {
        setError(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [url])

  const fetchAgain = async () => {
    setLoading(true)
    try {
      const res = await axios.get(url)
      setData(res.data)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }

  return { data, loading, error, fetchAgain }
}

export default useFetch
