import { useAnimations, useFBX } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import { DoubleSide, MeshStandardMaterial, type Mesh, type Object3D } from "three";
import type { Member, Seat } from "./team";

const modelHeight = 180.9;
const targetHeight = 1.52;
const modelScale = targetHeight / modelHeight;

export const labelAnchor = 178.3 * modelScale + 0.04;

export const seats: Record<Seat, { position: [number, number, number]; rotation: number }> = {
  north: { position: [0, 0, -2.05], rotation: 0 },
  south: { position: [0, 0, 2.05], rotation: Math.PI },
  west: { position: [-2.05, 0, 0], rotation: Math.PI / 2 },
  east: { position: [2.05, 0, 0], rotation: -Math.PI / 2 },
};

export function Worker({ member, index }: { member: Member; index: number }) {
  const seat = seats[member.seat];
  const source = useFBX("/fbx/human.fbx");
  const clips = useMemo(
    () => source.animations.filter((clip) => clip.duration > 0),
    [source],
  );
  const model = useMemo(() => prepareHuman(source, member.coat), [source, member.coat]);
  const { actions } = useAnimations(clips, model);
  const still = usePrefersStillness();

  useEffect(() => {
    const action = actions[clips[0]?.name];
    if (!action) return;
    action.reset().fadeIn(0.2).play();
    action.time = (index * clips[0].duration) / 4;
    action.paused = still;
    return () => {
      action.fadeOut(0.1);
    };
  }, [actions, clips, index, still]);

  return (
    <group position={seat.position} rotation={[0, seat.rotation, 0]}>
      <primitive object={model} scale={modelScale} position={[0, 0.01, 0]} />
      <Chair />
      <Laptop color={member.screen} />
    </group>
  );
}

function prepareHuman(source: Object3D, coat: string) {
  const model = cloneSkeleton(source);
  model.traverse((node) => {
    const mesh = node as Mesh;
    if (!mesh.isMesh) return;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    const joints = mesh.name === "Beta_Joints";
    mesh.material = new MeshStandardMaterial({
      color: joints ? "#c98474" : coat,
      roughness: joints ? 0.58 : 0.8,
      metalness: 0.02,
    });
  });
  return model;
}

function Chair() {
  return (
    <group position={[0, 0, -0.42]}>
      <mesh position={[0, 0.46, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.46, 0.06, 0.42]} />
        <meshStandardMaterial color="#7a4b32" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.74, -0.18]} castShadow>
        <boxGeometry args={[0.46, 0.5, 0.06]} />
        <meshStandardMaterial color="#6a3e2a" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Laptop({ color }: { color: string }) {
  return (
    <group position={[0, 0.84, 0.78]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.46, 0.03, 0.32]} />
        <meshStandardMaterial color="#d9c3a6" roughness={0.6} />
      </mesh>
      <group position={[0, 0.14, -0.12]} rotation={[0.55, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.44, 0.28, 0.02]} />
          <meshStandardMaterial color="#241c16" />
        </mesh>
        <mesh position={[0, 0, 0.014]}>
          <planeGeometry args={[0.36, 0.2]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.55}
            side={DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

function usePrefersStillness() {
  const [still, setStill] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return still;
}
