import React from 'react'
import { useState, useEffect } from 'react'

export default function () {

  const [galleryData, setGalleryData] = useState([
    // {id: 1, name: 'Van Gogh', imageURL: 'www.ancibac.cioom'},
    // {id: 2, name: 'Van Gogh', imageURL: 'www.ancibac.cioom'},
    // {id: 3, name: 'Van Gogh', imageURL: 'www.ancibac.cioom'},
    // {id: 4, name: 'Van Gogh', imageURL: 'www.ancibac.cioom'},
    // {id: 5, name: 'Van Gogh', imageURL: 'www.ancibac.cioom'},
  ])
  
  const randomNumber = Math.floor(Math.random() * galleryData.length)

  useEffect(()=>{
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomNumber}`)
      .then(res => res.json())
      .then(data => setGalleryData(prev =>({
        ...prev, ...data
      })))
  }, [])

  console.log(galleryData)

  const galleryElements = galleryData.map(data=>(
    <span>
      <img src={data.imageURL} alt={data.name} />
      <h3>{data.name}</h3>
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
