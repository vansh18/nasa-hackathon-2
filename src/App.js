import './App.css';
import Navbar from './components/Navbar/Navbar';
import FlipBook from './components/FlipBook/FlipBook';
import FloatingParts from './components/FloatingParts/FloatingParts';
import DragDrop from './components/DragDrop/DragDrop'
import AntennaCoverage from './components/AntennaCoverage/AntennaCoverage';
import AntennaModel from './components/Antenna3D/AntennaModel';
import CircularFlowPage from './components/CircularModel/CircularFlowPage';
import Sustainability from './components/Sustainability/Sustainability';
// import Stats from './components/Stats/Statistics';
import Team from './components/Team/TeamProfile';

function App() {
  return (
    <div className='app-parent'>
      <Navbar />
      <FlipBook />
      <CircularFlowPage />
      <Sustainability />
      <AntennaModel />
      <FloatingParts />
      <DragDrop />
      <AntennaCoverage />
      {/* <Stats /> */}
      <Team />

      

    </div>
  )
}

export default App;
