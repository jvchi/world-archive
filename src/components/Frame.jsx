import React from 'react'
import {useState} from 'react'

export default function Frame(props) {

  const [datas, setDatas] = useState(props.data)
  const randomIndex = Math.floor(Math.random() * datas.length)
  const data = datas[randomIndex];
  const activeArt = props.activeArt;
  const IDs = props.IDs

  const artFrame = activeArt && data && (
    <div 
    key={activeArt.objectID}
    className='w-full h-max mx-auto flex flex-col justify-center items-center '
    >
      <img 
      src={activeArt.primaryImage } 
      alt={activeArt.title}
      className='w-fit h-[250px] min-h-[200px] bg-neutral-100' 
      />

      <ul className='max-w-[300px] h-full flex flex-col justify-center place-content-center items-center text-[14px] text-outer-space pt-1 text-center'>
        <li className='font-medium text-[12px]  '>{activeArt.title}</li>
        <li className='text-[10px] text-neutral-500'>{activeArt.
artistDisplayName
}</li>
        <li className='text-[8px] italic text-neutral-400'>{activeArt.accessionYear}</li>
      </ul>
    </div>
  )

  return (
    <section className='text-black w-full h-2/3 flex justify-center items-center'>
     {artFrame}
    </section>
  )
}
