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

      <ul className='w-full h-full flex flex-col justify-center items-center text-[14px] text-outer-space'>
        <li className='font-medium'>{data.title}</li>
        <li className='text-[12px]'>{data.artist}</li>
        <li className='font-medium text-[8px] italic'>{data.date}</li>
      </ul>
    </div>
  )

  return (
    <section className='text-black w-full h-2/3 flex justify-center items-center'>
     {artFrame}
    </section>
  )
}
