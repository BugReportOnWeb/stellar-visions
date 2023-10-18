// Libraries/Modules
import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Local data
import { APIDataContextType } from '../types/API';
import Details from '../components/Details';
import { APIDataContext } from '../context/APIDataContext';

const Info = () => {
    const { apiData } = useContext(APIDataContext) as APIDataContextType;

    // Check on refresh page (using localStorage?)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className='sm:h-screen sm:flex sm:justify-center sm:items-center'
        >
            {!apiData && (
                <div className='w-fit mx-auto mt-16 text-base text-[#C0C0C0] text-center'>
                    <p>Some error occured :(</p>
                    <p>Go back to <Link className='underline underline-offset-4 hover:decoration-white' to='/'>Home</Link> page</p>
                </div>
            )}

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
