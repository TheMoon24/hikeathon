import { useEffect, useState } from 'react'
import './App.css'
import MapComponent from './map_component'
import LandmarkMenu from './landmark_slider'
import Position  from './position'
import Hikeathon from './assets/hikeathon.png'
import Add_landmark from './add_landmark.jsx'
import ZoneButton from './add_zone.jsx'

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <img src={Hikeathon} className="Hikeathon" alt="Hikeathon" style={{ marginBottom: '20px' }} />
      <button onClick={openModal}>
        Open Landmark Slider
      </button>
      <LandmarkMenu />
      <MapComponent position={coords} zones={[(52, -1.5, 3, "Test zone")]} landmarks={[(52.001, -1.5, 1, "Test landmark")]}  style={{ marginBottom: '40px' }}/>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
      <Add_landmark style={{ marginRight: '20px' }} /> {/* Adjust margin to space between buttons */}
      <ZoneButton />
      </div>
    </>
  )
}

export default App
