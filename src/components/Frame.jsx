import React from 'react'
import {useState} from 'react'

export default function Frame(props) {

  const [datas, setDatas] = useState(props.data)
  const randomIndex = Math.floor(Math.random() * datas.length)
  console.log(randomIndex)
  const data = datas[randomIndex];

  
  const artFrame = data && (
    <div 
    key={data.id}
    className='w-full h-max mx-auto flex flex-col justify-center items-center '
    >
      <img 
      src={data.img.src} 
      alt={data.title}
      className='w-fit h-[250px] min-h-[200px] bg-neutral-100' 
      />

      <ul className='w-max h-full flex flex-col justify-center items-center text-[14px] text-outer-space pt-1 text-balance' >
        <li className='font-medium text-[12px]'>{data.title}</li>
        <li className='text-[10px] text-neutral-500'>{data.artist}</li>
        <li className='text-[8px] italic text-neutral-400'>{data.date}</li>
      </ul>
    </div>
  )

  return (
    <section className='text-black w-full h-2/3 flex justify-center items-center'>
     {artFrame}
    </section>
  )
}
