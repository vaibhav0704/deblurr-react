import { useState } from 'react'
import './App.css'
import ImageUploader from './ImageUploader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <ImageUploader />
    </> 
  )
}

export default App
