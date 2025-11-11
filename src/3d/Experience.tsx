import { useFrame, useThree } from "@react-three/fiber"
import { Ball } from "./Ball"
import { Basket } from "./Basket"
import { Lights } from "./Lights"
import { Physics, RapierRigidBody } from "@react-three/rapier"
import { useRef } from "react"
import { useGameState } from "../GameState"
import { Vector3 } from "three"
import { ShootingPlane } from "./ShootingPlane"
import { getTimeLeftInSec } from "../utils"
import { ballInitialPosition, useResetBallPosition } from "../hooks/useResetBallPosition"

const basketInitialPosition = new Vector3(0, -0.6, 6)

export const Experience = () => {
  const basketRef = useRef<RapierRigidBody>(null)
  const ballRef = useRef<RapierRigidBody>(null)

  const scoreBucket = useGameState((state) => state.scoreBucket)
  const endGame = useGameState((state) => state.endGame)
  const updateCurrentTime = useGameState((state) => state.updateCurrentTime)
  const setCanShoot = useGameState((state) => state.setCanShoot)
  const resetBallPosition = useResetBallPosition(ballRef)

  const phase = useGameState((state) => state.phase)
  const lastBucketTime = useGameState((state) => state.lastBucketTime)
  const currentTime = useGameState((state) => state.currentTime)

  const camera = useThree((state) => state.camera)
  camera.position.z = 0
  camera.rotation.y = Math.PI

  useFrame(() => {
    if (phase === 'playing') {
      if (getTimeLeftInSec(lastBucketTime, currentTime) > 0) {
        updateCurrentTime()
      } else {
        endGame()
      }
    }
  })

  const handleShoot = (x: number, y: number) => {
    if (ballRef.current) {
      ballRef.current.lockTranslations(false, true)
      ballRef.current.applyImpulse({ x: x, y: y, z: 0.3 }, true);
      setCanShoot(false)
    }
  }

  const handleBucket = () => {
    if (ballRef.current) {
      resetBallPosition()
      scoreBucket()
    }
  }

  return <>
    <color args={['#bdedfc']} attach="background" />
    <Lights />
    <Physics debug={!import.meta.env.PROD}>
      <Basket ref={basketRef} initialPosition={basketInitialPosition} onBucket={handleBucket} />
      <Ball ballRef={ballRef} initialPosition={ballInitialPosition} />
      <ShootingPlane position={ballInitialPosition} onShoot={handleShoot} />
    </Physics>
  </>
}