import React from 'react'
import { useState, useEffect, useRef } from 'react'

export default function (props) {

  const [galleryData, setGalleryData] = useState([])
  const [objectIds, setObjectIds] = useState([])

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
      className='min-w-16 h-max border border-neutral-600'
      />
    </span>
  ))

  return (
    <div className='absolute bottom-0 left-0 right-0 h-max flex flex-col items-center'>

      <span className='w-max h-fit text-Eerie-black opacity-30  text-[8px] italic font-medium p-1 flex text-balance'> → scroll to see more...</span>

      <section className='w-full max-h-40 h-30 border border-neutral-200 text-black  flex flex-row gap-2 overflow-x-scroll overflow-y-clip scrollbar-hide'>
        {galleryElements}
      </section>

    </div>
    
  )
}
