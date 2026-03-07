import Header from "./components/header.jsx"
import Art from "./components/art.jsx"
import Footer from "./components/footer.jsx"
import Data from "./components/data.js"
import Carousel from "./components/Carousel.jsx"
import Frame from "./components/Frame.jsx"
import { useState, useEffect} from 'react'


export default function App(){

  const [activeArt, setActiveArt] = useState(null)
  const [IDs, setIDs] = useState([])
  const [artDatas, setArtDatas] = useState([])
  const [width, setWidth] = useState(0)
  console.log(artDatas)


  console.log(artDatas.length)

  useEffect(() => {
  fetch('/api/public/collection/v1/search?q=painting&hasImages=true')
    .then(res => res.json())
    .then(async data => {
      const first1000 = data.objectIDs.slice(0, 1000)
      setIDs(first1000)

      const first30 = first1000.slice(0, 10)
      const rest = first1000.slice(10)

      const initialResults = await Promise.allSettled(
        first30.map(id =>
          fetch(`/api/public/collection/v1/objects/${id}`)
            .then(res => res.json())
        )
      )

      const initialArt = initialResults
        .filter(r => r.status === 'fulfilled')
        .map(r => r.value)
        .filter(a => a.primaryImage)

      setArtDatas(initialArt)

      // load rest in batches of 20 with a small delay between batches
      for (let i = 0; i < rest.length; i += 20) {
        const batch = rest.slice(i, i + 20)

        const results = await Promise.allSettled(
          batch.map(id =>
            fetch(`/api/public/collection/v1/objects/${id}`)
              .then(res => {
                if (!res.ok) throw new Error('blocked')
                return res.json()
              })
          )
        )

        const validBatch = results
          .filter(r => r.status === 'fulfilled')
          .map(r => r.value)
          .filter(a => a.primaryImage)

        if (validBatch.length > 0) {
          setArtDatas(prev => [...prev, ...validBatch])
        }

        // small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 50))
      }
    })
}, [])

  useEffect(() => {
    if (artDatas.length > 0 && !activeArt) {
      setActiveArt(artDatas[0])
    }
  }, [artDatas])
  
  return(
    <div className="component scale-75 origin-top sm:scale-100">
      <Header/>
      <Carousel artDatas={artDatas} activeArt={activeArt} setActiveArt={setActiveArt} />
      <Frame data={Data} activeArt={activeArt} IDs={IDs}/>
    </div>
    
  )
}