import { motion } from "motion/react"
import { useRef, useState, useEffect } from "react"

const GalleryItem = ({ data, setActiveArt, setCursorPosition, isActive }) => {
  const [skeletonHeight] = useState(() => {
    const heights = ['h-16', 'h-20', 'h-24', 'h-10', 'h-28']
    return heights[Math.floor(Math.random() * heights.length)]
  })
  const [onLoad, setOnLoad] = useState(false)
  const ref = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    if (isActive && ref.current) {
      const { width } = ref.current.getBoundingClientRect()
      setCursorPosition({ left: ref.current.offsetLeft, width, opacity: 1 })
    }
  }, [isActive])

  return (
    <span
      ref={ref}
      onClick={() => {
        if (!ref?.current) return
        const { width } = ref.current.getBoundingClientRect()
        setCursorPosition({ left: ref.current.offsetLeft, width, opacity: 1 })
        setActiveArt(data)
      }}
      className='relative w-max h-full flex flex-col cursor-pointer'
    >
      <img
        ref={imgRef}
        src={data.primaryImageSmall}
        alt={data.title}
        className={`min-w-16 h-max bg-neutral-200 z-10 ${onLoad ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={() => setOnLoad(true)}
      />
      {!onLoad && <div className={`w-16 ${skeletonHeight} bg-neutral-200 absolute`}></div>}
    </span>
  )
}

const Cursor = ({ position }) => {
  return (
    <motion.span
      animate={{ ...position }}
      className="min-w-16 absolute bottom-0 top-0 z-0 bg-blue opacity-400"
    />
  )
}

export default function Carousel(props) {
  const activeArt = props.activeArt
  const setActiveArt = props.setActiveArt
  const [cursorPosition, setCursorPosition] = useState({ left: 0, width: 0, opacity: 0 })

  const galleryElements = props.artDatas.map(data => (
    <GalleryItem
      key={data.objectID}
      data={data}
      setActiveArt={setActiveArt}
      setCursorPosition={setCursorPosition}
      isActive={data.objectID === activeArt?.objectID}
    />
  ))

  return (
    <div className='absolute bottom-0 left-0 right-0 h-max flex flex-col items-center'>
      <span className='w-max h-fit text-Eerie-black opacity-30 text-[8px] italic font-medium p-1 flex'> → scroll to see more...</span>
      <section className='relative w-full max-h-40 h-30 border border-neutral-200 text-black flex flex-row gap-2 overflow-x-scroll overflow-y-clip scrollbar-hide'>
        {galleryElements}
        <Cursor position={cursorPosition} />
      </section>
    </div>
  )
}