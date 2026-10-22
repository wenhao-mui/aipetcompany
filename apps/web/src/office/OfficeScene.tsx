import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import { Vector3 } from "three";
import { Room } from "./Room";
import { team } from "./team";
import { labelAnchor, seats, Worker } from "./Worker";

const aim: [number, number, number] = [0, 0.7, 0];

function AimCamera() {
  const camera = useThree((state) => state.camera);

  useLayoutEffect(() => {
    camera.lookAt(...aim);
    camera.updateProjectionMatrix();
  }, [camera]);

  return (
    <OrbitControls
      makeDefault
      target={aim}
      enableRotate={false}
      enablePan
      minZoom={36}
      maxZoom={140}
    />
  );
}

function Nameplates({
  labels,
}: {
  labels: RefObject<(HTMLParagraphElement | null)[]>;
}) {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const point = useMemo(() => new Vector3(), []);

  useFrame(() => {
    team.forEach((member, index) => {
      const label = labels.current?.[index];
      if (!label) return;
      const seat = seats[member.seat];
      point
        .set(
          seat.position[0] + Math.sin(seat.rotation) * 0.05,
          labelAnchor,
          seat.position[2] + Math.cos(seat.rotation) * 0.05,
        )
        .project(camera);
      const x = (point.x * 0.5 + 0.5) * size.width;
      const y = (-point.y * 0.5 + 0.5) * size.height;
      label.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`;
    });
  });

  return null;
}

export function OfficeScene() {
  const labels = useRef<(HTMLParagraphElement | null)[]>([]);

  return (
    <div className="room-frame">
      <Canvas
        orthographic
        dpr={[1, 1.75]}
        camera={{ position: [8, 7.5, 8], zoom: 90, near: -40, far: 80 }}
        gl={{ antialias: true }}
        onCreated={({ camera }) => {
          camera.lookAt(...aim);
        }}
      >
        <color attach="background" args={["#f4eee6"]} />
        <hemisphereLight args={["#fff6ea", "#c4a574", 0.95]} />
        <directionalLight position={[6, 10, 5]} intensity={1.45} />
        <directionalLight position={[-5, 6, -3]} intensity={0.35} />
        <Room />
        <Suspense fallback={null}>
          {team.map((member, index) => (
            <Worker key={member.role} member={member} index={index} />
          ))}
        </Suspense>
        <ContactShadows position={[0, 0.001, 0]} opacity={0.38} scale={14} blur={2.2} far={4} />
        <AimCamera />
        <Nameplates labels={labels} />
      </Canvas>
      {team.map((member, index) => (
        <p
          key={member.role}
          ref={(node) => {
            labels.current[index] = node;
          }}
          className="nameplate"
        >
          <span className="role">{member.role}</span>
          <span className="who">{member.name}</span>
          <span className="task">{member.task}</span>
        </p>
      ))}
      <ul className="sr-only">
        {team.map((member) => (
          <li key={member.role}>
            {member.role} {member.name} is working on {member.task}
          </li>
        ))}
      </ul>
    </div>
  );
}
