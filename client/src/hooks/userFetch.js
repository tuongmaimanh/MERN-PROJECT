import {useEffect, useState} from 'react'
import {axiosInstance} from '../config'

const useFetch = (url) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        axiosInstance.get(url).then(res=> {
            setData(res.data)
        })
        .catch(err => console.log(err))
        setLoading(false)
    },[url])

    const reFetch = async () => {
        setLoading(true);
        try {
          const res = await axiosInstance.get(url);
          setData(res.data);
        } catch (err) {
          setError(err);
        }
        setLoading(false);
      };
    
      return { data, loading, error, reFetch };
}

export default useFetch;
