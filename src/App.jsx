import Header from "./components/header.jsx"
import Data from "./components/data.js"
import Carousel from "./components/Carousel.jsx"
import Frame from "./components/Frame.jsx"
import { useState, useEffect} from 'react'

export default function App(){

  const [activeArt, setActiveArt] = useState(null)
  const [IDs, setIDs] = useState([])
  const [artDatas, setArtDatas] = useState([])
  console.log(artDatas)

  useEffect(() => {
  const fetchPage = async (page) => {
    const res = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=${page}&limit=100&fields=id,title,artist_display,image_id,date_display`
    )
    const data = await res.json()

    if (!data.data) return { artworks: [], totalPages: 0 }

    const artworks = data.data
      .filter(a => a.image_id)
      .map(a => ({
        objectID: a.id,
        title: a.title,
        artistDisplayName: a.artist_display,
        objectDate: a.date_display,
        primaryImageSmall: `https://www.artic.edu/iiif/2/${a.image_id}/full/400,/0/default.jpg`,
        primaryImage: `https://www.artic.edu/iiif/2/${a.image_id}/full/843,/0/default.jpg`
      }))

    const totalPages = Math.ceil(data.pagination.total / 100)
    return { artworks, totalPages }
  }

  const loadArt = async () => {
    // fetch page 1 to get total pages
    const { artworks: firstPage, totalPages } = await fetchPage(1)
    setArtDatas(firstPage)
    setIDs(firstPage.map(a => a.objectID))

    // build a shuffled list of all remaining pages
    const allPages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2)
    const shuffledPages = allPages.sort(() => Math.random() - 0.5)

    for (const page of shuffledPages) {
      const { artworks } = await fetchPage(page)
      if (artworks.length > 0) {
        setArtDatas(prev => [...prev, ...artworks])
      }
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
    <div className="component scale-75 sm:scale-100">
      <Header/>
      <Carousel artDatas={artDatas} activeArt={activeArt} setActiveArt={setActiveArt} />
      <Frame data={Data} activeArt={activeArt} IDs={IDs}/>
    </div>
  )
}