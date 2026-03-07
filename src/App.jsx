import Header from "./components/header.jsx"
import Art from "./components/art.jsx"
import Footer from "./components/footer.jsx"
import Data from "./components/data.js"
import Carousel from "./components/Carousel.jsx"
import Frame from "./components/Frame.jsx"


export default function App(){
  
  return(
    <div className="component">
      <Header/>
      <Carousel />
      <Frame data={Data}/>
      {/* <Footer/> */}
    </div>
    
  )
}