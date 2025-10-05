import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Bounds } from "@react-three/drei";
import "./AntennaModel.css";

const Model = () => {
  const gltf = useGLTF("/models/wood.glb", true);
  return (
    <group position={[0, -0.5, 0]} scale={0.8}>
      <primitive object={gltf.scene} />
    </group>
  );
};

const AntennaModel = () => {
  return (
    <section className="model-section" id="antenna-model">
      <h2>Martian Antenna Array</h2>

      <div className="model-container">
        <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} />
          <Bounds fit clip observe margin={1.2}>
            <Model />
          </Bounds>
          <OrbitControls />
        </Canvas>
      </div>
    </section>
  );
};

export default AntennaModel;
