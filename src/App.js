import './App.css';
import Navbar from './components/Navbar/Navbar';
import FlipBook from './components/FlipBook/FlipBook';
import FloatingParts from './components/FloatingParts/FloatingParts';
import DragDrop from './components/DragDrop/DragDrop'
import AntennaCoverage from './components/AntennaCoverage/AntennaCoverage';
import AntennaModel from './components/Antenna3D/AntennaModel';

function App() {
  return (
    <div className='app-parent'>
      <Navbar />
      <FlipBook />
      <AntennaModel />
      <FloatingParts />
      <DragDrop />
      <AntennaCoverage />
      

    </div>
  )
}

export default App;
