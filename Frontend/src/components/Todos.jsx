import React from 'react'
import bin from '../assets/trash.png'
import file from '../assets/to-do-list.png'
import axios from 'axios'

const Todos = ({data, render}) => {
  const handleDelete = async (e)=>{
    const msg = await axios.delete(`/deletetodo?id=${e}`);
    alert(msg.data);
    render();
  }

  const changeStatus = async (e)=>{
    const msg = await axios.get(`/changestatus?id=${e._id}&status=${e.status}`);
    render();
  }
  return (
    <div className='border-2 m-2 p-2 flex gap-4 justify-between rounded-lg hover:shadow-lg'>
      <div className='p-2 flex gap-4'>
        {data.status ? <img className='h-8 bg-emerald-400 rounded-md cursor-pointer' onClick={()=>{changeStatus(data)}} src={file} alt='file'/> : <img className='h-8 bg-red-400 rounded-md cursor-pointer' onClick={()=>{changeStatus(data)}} src={file} alt='file'/>}
        <div className='p-1'>
        <div className='uppercase font-semibold text-cyan-500'>{data.title}</div>
        <div className='text-slate-600'>{data.note}</div>
        </div>
      </div>
      <div className='m-2'>
        <a className='underline text-sky-300 hover:text-sky-500' href={data.link} target="_blank">{data.link}</a>
        <div>Due Date: {data.date.slice(0, 10)}</div>
      </div>
      <img className='h-10 cursor-pointer hover:bg-red-300 rounded-full p-1 flex justify-center' src={bin} alt='Delete' onClick={()=>{handleDelete(data._id)}}/>
    </div>
  )
}

export default Todos
