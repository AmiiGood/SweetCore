import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function OptimizedGPUModel({ ...props }) {
  const group = useRef();
  const [modelLoaded, setModelLoaded] = useState(false);

  const { scene } = useGLTF("/models/gpu.glb", true);

  useEffect(() => {
    if (scene) {
      console.log("Modelo cargado y optimizado");
      setModelLoaded(true);

      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false;
          child.receiveShadow = false;
          if (child.material) {
            child.material.envMapIntensity = 0.8;
            child.material.roughness = Math.max(
              child.material.roughness * 0.8,
              0.1
            );
            child.material.metalness = Math.min(
              child.material.metalness * 1.2,
              1
            );
            child.material.needsUpdate = true;
          }
        }
      });

      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);
    }
  }, [scene]);

  useFrame((state) => {
    if (group.current && modelLoaded) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  if (!modelLoaded || !scene) {
    return null;
  }

  return (
    <group ref={group} {...props}>
      <primitive
        object={scene.clone()}
        scale={window.innerWidth < 768 ? [0.08, 0.08, 0.08] : [0.1, 0.1, 0.1]}
        position={[0, 0, 0]}
        rotation={[0.1, 0.1, 0.2]}
      />
    </group>
  );
}

function SimpleLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/95 z-10">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
        <p className="mt-3 text-sm text-gray-600">Cargando GPU...</p>
      </div>
    </div>
  );
}

const GPUVisual3D = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="flex justify-center items-center relative">
      <motion.div
        className="w-full max-w-2xl h-[400px] sm:h-[450px] lg:h-[500px] relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        {loading && <SimpleLoader />}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/95 z-10">
            <p className="text-gray-500 text-sm">Error cargando modelo 3D</p>
          </div>
        )}

        <Canvas
          camera={{
            position: [0, 0.5, 2.5],
            fov: window.innerWidth < 768 ? 35 : 30,
          }}
          dpr={[1, Math.min(window.devicePixelRatio, 2)]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          onCreated={() => {
            setTimeout(() => setLoading(false), 800);
          }}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 10]}
            intensity={1.2}
            castShadow={false}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-5, 3, 5]} intensity={0.6} color="#00d4ff" />
          <pointLight position={[5, -2, -3]} intensity={0.4} color="#ff6b35" />
          <spotLight
            position={[0, 8, 0]}
            angle={0.3}
            penumbra={0.5}
            intensity={0.5}
            color="#ffffff"
          />

          <Suspense fallback={null}>
            <OptimizedGPUModel />

            <Environment
              preset="studio"
              background={false}
              blur={0.3}
              intensity={0.8}
            />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate={false}
            enableDamping={false}
            target={[0, 0, 0]}
          />
        </Canvas>

        <motion.div
          className="absolute top-8 sm:top-16 left-4 sm:left-8 bg-white/95 backdrop-blur-sm border-0 rounded-lg px-2 sm:px-3 py-2 sm:py-2.5 shadow-lg text-xs z-20"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0 }}
        >
          <div className="font-bold text-gray-900 mb-1 text-xs sm:text-sm">
            Memoria
          </div>
          <div className="font-semibold text-blue-600 text-xs sm:text-sm">
            32GB VRAM
          </div>
          <div className="text-gray-600 text-xs">GDDR7</div>
        </motion.div>

        <motion.div
          className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border-0 rounded-lg px-2 sm:px-3 py-2 sm:py-2.5 shadow-lg text-xs z-20"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1.3 }}
        >
          <div className="font-bold text-gray-900 mb-1 text-xs sm:text-sm">
            Frecuencia
          </div>
          <div className="font-semibold text-green-600 text-xs sm:text-sm">
            2.01 GHz
          </div>
          <div className="text-gray-600 text-xs">Boost Clock</div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 sm:bottom-16 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm border-0 rounded-lg px-2 sm:px-3 py-2 sm:py-2.5 shadow-lg text-xs z-20"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2.6 }}
        >
          <div className="font-bold text-gray-900 mb-1 text-xs sm:text-sm">
            Arquitectura
          </div>
          <div className="font-semibold text-gray-950-600 text-xs sm:text-sm">
            Blackwell
          </div>
          <div className="text-gray-600 text-xs">5nm TSMC</div>
        </motion.div>
      </motion.div>
    </div>
  );
};

useGLTF.preload("/models/gpu.glb");

export default GPUVisual3D;
