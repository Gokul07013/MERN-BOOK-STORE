import { Link } from 'react-router-dom' ;
import { BsArrowLeft } from 'react-icons/bs'


function BackButton({destination = '/' }) {
  return (
    <div className='flex'>
        <Link to={destination} className='w-16 h-25 bg-blue-300 px-4 py-1 my-5 rounded-md text-white'>
           <BsArrowLeft className='text-4xl justify-center'/>
        </Link>
    </div>
  )
}

export default BackButton