import { useEffect, useState } from "react";

import Hero from "../components/Hero";

import months from "../constants/months";
import APIData from "../types/APIData";

const Home = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [apiData, setAPIData] = useState<APIData | null>(null);
    const [error, setError] = useState<string | null>(null);
    // const [isLoading, setIsLoading] = useState<boolean>(false);

    const changeDate = (data: APIData) => {
        const [year, month, date] = data.date.split('-');
        const newMonth = months[parseInt(month) - 1];

        const newDate = `${date} ${newMonth} ${year}`;
        if (data != null) data.date = newDate;
    }

    useEffect(() => {
        const fetchAPOD = async () => {
            if (localStorage.getItem('apiData') !== null) {
                const storedAPIData = localStorage.getItem('apiData');
                storedAPIData !== null ? setAPIData(JSON.parse(storedAPIData)) : setAPIData(null)
            } else {
                const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
                const data: APIData = await res.json();

                if (res.ok) {
                    changeDate(data);

                    setError(null);
                    setAPIData(data);

                    localStorage.setItem('apiData', JSON.stringify(data));
                }

                if (!res.ok) setError('Some error occured');
            }
        }

        fetchAPOD();
    }, [API_KEY])

    return (
        <div className='h-screen flex justify-center items-center'>
            {error && <p className='text-sm text-[#C0C0C0]'>Some error occured :(</p>}

            {apiData && (
                <Hero
                    image={apiData.hdurl}
                    title={apiData.title}
                    date={apiData.date}
                />
            )}
        </div>
    )
}

export default Home;
