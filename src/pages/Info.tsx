import { useState, useEffect } from 'react';

import APIData from '../types/APIData';
import months from '../constants/months';
import Details from '../components/Details';

import { motion } from 'framer-motion';

const Info = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [apiData, setAPIData] = useState<APIData | null>(null);
    const [error, setError] = useState<string | null>(null);

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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className='sm:h-screen sm:flex sm:justify-center sm:items-center'
        >
            {error && <p className='text-sm text-[#C0C0C0]'>Some error occured :(</p>}

            {apiData && (
                <Details
                    image={apiData.hdurl}
                    title={apiData.title}
                    date={apiData.date}
                    explanation={apiData.explanation}
                />
            )}
        </motion.div>
    )
}

export default Info;
