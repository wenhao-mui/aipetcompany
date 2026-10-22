export function Room() {
  return (
    <group>
      <mesh position={[0, -0.14, 0]} receiveShadow>
        <boxGeometry args={[10.8, 0.28, 8.8]} />
        <meshStandardMaterial color="#d7b48a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.7, 40]} />
        <meshStandardMaterial color="#f3e7d4" roughness={1} />
      </mesh>
      <mesh position={[0, 1.55, -4.25]} receiveShadow>
        <boxGeometry args={[10.8, 3.1, 0.16]} />
        <meshStandardMaterial color="#f7f1e7" roughness={1} />
      </mesh>
      <mesh position={[-5.32, 1.55, 0]} receiveShadow>
        <boxGeometry args={[0.16, 3.1, 8.8]} />
        <meshStandardMaterial color="#f3ece3" roughness={1} />
      </mesh>
      <mesh position={[-1.7, 2.05, -4.14]}>
        <boxGeometry args={[2.2, 1.15, 0.06]} />
        <meshStandardMaterial color="#d5e6ea" roughness={0.4} />
      </mesh>
      <mesh position={[-1.7, 2.05, -4.1]}>
        <boxGeometry args={[0.05, 1.15, 0.04]} />
        <meshStandardMaterial color="#f7f1e7" />
      </mesh>
      <mesh position={[-1.7, 2.05, -4.1]}>
        <boxGeometry args={[2.2, 0.05, 0.04]} />
        <meshStandardMaterial color="#f7f1e7" />
      </mesh>
      <Plant position={[-4.55, 0, -3.45]} />
      <Table />
    </group>
  );
}

function Table() {
  return (
    <group>
      <mesh position={[0, 0.36, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.2, 0.72, 12]} />
        <meshStandardMaterial color="#5a321c" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.76, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.42, 1.42, 0.1, 40]} />
        <meshStandardMaterial color="#8d5432" roughness={0.62} />
      </mesh>
      <mesh position={[0, 0.812, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.34, 40]} />
        <meshStandardMaterial color="#c4895c" roughness={0.55} />
      </mesh>
      <mesh position={[-0.12, 0.83, 0.08]} rotation={[-Math.PI / 2, 0, 0.3]} receiveShadow>
        <planeGeometry args={[0.42, 0.3]} />
        <meshStandardMaterial color="#fffaf3" />
      </mesh>
      <mesh position={[0.28, 0.86, -0.06]} castShadow>
        <cylinderGeometry args={[0.07, 0.055, 0.1, 12]} />
        <meshStandardMaterial color="#f7fbfb" roughness={0.35} />
      </mesh>
    </group>
  );
}

function Plant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.12, 0.1, 0.2, 8]} />
        <meshStandardMaterial color="#c47b52" />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <sphereGeometry args={[0.16, 8, 6]} />
        <meshStandardMaterial color="#6d9860" flatShading />
      </mesh>
      <mesh position={[-0.12, 0.4, 0.04]}>
        <sphereGeometry args={[0.12, 8, 6]} />
        <meshStandardMaterial color="#5e8a52" flatShading />
      </mesh>
      <mesh position={[0.1, 0.42, -0.04]}>
        <sphereGeometry args={[0.13, 8, 6]} />
        <meshStandardMaterial color="#7ea56a" flatShading />
      </mesh>
    </group>
  );
}
