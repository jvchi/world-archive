import React from 'react'
import { useState, useEffect } from 'react'

export default function () {

  const [galleryData, setGalleryData] = useState([])
  const [objectIds, setObjectIds] = useState([])
  const number = false;

  useEffect(()=>{
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?q=painting&hasImages=true')
      .then(res => res.json())
      .then(id => {
        const first20 = (id.objectIDs || []).slice(0, 20)
        setObjectIds(first20)

        return Promise.allSettled(
          first20.map(objectId =>
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)
              .then(res => res.json())
          )
        )
      }, [])

      .then(results => {
        const artworks = results
          .filter(r => r.status === "fulfilled")
          .map(r => r.value)

        const validImages = artworks.filter(a => a.primaryImage)
        setGalleryData(validImages)
        console.log(validImages)
      })
      
  }, [])

  const galleryElements = galleryData.map(data=>(
   <span 
   key={data.objectID}
   className='w-max h-full bg-neutral-100'
   >
      <img 
      src={data.primaryImage} 
      alt={data.title} 
      className='min-w-16 h-max border'
      />
      {/* <h3>{data.title}</h3>
      <p>{data.artistDisplayName}</p> */}
    </span>
  ))

  const mainFrame = galleryData[0] && (
     <div className='bg-green-500 h-max w-max flex flex-col justify-center items-cente'>
        <img 
        key=''
        src={galleryData[0].primaryImage} 
        alt={galleryData[0].title} 
        className='max-w-[300px] min-w-[200px] h-fit'
        />
       <ul className=''>
        <li>Vincent</li>
        <li>{galleryData[0].title}</li>
        <li>1984</li>
        <li>museum of art</li>
       </ul>
      </div>
  )

  return (
    <div>
    <section className='w-full h-max min-h-[400px] px-8 flex justify-center items-center'>
      {mainFrame}
    </section>
    <section className='max-h-40 h-30 w-full border text-black absolute bottom-0 flex flex-row gap-2 overflow-x-scroll overflow-y-clip'>
      {galleryElements}
    </section>
    </div>
    
  )
}
