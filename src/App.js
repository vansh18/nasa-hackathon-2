import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import FlipBook from './components/FlipBook/FlipBook';
import FloatingParts from './components/FloatingParts/FloatingParts';
import DragDrop from './components/DragDrop/DragDrop'
import AntennaCoverage from './components/AntennaCoverage/AntennaCoverage';
import AntennaModel from './components/Antenna3D/AntennaModel';
import CircularFlowPage from './components/CircularModel/CircularFlowPage';
// import ExpandedContent from "./components/CircularModel/ExpandedContent";
import Sustainability from './components/Sustainability/Sustainability';

function App() {
  return (
    <div className='app-parent'>
      <Navbar />
      <FlipBook />
      <CircularFlowPage />
      <Sustainability />
      {/* <ExpandedContent /> */}
      <AntennaModel />
      <FloatingParts />
      <DragDrop />
      <AntennaCoverage />
      

    </div>
  )
}

export default App;
