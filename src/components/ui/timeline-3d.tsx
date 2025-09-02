"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import type * as THREE from "three";
import { type CareerEvent } from "@prisma/client";

interface Timeline3DProps {
  events: CareerEvent[];
}

const EventNode = ({
  event,
  position,
}: {
  event: CareerEvent;
  position: [number, number, number];
}) => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color="purple"
          emissive="purple"
          emissiveIntensity={2}
        />
      </mesh>
      <Text
        position={[0, 0.5, 0]}
        color="white"
        fontSize={0.2}
        maxWidth={2}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {event.title}
      </Text>
    </group>
  );
};

export const Timeline3D = ({ events }: Timeline3DProps) => {
  if (events.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-muted-foreground">
          No events to display on the 3D timeline.
        </p>
      </div>
    );
  }

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );
  // Use optional chaining and fallback values to avoid undefined errors
  const firstEventDate = new Date(sortedEvents[0]?.startDate ?? 0).getTime();
  const lastEventDate = new Date(
    sortedEvents[sortedEvents.length - 1]?.startDate ?? 0,
  ).getTime();
  const timeSpan = sortedEvents.length > 1 ? lastEventDate - firstEventDate : 1;

  return (
    <div className="h-[70vh] w-full">
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <gridHelper args={[50, 50, "#555", "#222"]} />

        {sortedEvents.map((event, index) => {
          const eventDate = new Date(event.startDate).getTime();
          const progress = (eventDate - firstEventDate) / timeSpan;
          const x = ((index % 5) - 2) * 4;
          const z = -progress * 20;
          const y = Math.sin(progress * Math.PI * 2) * 2;
          return (
            <EventNode key={event.id} event={event} position={[x, y, z]} />
          );
        })}

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
};
