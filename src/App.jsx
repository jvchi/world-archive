import Header from "./components/header.jsx"
import Component from "./components/component.jsx"
import Footer from "./components/footer.jsx"
import mountedMan from "/src/assets/mounted-officer.jpg"
import interioDesign from "/src/assets/interior-place.jpg"
import afternoon from "/src/assets/afternoon.jpg"
import mockedJesus from "/src/assets/mocked-Jesus.jpg"
import ladyFilmer from "/src/assets/lady-filmer.jpg"
import Hurricane from "/src/assets/hurricane.jpg"


export default function App(){
  return(
    <div className="component">

        <Header/>
        <Component 
        img={mountedMan}
        artist= "Jean Baptiste Édouard Detaille"
        title= "A Mounted Officer Place France"
        date="1877"
        />
        <Component
        img={ladyFilmer}
        artist="Mary Georgiana Caroline"
        title="Lady Filmer in her Drawing Room"
        date="1863–1868"
        />
        <Component 
        img={interioDesign}
        artist="Artist Charles Gifford Dyer"
        title="Seventeenth Century Interior Place Munich"
        date="1877"
        />
        <Component
        img={afternoon}
        artist="Jean-François Rafaëlli"
        title="Afternoon Tea"
        date="1875–1885"
        />
        <Component
        img={mockedJesus}
        artist="Édouard Manet"
        title="Jesus Mocked by the Soldiers"
        date="1865"
        />
        
        <Component
        img={Hurricane}
        artist="Unknown artist"
        title=" West India Hurricane"
        date="1802–1899"
        />
        <Footer/>


    </div>
    
  )
}