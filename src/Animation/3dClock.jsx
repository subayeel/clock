import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";

const ThreeDClock = (props) => {
  const hourHand = useRef();
  const minuteHand = useRef();
  const secondHand = useRef();

  useFrame(() => {
    const date = new Date();
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // // Rotate the clock hands
    // hourHand.current.rotation.z = (Math.PI / 6) * (hours + minutes / 60);
    // minuteHand.current.rotation.z = (Math.PI / 30) * (minutes + seconds / 60);
    // secondHand.current.rotation.z = (Math.PI / 30) * seconds;
  });

  return (
    <mesh {...props} scale={1}>
      {/* <mesh geometry={earthGeometry} material={earthMaterial} /> */}
      <mesh>
        <cylinderGeometry  args={[0.05, 0.1, 1, 32]} />
        <meshStandardMaterial wireframe={props.wireframe} attach="material" color="black"/>
      </mesh>

      <mesh ref={hourHand}>
        <Box  args={[0.02, 0.4, 0.02]} />
        <meshStandardMaterial wireframe={props.wireframe} />
      </mesh>

      <mesh ref={minuteHand}>
        <Box  args={[0.02, 0.6, 0.02]} />
        <meshStandardMaterial wireframe={props.wireframe} />
      </mesh>

      <mesh ref={secondHand}>
        <Box  args={[0.01, 0.8, 0.01]} />
        <meshStandardMaterial wireframe={props.wireframe} />
      </mesh>
    </mesh>
  );
};

export default ThreeDClock;
