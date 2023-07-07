import React from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";

function WorkdClock() {
  const starGeometry = new THREE.SphereGeometry(80, 64, 64);

  const starMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../texture/galaxy1.png"),
    side: THREE.BackSide,
    transparent: true,
  });
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh geometry={starGeometry} material={starMaterial} />
    </Canvas>
  );
}

export default WorkdClock;
