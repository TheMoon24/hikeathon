import { useEffect, useState } from 'react';
import './App.css';
import MapComponent from './map_component';
import LandmarkMenu from './landmark_slider';
import Position from './position';
import Hikeathon from './assets/hikeathon.png';
import AddLandmark from './add_landmark.jsx';
//import ZoneButton from './add_zone.jsx';
import Badges from './Badges'

function App() {
  const [coords, setCoords] = useState({ latitude: null, longitude: null, error: null });
  const [activeTab, setActiveTab] = useState('map'); // New state for active tab
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
    <div className="App">
      <img src={Hikeathon} className="Hikeathon" alt="Hikeathon" style={{ marginBottom: '20px' }} />

      {/* Tab Navigation */}
      <div className="tabs">
        <button onClick={() => setActiveTab('map')} className={activeTab === 'map' ? 'active' : ''}>
          Map
        </button>
        <button onClick={() => setActiveTab('landmarks')} className={activeTab === 'landmarks' ? 'active' : ''}>
          Landmarks
        </button>
        <button onClick={() => setActiveTab('badges')} className={activeTab === 'badges' ? 'active' : ''}>
          Zones
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'map' && (
          <>
            <button onClick={openModal}>
              Open Landmark Slider
            </button>
            <MapComponent
              position={coords}
              zones={[(52, -1.5, 3, "Test zone")]}
              landmarks={[(52.001, -1.5, 1, "Test landmark")]}
              style={{ marginBottom: '40px' }}
            />
          </>
        )}

        {activeTab === 'landmarks' && (
          <>
            <LandmarkMenu />
            <AddLandmark style={{ marginRight: '20px' }} />
          </>
        )}

        {activeTab === 'badges' && (
          <>
            <Badges />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
