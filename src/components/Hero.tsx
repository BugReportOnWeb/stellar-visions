import { FormEvent, useState } from "react";
import { Link } from "react-router-dom"

interface HeroProps {
    image: string;
    title: string;
    date: string;
    isLoading: boolean;
    fetchSpecifiedAPOD: (specifiedDate: string) => void;
}

const Hero = ({ image, title, date, isLoading, fetchSpecifiedAPOD }: HeroProps) => {
    const [specifiedDate, setSpecifiedDate] = useState('');
    // TOOD: Take in use of imagePlaceholder
    // const [imagePlaceholder, setImagePlaceholder] = useState(true);

    const handleDateSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetchSpecifiedAPOD(specifiedDate);
        setSpecifiedDate('');
    }

    return (
        <div className='flex flex-col gap-5 items-center mx-2 sm:mx-0 sm:w-1/2 sm:items-stretch'>
            <h1 className='text-[#C0C0C0] text-lg text-center'>Astronomy Picture of the Day</h1>

            <Link to='/info'>
                <img
                    className='shadow-xl h-[17rem] w-full rounded-lg cursor-pointer transition-transform ease-in-out duration-500 hover:scale-100 sm:h-[30rem] sm:hover:scale-150'
                    src={image}
                    // onLoad={() => setImagePlaceholder(false)}
                />
            </Link>

            <div className='mx-3 text-[#B0B0B0] flex flex-col items-center justify-between gap-1 sm:flex-row'>
                <h1 className='text-sm'>{title}</h1>
                <div className='flex flex-col-reverse gap-3 items-center sm:flex-row sm:gap-4'>
                    {isLoading && <p className='text-sm'>Loading...</p>}
                    <form onSubmit={handleDateSubmit}>
                        <input
                            className='bg-transparent border border-gray-500 text-sm py-1 px-2 rounded-lg w-40 outline-[#C0C0C0] outline-offset-2 focus:outline focus:outline-1'
                            placeholder='DD MM YYYY'
                            value={specifiedDate}
                            onChange={(e) => setSpecifiedDate(e.target.value)}
                        />
                    </form>
                    <h1 className='text-sm'>{date}</h1>
                </div>
            </div>
        </div>
    )
}

export default Hero;
