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
  console.log(artDatas)

  console.log(artDatas.length)

  useEffect(()=>{
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?q=painting&hasImages=true')
      .then(res => res.json())
      .then(data => {
        const first50 = data.objectIDs.slice(0, 50)
        setIDs(first50)

        return Promise.allSettled(
          first50.map(objectId =>
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)
              .then(res => res.json())
          )
        )
      })

      .then(result =>{
        const artData = result
          .filter(r => r.status === 'fulfilled')
          .map(r => r.value)
        
        //make sure art with actual images are filtered
        const validImages = artData.filter(a => a.primaryImage)
        setArtDatas(validImages)
      })

  }, [])

    useEffect(() => {
    if (artDatas.length > 0) {
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