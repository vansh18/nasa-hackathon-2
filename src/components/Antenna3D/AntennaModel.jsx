import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./AntennaModel.css";

const Model = () => {
  const gltf = useGLTF("/models/wood.glb", true);
  return <primitive object={gltf.scene} scale={1.5} />;
};

const AntennaModel = () => {
  return (
    <section className="model-section" id="antenna-model">
      <h2>Martian Antenna Array</h2>

      <div className="model-container">
        <Canvas camera={{ position: [0, 2, 4], fov: 45 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} />
          <Model />
          <OrbitControls />
        </Canvas>
      </div>
    </section>
  );
};

export default AntennaModel;
