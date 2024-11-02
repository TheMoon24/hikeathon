import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapComponent from './map_component'
import Position  from './position'

function App() {
  const [count, setCount] = useState(0)
  const [coords, setCoords] = useState({ latitude: null, longitude: null, error: null });
  const position = new Position();

  useEffect(() => {
    position.getCoords()
      .then(({ latitude, longitude }) => {
        setCoords({ latitude, longitude, error: null });
      })
      .catch((error) => {
        setCoords({ latitude: null, longitude: null, error });
      });
  }, []);

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
      <MapComponent />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h1>Position Coordinates</h1>
        {(
          <div>
            <p>Latitude: {coords.latitude}</p>
            <p>Longitude: {coords.longitude}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default App
