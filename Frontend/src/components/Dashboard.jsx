import React,{useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import up from '../assets/swipe-up.png'
import down from '../assets/swipe-down.png'
import axios from 'axios'

const Dashboard = ({count}) => {
  const [type, setType] = useState('Year');
  const [showbutton, setShowbutton] = useState(false);
  const [data, setData] = useState({x_axis:[],y_axis:[]});

  const showoptions = ()=>{
    if (showbutton){setShowbutton(false)}
    else{setShowbutton(true)}
  }
  const fetchparam = async ()=>{
    const msg = await axios.get(`/graphparam?type=${type}`)
    setData(msg.data)
  }

  const changetype = (e)=>{
    setType(e.target.name);
    setShowbutton(false);
  }
  useEffect(()=>{
    fetchparam();
  }, [type, count])
  
  return (
    <div className='m-3'>
      <div className='flex gap-2'>
        <label className='p-1'>Select Type: </label>
        <button className='p-1.5 border flex gap-1 w-[7%] justify-between rounded-md' onClick={()=>{showoptions()}}>
          <a className=''>{type}</a>
          {showbutton ? <img src={down} alt='up-button' className='h-6'/> : <img src={up} alt='up-button' className='h-6 '/>}
        </button>
        {showbutton ? 
        <div className='absolute left-28 top-24 gap-1 border rounded-md'>
          {type=='Year' ? <>
            <a className='block p-1 px-5 cursor-pointer hover:bg-slate-200' name='Month' onClick={(e)=>{changetype(e)}}>Month</a>
            <a className='block p-1 px-5 cursor-pointer hover:bg-slate-200' name='Date' onClick={(e)=>{changetype(e)}}>Date</a></>: 
          type=='Month' ? <>
            <a className='block p-1 px-6 cursor-pointer hover:bg-slate-200' name='Year' onClick={(e)=>{changetype(e)}}>Year</a>
            <a className='block p-1 px-6 cursor-pointer hover:bg-slate-200' name='Date' onClick={(e)=>{changetype(e)}}>Date</a></>: 
          <>
            <a className='block p-1 px-5 cursor-pointer hover:bg-slate-200' name='Year' onClick={(e)=>{changetype(e)}}>Year</a>
            <a className='block p-1 px-5 cursor-pointer hover:bg-slate-200' name='Month' onClick={(e)=>{changetype(e)}}>Month</a></>}  
        </div>: null}
      </div>
      <div className='h-[420px] m-6 px-10'>
      <Line 
        data={{
          labels: data.x_axis,
          datasets:[{
            label: "Number of Todo",
            data: data.y_axis,
            borderWidth: 1
            }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins:{
            zoom:{
              pan:{
                enable: true
              },
            },
            legend:{
              position: "top",
              labels:{
                usePointStyle: true,
                PointStyle: "circle",
                boxWidth: 7,
                boxHeight: 7,
              }
            },
            title:{
              display: true,
              text: `Number of Todo's per ${type}`,
              color: "#06B6D4",
              font:{weight: 'bold', size: 15},
            }
          },
          scales:{
            x: {
              title:{
                display: true,
                text: type,
                font:{weight: 'bold', size: 15},
                padding: 20,
              },
            },
            y:{
              beginAtZero: true,
              title:{
                display: true,
                text: "Number of Todo's",
                font:{weight: 'bold', size: 15},
                padding: 20,
              }
            },
          },
          
        }}
      />
      </div>
      <hr/>
    </div>
  )
}

export default Dashboard
