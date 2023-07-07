import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";

const ThreeDClock = () => {
  const hourHand = useRef();
  const minuteHand = useRef();
  const secondHand = useRef();



  useFrame(() => {
    const date = new Date();
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Rotate the clock hands
    // hourHand.current.rotation.z = (Math.PI / 6) * (hours + minutes / 60);
    // minuteHand.current.rotation.z = (Math.PI / 30) * (minutes + seconds / 60);
    // secondHand.current.rotation.z = (Math.PI / 30) * seconds;
  });

  return (
    <>
      {/* <mesh geometry={earthGeometry} material={earthMaterial} /> */}
      {/* <mesh>
        <cylinderGeometry attach="geometry" args={[0.05, 0.1, 1, 32]} />
        <meshStandardMaterial attach="material" color="black" />
      </mesh> */}

      <mesh ref={hourHand}>
        <Box attach="geometry" args={[0.02, 0.4, 0.02]} />
        <meshStandardMaterial attach="material" color="red" />
      </mesh>

      <mesh ref={minuteHand}>
        <Box attach="geometry" args={[0.02, 0.6, 0.02]} />
        <meshStandardMaterial attach="material" color="blue" />
      </mesh>

      <mesh ref={secondHand}>
        <Box attach="geometry" args={[0.01, 0.8, 0.01]} />
        <meshStandardMaterial attach="material" color="green" />
      </mesh>
      
    </>
  );
};

export default ThreeDClock;
