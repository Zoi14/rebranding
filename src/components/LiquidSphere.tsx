"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function AnimatedBlob() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const { viewport } = useThree();

    // Responsive scale logic
    // Αν το viewport width είναι μικρό (mobile), μικραίνουμε τη σφαίρα.
    // Στο desktop (μεγάλο width) τη μεγαλώνουμε.
    const isMobile = viewport.width < 5;
    const scale = isMobile ? 1.5 : 2.4;

    useFrame(({ mouse }) => {
        if (!meshRef.current) return;
        // Κίνηση με το ποντίκι
        const targetX = mouse.x * 1.5;
        const targetY = mouse.y * 1.5;

        // Smooth animation
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.1);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY, 0.1);
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere ref={meshRef} args={[1, 128, 128]} scale={scale}>
                <MeshDistortMaterial
                    color="#1e1b4b" // Πολύ σκούρο μπλε/μαύρο
                    attach="material"
                    distort={0.5} // Πόσο "υγρό" φαίνεται
                    speed={2} // Ταχύτητα κίνησης
                    roughness={0.2}
                    metalness={0.9}
                />
            </Sphere>
        </Float>
    );
}

export default function LiquidSphere() {
    return (
        <div className="absolute inset-0 w-full h-full z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#60A5FA" />
                <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#A78BFA" />
                <AnimatedBlob />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}