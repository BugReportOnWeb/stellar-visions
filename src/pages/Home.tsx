// Hooks/Modules/Packages
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

// Components
import Hero from "../components/Hero";

// Local data
import { APIDataContextType } from "../types/API";
import { APIDataContext } from '../context/APIDataContext';
import { changeDate } from "../lib/utils";

// API related constants
const BASE_URL = 'https://api.nasa.gov/planetary/apod'
const API_KEY = import.meta.env.VITE_API_KEY;

const Home = () => {
    const { apiData, setAPIData } = useContext(APIDataContext) as APIDataContextType;
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        let controller: AbortController | null = new AbortController();

        const fetchAPIData = async () => {
            try {
                const res = await fetch(`${BASE_URL}?api_key=${API_KEY}`, { 
                    signal: controller?.signal
                });
                const data = await res.json();

                if (res.ok) {
                    changeDate(data);
                    setAPIData(data);
                    setError(null);
                }

                if (!res.ok) {
                    setError('Some error occured');
                } 
            } catch (error) {
                // TODO: Do something useful with the error
                console.log(error);
            } finally {
                controller = null;
            }
        };

        if (!apiData) fetchAPIData();

        return () => {
            if (controller) controller.abort();
        }
    }, [setAPIData, apiData])

    const fetchSpecifiedAPOD = async (specifiedDate: string) => {
        setIsLoading(true);

        const searchedDate = specifiedDate.split(" ")
            .reverse()
            .join('-')

        try {
            const res = await fetch(`${BASE_URL}?api_key=${API_KEY}&date=${searchedDate}`);
            const data = await res.json();

            if (res.ok) {
                changeDate(data);
                setAPIData(data);
            }

            if (!res.ok) setError(`Some error occured finding APOD for "${specifiedDate}"`);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className='h-screen flex justify-center items-center'
        >
            {!apiData && (
                // TODO: Have a loading component/skeleton
                <p>Loading...</p>
            )}

            {error && (
                <div className='leading-8 w-fit mx-5 text-base text-[#C0C0C0] text-center'>
                    <p>{error} :(</p>
                    <p>Make sure you submit the date in right format (DD MM YYYY)</p>
                    <p className='mt-5'>Go back to <span onClick={() => setError(null)} className='underline underline-offset-4 cursor-pointer hover:decoration-white'>Home</span> page</p>
                </div>
            )}

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
