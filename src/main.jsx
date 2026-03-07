
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { div } from 'motion/react-client'

createRoot(document.getElementById('root')).render(
    <div className='w-[100%] h-min-screen flex justify-center overscroll-none'>
         <App />
    </div>
)
