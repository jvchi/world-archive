import Header from "./components/header.jsx"
import Component from "./components/component.jsx"
import Footer from "./components/footer.jsx"
import Data from "./components/data.js"



export default function App(){
  const dataElement = Data.map(data=>{
    return <Component
    key= {data.id}
    {...data}
    />
  })
  return(
    <div className="component">
      <Header/>
      {dataElement}
      <Footer/>
    </div>
    
  )
}