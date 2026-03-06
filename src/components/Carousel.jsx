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

  return (
    <div>
    <section>

    </section>
    <section className='max-h-40 h-30 w-full border text-black absolute bottom-0 flex flex-row gap-2 overflow-x-scroll overflow-y-clip'>
      {galleryElements}
    </section>
    </div>
    
  )
}
