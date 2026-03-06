import React from 'react'
import { useState, useEffect } from 'react'

export default function () {

  const [galleryData, setGalleryData] = useState([])
  const [objectIds, setObjectIds] = useState()

  
  // const randomNumber = Math.floor(Math.random() * galleryData.length)

  useEffect(()=>{
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects')
      .then(res => res.json())
      .then(id => {
        const first100 = id.objectIDs.slice(0, 100)
        setObjectIds(first100)

        return Promise.all(
        first100.map(id=>(
          fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects${id}`)
          .then(res => res.json)
        ))
      )
      })

      .then(artworks => {
        const validImages = artworks.filter(a => a.primaryImage)
        setGalleryData(validImages)
        console.log(validImages)
      })
      
  }, [])


  const galleryElements = galleryData.map(data=>(
   <span key={data.objectID}>
      <img src={data.primaryImage} alt={data.title} />
      <h3>{data.title}</h3>
      <p>{data.artistDisplayName}</p>
    </span>
  ))

  return (
    <section className='carousel-container'>
      <div className='carousel-child'>
      {galleryElements}
      </div>
    </section>
  )
}
