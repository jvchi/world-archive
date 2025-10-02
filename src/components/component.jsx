
export default function Component(props){
  return (
    <>
    <div className="component-holder">
      <article className="details-component">

      <div className="image-frame">
        <img src={props.img} alt="painting"/>
      </div>
      <div>

        <ul>
          <li className="Artist"><span>Artist</span>{props.artist}</li>
          <li className="Title"><span>Title</span>{props.title}</li>
          <li className="Date"><span>Date</span>{props.date}</li>
          <li className="link"><a href="https://unsplash.com/@artchicago" className="link-rel">Art Institute of Chicago</a></li>
        </ul>
        
      </div>
    </article>
    </div>
    
    
    </>
  )
}