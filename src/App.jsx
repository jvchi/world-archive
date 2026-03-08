import Header from "./components/header.jsx"
import Data from "./components/data.js"
import Carousel from "./components/Carousel.jsx"
import Frame from "./components/Frame.jsx"
import { useState, useEffect, useRef } from 'react'

const PAGE_LIMIT = 20       // max pages to fetch (8 × 100 = ~800 artworks)
const BATCH_SIZE = 3       // accumulate this many pages before updating state

export default function App() {
  const [activeArt, setActiveArt] = useState(null)
  const [IDs, setIDs] = useState([])
  const [artDatas, setArtDatas] = useState([])
  const abortRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    abortRef.current = controller
    const { signal } = controller

    const fetchPage = async (page) => {
      const res = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${page}&limit=100&fields=id,title,artist_display,image_id,date_display`,
        { signal }
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
      try {
        // Fetch page 1 first so UI is populated immediately
        const { artworks: firstPage, totalPages } = await fetchPage(1)
        if (signal.aborted) return

        setArtDatas(firstPage)
        setIDs(firstPage.map(a => a.objectID))

        // Cap how many additional pages we'll ever load
        const remainingPages = Math.min(totalPages - 1, PAGE_LIMIT - 1)
        const allPages = Array.from({ length: remainingPages }, (_, i) => i + 2)
        const shuffledPages = allPages.sort(() => Math.random() - 0.5)

        // Fetch remaining pages in batches to reduce re-renders
        let batch = []
        for (const page of shuffledPages) {
          if (signal.aborted) return

          const { artworks } = await fetchPage(page)
          batch.push(...artworks)

          if (batch.length >= BATCH_SIZE * 100) {
            const committed = [...batch]
            batch = []
            setArtDatas(prev => [...prev, ...committed])
            setIDs(prev => [...prev, ...committed.map(a => a.objectID)])
          }
        }

        // Flush any remaining items in the last partial batch
        if (!signal.aborted && batch.length > 0) {
          setArtDatas(prev => [...prev, ...batch])
          setIDs(prev => [...prev, ...batch.map(a => a.objectID)])
        }

      } catch (err) {
        if (err.name !== 'AbortError') console.error('Failed to load art:', err)
      }
    }

    loadArt()

    // Cleanup: abort all in-flight fetches when component unmounts
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (artDatas.length > 0 && !activeArt) {
      setActiveArt(artDatas[0])
    }
  }, [artDatas])

  return (
    <div className="component scale-75 sm:scale-100">
      <Header />
      <Carousel artDatas={artDatas} activeArt={activeArt} setActiveArt={setActiveArt} />
      <Frame data={Data} activeArt={activeArt} IDs={IDs} />
    </div>
  )
}