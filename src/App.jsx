import Header from "./components/header.jsx"
import Art from "./components/art.jsx"
import Footer from "./components/footer.jsx"
import Data from "./components/data.js"
import Carousel from "./components/Carousel.jsx"



export default function App(){
  const dataElement = Data.map(data=>{
    return <Art
    key= {data.id}
    {...data}
    />
  })
  return(
    <div className="component">
      <Header/>
      {dataElement}
      <Carousel/>
      <Footer/>
    </div>
    
  )
}