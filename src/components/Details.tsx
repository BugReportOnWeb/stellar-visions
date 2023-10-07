import { Link } from "react-router-dom";

interface Props {
    title: string,
    image: string,
    date: string,
    explanation: string
}

const Details: React.FC<Props> = ({ title, image, date, explanation }) => {
    return (
        <div className='max-w-7xl mx-auto flex justify-between items-center gap-40'>
            <div className='flex flex-col gap-6 items-start w-1/2'>
                <Link to='/'>
                    <svg className='group ml-2 cursor-pointer transition-colors duration-500' width="62" height="10" viewBox="0 0 62 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className='transition-colors duration-500 stroke-[#B0B0B0] group-hover:stroke-white' d="M1 5L62 5M1 5L6.83478 1M1 5L6.83478 9"  />
                    </svg>
                </Link>

                <img
                    src={image}
                    className='shadow-xl h-[23rem] w-full rounded-lg'
                />

                <div className='ml-2'>
                    <h1 className='text-xl text-white/90 mb-0.5'>{title}</h1>
                    <h1 className='text-sm text-[#B0B0B0]'>{date}</h1>
                </div>
            </div>

            <div className='w-1/2 text-white/90'>
                <h1 className='text-4xl mb-5'>Explanation</h1>
                <p className='leading-7 text-base'>{explanation}</p>
            </div>
        </div>
    )
}

export default Details;
