import React, { useState} from 'react'
import BackButton from '../components/BackButton'
import axios from 'axios';
import Spinner from '../components/Spinner'
import { useNavigate,useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully' , {variant : 'success'});
        navigate('/');
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        enqueueSnackbar('Error' , {variant : 'error'});
      })
  }


  return (
    <div className='p-3 font-mono'>
      <BackButton/>
      <h1 className='my-2 text-3xl'>Delete Book</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col items-center border-sky-400 rounded-xl w-[600px] border-2 p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
        <button className='p-4 bg-red-600 w-full text-white m-8' onClick={handleDeleteBook}>Yes, Delete it</button>
      </div>
    </div>
  )
}

export default DeleteBooks