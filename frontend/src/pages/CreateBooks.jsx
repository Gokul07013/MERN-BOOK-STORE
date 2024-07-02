import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import axios from 'axios';
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const CreateBooks = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [loading, setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  const navigate = useNavigate();
  //to handele the post request
  const handleSaveBook = () => {

    const data = {
      title,
      author,
      publishedYear,
    };
    setLoading(true);

    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book created successfull' , {variant : 'success'});
        navigate('/');
      })
      .catch((e) => {
        setLoading(false);
        enqueueSnackbar('Error' , {variant : 'error'});
        console.log(e);
      })
  }



  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl mt-4'>Create Book</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col border-2 border-blue-400 rounded-x1 w-[600px] p-4 mx-auto '>
        <div className='my-4'>
          <label className='text-gray-500 text-xl mr-4'>Title</label>
          <input className='border-2 border-gray-500 w-full px-4 py-2' type='text' value={title} onChange={(event) => setTitle(event.target.value)}></input>
        </div>
        <div className='my-4'>
          <label className='text-gray-500 text-xl mr-4'>Author</label>
          <input className='border-2 border-gray-500 w-full px-4 py-2' type='text' value={author} onChange={(event) => setAuthor(event.target.value)}></input>
        </div>
        <div className='my-4'>
          <label className='text-gray-500 text-xl mr-4'>Published Year</label>
          <input className='border-2 border-gray-500 w-full px-4 py-2' type='number' value={publishedYear} onChange={(event) => setPublishedYear(event.target.value)}></input>
        </div>
        <button className=' p-2 m-8 text-center bg-sky-300' onClick={handleSaveBook}>Save</button>
      </div>
    </div>
  )
}

export default CreateBooks