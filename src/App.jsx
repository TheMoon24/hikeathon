import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapComponent from './map_component'
import LandmarkMenu from './landmark_slider'
function App() {
  const [count, setCount] = useState(0)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Viteee + React</h1>
      <div>
      <button onClick={openModal}>
        Open Landmark Slider
      </button>

      {/* Modal with the landmark slider */}
        <LandmarkMenu />
{/* implement modal which opens the landmark adder */}
      {/* Your map would go here */}
      <MapComponent />
    </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 100)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test like this??????
        </p>
      </div>
      <p className="read-the-docs">
        dont do that
      </p>
    </>
  )
}

export default App
