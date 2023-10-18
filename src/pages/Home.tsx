// Libraries/packages
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

// Components
import Hero from "../components/Hero";

// Local data
import months from "../constants/months";
import { APIData, APIDataContextType } from "../types/API";
import { APIDataContext } from '../context/APIDataContext';

const Home = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;

    const { apiData, setAPIData } = useContext(APIDataContext) as APIDataContextType;

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        let controller: AbortController | null = new AbortController;
        const signal = controller.signal;

        // Check with global context value instead of localStorage
        (async () => {
            if (localStorage.getItem('apiData')) {
                const storedAPIData = localStorage.getItem('apiData');
                storedAPIData !== null ? setAPIData(JSON.parse(storedAPIData)) : setAPIData(null)
            } else {
                try {
                    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`, { signal: signal });
                    const data: APIData = await res.json();

                    if (res.ok) {
                        changeDate(data);

                        setError(null);
                        setAPIData(data);

                        localStorage.setItem('apiData', JSON.stringify(data));
                    }

                    if (!res.ok) setError('Some error occured');
                } catch (error) {
                    console.log(error);
                } finally {
                    controller = null;
                }
            }
        })();

        return () => {
            if (controller) controller.abort();
        }
    }, [API_KEY, setAPIData])

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
