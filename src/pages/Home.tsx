// Libraries/packages
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Local data
import months from "../constants/months";
import APIData from "../types/APIData";

// Components
import Hero from "../components/Hero";

const Home = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [apiData, setAPIData] = useState<APIData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        let controller: AbortController | null = new AbortController;
        const signal = controller.signal;

        const fetchAPOD = async () => {
            if (localStorage.getItem('apiData')) {
                const storedAPIData = localStorage.getItem('apiData');
                storedAPIData !== null ? setAPIData(JSON.parse(storedAPIData)) : setAPIData(null)
            } else {

                const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`, { signal: signal });
                const data: APIData = await res.json();

                if (res.ok) {
                    changeDate(data);

                    setError(null);
                    setAPIData(data);

                    localStorage.setItem('apiData', JSON.stringify(data));
                }

                if (!res.ok) setError('Some error occured');

                controller = null;
            }
        }

        fetchAPOD();

        return () => {
            if (controller) controller.abort;
        }
    }, [API_KEY])

    const changeDate = (data: APIData) => {
        const [year, month, date] = data.date.split('-');
        const newMonth = months[parseInt(month) - 1];

        const newDate = `${date} ${newMonth} ${year}`;
        if (data != null) data.date = newDate;
    }

    const fetchSpecifiedAPOD = async (specifiedDate: string) => {
        setIsLoading(true);

        const formatedDate = specifiedDate.split(" ")
            .reverse()
            .join('-')

        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${formatedDate}`);
        const data = await res.json();

        if (res.ok) {
            changeDate(data);
            setAPIData(data);

            localStorage.setItem('apiData', JSON.stringify(data));
        }

        if (!res.ok) setError(`Some error occured finding APOD for '${specifiedDate}'`);

        setIsLoading(false);
    }


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className='h-screen flex justify-center items-center'
        >
            {error && <p className='text-base text-[#C0C0C0] text-center w-40 sm:w-fit'>{error}</p>}

            {!error && apiData && (
                <Hero
                    image={apiData.hdurl}
                    title={apiData.title}
                    date={apiData.date}
                    fetchSpecifiedAPOD={fetchSpecifiedAPOD}
                    isLoading={isLoading}
                />
            )}
        </motion.div>
    )
}

export default Home;
