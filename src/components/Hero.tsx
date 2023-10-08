import { Link } from "react-router-dom"

interface Props {
    image: string
    title: string
    date: string
}

const Hero: React.FC<Props> = ({ image, title, date }) => {
    return (
        <div className='flex flex-col gap-5 items-center mx-2 sm:mx-0 sm:w-1/2 sm:gap-7 sm:items-stretch'>
            <h1 className='text-[#C0C0C0] text-lg text-center'>Astronomy Picture of the Day</h1>

            <Link to='/info'>
                <img
                    className='shadow-xl h-[20rem] w-full rounded-lg cursor-pointer transition-transform ease-in-out duration-500 hover:scale-150 sm:h-[30rem]' src={image} />
            </Link>

            <div className='mx-3 text-[#B0B0B0] flex flex-col items-center justify-between sm:flex-row'>
                <h1 className='text-sm'>{title}</h1>
                <h1 className='text-sm'>{date}</h1>
            </div>
        </div>
    )
}

export default Hero;
