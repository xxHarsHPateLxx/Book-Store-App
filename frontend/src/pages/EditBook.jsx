import React,{ useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditBook = () => {
  const [title, settitle] = useState('')
  const [author, setauthor] = useState('')
  const [publishYear, setpublishYear] = useState('')
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()  
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    setloading(true)
    axios.get(`http://localhost:5000/books/${id}`)
    .then((res) => {
      setauthor(res.data.author)
      setpublishYear(res.data.publishYear)
      settitle(res.data.title)
      setloading(false)
    })
    .catch((err) => {
      setloading(false) 
      alert('An error occurred. Pls check console')     
      console.log(err)
    })
    
  }, [])
  

  const handleEditBook = () => {
    const data = {
      title,
      author, 
      publishYear
    }
    setloading(true)
    axios.put(`http://localhost:5000/books/${id}`, data)
    .then(() => {
      setloading(false)
      enqueueSnackbar('Book Edited Successfully', { variant: 'success'})
      navigate('/')
    })
    .catch((err) => {
      setloading(false) 
      // alert('An error occurred. Pls check console') 
      enqueueSnackbar('Error', { variant: 'error'})    
      console.log(err)
    })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner/> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        
        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input 
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input 
          type="author"
          value={author}
          onChange={(e) => setauthor(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className="my-4">
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input 
          type="text"
          value={publishYear}
          onChange={(e) => setpublishYear(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>


      </div>
    </div>
  )
}

export default EditBook
