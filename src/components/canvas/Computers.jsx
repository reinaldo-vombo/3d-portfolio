import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';

const Computers = ({ props, isMobile }) => {
  const mesh = useRef();
  // Subscribe this component to the render-loop, rotate the mesh every frame
  const computer = useGLTF('../desktop_pc/scene.gltf');
  return (
    <mesh {...props} ref={mesh}>
      <hemisphereLight intensity={0.15} groundColor='black'>
        <hemisphereLight intensity={0.15} groundColor='black' />
        <pointLight intensity={1} />
        <spotLight
          position={[-20, 50, 10]}
          angle={0.12}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={1024}
        />
        <primitive
          object={computer.scene}
          scale={isMobile ? 0.7 : 0.75}
          position={isMobile ? [0, -3, -2.2] : [0, -4.9, -1.5]}
          rotation={[-0.01, -0.2, -0.1]}
        />
      </hemisphereLight>
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('max-width: 500');

    // Add a listener for changes to the screen size
    setIsMobile(mediaQuery.matches);

    // Add a listener for changes to the screen size
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matchMedia);
    };

    // Add a listener for changes to the screen size
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);
  return (
    <Canvas
      frameloop='demand'
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
