import { div } from 'motion/react-client';
import {useState, useEffect} from 'react'

export default function Frame(props) {

  const [datas, setDatas] = useState(props.data)
  const [Loaded, setLoaded] = useState(false)
  const [skeletonSize, setSkeletonSize] = useState({ height: 250, width: 200 })
  const randomIndex = Math.floor(Math.random() * datas.length)
  const data = datas[randomIndex];
  const activeArt = props.activeArt;
  const IDs = props.IDs

    useEffect(() => {
    setLoaded(false)
  }, [activeArt])

  //getting unique width and height
  useEffect(() => {
    const heights = [250, 150, 100, 200, 230]
    const widths = [200, 150, 250, 300, 100]
    setSkeletonSize({
      height: heights[Math.floor(Math.random() * heights.length)],
      width: widths[Math.floor(Math.random() * widths.length)]
    })
    setLoaded(false)
  }, [activeArt])

  const artFrame = activeArt && data && (
    <div 
    key={activeArt.objectID}
    className='w-full h-max max-h-[400px] mx-auto flex flex-col justify-center items-center'
    >

      <div className='relative max-w-[300px] w-full h-[250px]'>
        <div className='w-full h-full absolute inset-0 flex justify-center items-center'>
          {!Loaded && (
          <div 
          style={{ height: `${skeletonSize.height}px`, width: `${skeletonSize.width}px` }}
          className={` bg-neutral-200 animate-pulse `} />
        )}
        </div>
      <img 
          src={activeArt.primaryImage} 
          alt={activeArt.title}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-contain  ${Loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      <ul className='max-w-[300px] h-full flex flex-col justify-center place-content-center items-center text-[14px] text-outer-space pt-1 text-center'>
        <li className='font-medium text-[12px]  '>{activeArt.title}</li>
        <li className='text-[10px] text-neutral-500'>{activeArt.
artistDisplayName
}</li>
        <li className='text-[8px] italic text-neutral-400'>{activeArt.accessionYear}</li>
      </ul>
    </div>
  )

  return (
    <section className='text-black w-full h-2/3 flex justify-center items-center'>
     {artFrame}
    </section>
  )
}
