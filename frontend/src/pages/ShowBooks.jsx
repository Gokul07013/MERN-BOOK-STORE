import React,{useEffect,useState} from 'react'
import BackButton from '../components/BackButton'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const ShowBooks = () => {

   
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  
 

  useEffect(() => {

      setLoading(true);
      axios
          .get(`http://localhost:5555/books/${id}`)
          .then((response) => {
              setBooks(response.data.book);
              setLoading(false);
          })
          .catch((error) => {
              console.log(error);
              setLoading(false);
          })

  }, []);

  
  return (
    <div className='mx-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (<Spinner/>) : (
        <div className='flex flex-col border-2 border-sky-400 w-fit p-4 rounded-x1 '>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Id :</span>
            <span>{books._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Title :</span>
            <span>{books.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Author :</span>
            <span>{books.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>PublishedYear :</span>
            <span>{books.publishedYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Create Time :</span>
            <span>{new Date(books.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Last Update At :</span>
            <span>{new Date(books.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBooks