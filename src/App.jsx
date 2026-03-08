import Header from "./components/header.jsx"
import Data from "./components/data.js"
import Carousel from "./components/Carousel.jsx"
import Frame from "./components/Frame.jsx"
import { useState, useEffect} from 'react'

export default function App(){

  const [activeArt, setActiveArt] = useState(null)
  const [IDs, setIDs] = useState([])
  const [artDatas, setArtDatas] = useState([])

  useEffect(() => {
    const fetchPage = async (page) => {
      const res = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${page}&limit=100&fields=id,title,artist_display,image_id,date_display`
      )
      const data = await res.json()
      return data.data
        .filter(a => a.image_id)
        .map(a => ({
          objectID: a.id,
          title: a.title,
          artistDisplayName: a.artist_display,
          objectDate: a.date_display,
          primaryImageSmall: `https://www.artic.edu/iiif/2/${a.image_id}/full/400,/0/default.jpg`,
          primaryImage: `https://www.artic.edu/iiif/2/${a.image_id}/full/843,/0/default.jpg`
        }))
    }

    const loadArt = async () => {
      // load first 100 immediately
      const firstPage = await fetchPage(1)
      setArtDatas(firstPage)
      setIDs(firstPage.map(a => a.objectID))

      // load pages 2-10 in the background
      for (let page = 2; page <= 10; page++) {
        const moreart = await fetchPage(page)
        setArtDatas(prev => [...prev, ...moreart])
      }
    }

    loadArt()
  }, [])

  useEffect(() => {
    if (artDatas.length > 0 && !activeArt) {
      setActiveArt(artDatas[0])
    }
  }, [artDatas])
  
  return(
    <div className="component">
      <Header/>
      <Carousel artDatas={artDatas} activeArt={activeArt} setActiveArt={setActiveArt} />
      <Frame data={Data} activeArt={activeArt} IDs={IDs}/>
    </div>
  )
}