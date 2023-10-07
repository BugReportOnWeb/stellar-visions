import { useEffect, useState } from "react";
import months from "../constants/months";

interface APIData {
    date: string,
    explanation: string,
    hdurl: string,
    media_type: string,
    service_version: string,
    title: string
    url: string
}

const Home = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [apiData, setAPIData] = useState<APIData | null>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const changeDate = (data: APIData) => {
        const [year, month, date] = data.date.split('-');
        const newMonth = months[parseInt(month) - 1];

        const newDate = `${date} ${newMonth} ${year}`;
        if (data != null) data.date = newDate;
    }

    useEffect(() => {
        const fetchAPOD = async () => {
            setIsLoading(true);

            if (localStorage.getItem('apiData') !== null) {
                const storedAPIData = localStorage.getItem('apiData');
                storedAPIData !== null ? setAPIData(JSON.parse(storedAPIData)) : setAPIData(null)
            } else {
                const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
                const data: APIData = await res.json();

                if (res.ok) {
                    changeDate(data);
                    localStorage.setItem('apiData', JSON.stringify(data));
                    setIsLoading(false);

                    setAPIData(data);
                }

                if (!res.ok) {
                    setIsLoading(false);
                    setError('Some error occured');
                }
            }
        }

        fetchAPOD();
    }, [API_KEY])

    return (
        <div>
            <p className='text-red-500'>Testing</p>
            {isLoading && <p>Is loading...</p>}
            {error && <p>{error}</p>}

            {apiData && (
                <div>
                    <p>{apiData.title}</p>
                    <p>{apiData.date}</p>
                    <p>{apiData.explanation}</p>
                    <img src={apiData.hdurl} />
                </div>
            )}
        </div>
    )
}

export default Home;
