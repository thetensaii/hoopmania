import { useFrame, useThree } from "@react-three/fiber"
import { Ball } from "./Ball"
import { Basket } from "./Basket"
import { Lights } from "./Lights"
import { Physics, RapierRigidBody } from "@react-three/rapier"
import { useRef } from "react"
import { useGameState } from "../GameState"
import { Group, Mesh, Vector3 } from "three"
import { ShootingPlane } from "./ShootingPlane"
import { getTimeLeftInSec } from "../utils"
import { ballInitialPosition, useBallActions } from "../hooks/3d/useBallActions"
import { ShootingArrow } from "./ShootingArrow"
import { useShootingArrowActions } from "../hooks/3d/useShootingArrowActions"
import { useEndGameFn } from "../hooks/useEndGameFn"
import { useGamePhase } from "../hooks/useGamePhase"
import { Fireworks } from "./Fireworks"
import { useFireworksState } from "../FireworksState"

const basketInitialPosition = new Vector3(0, -0.6, 6)

export const Experience = () => {
  const basketRef = useRef<RapierRigidBody>(null)
  const ballRef = useRef<RapierRigidBody>(null)
  const arrowGroupRef = useRef<Group>(null)
  const arrowRef = useRef<Mesh>(null)

  const scoreBucket = useGameState((state) => state.scoreBucket)
  const updateCurrentTime = useGameState((state) => state.updateCurrentTime)
  const { resetBallPosition, shootBall } = useBallActions(ballRef)
  const { displayArrow, moveArrow, hideArrow } = useShootingArrowActions({ arrowGroupRef, arrowRef, ballPosition: ballInitialPosition })
  const endGameFn = useEndGameFn()
  const createFirework = useFireworksState((state) => state.createFirework)


  const { isGamePlaying } = useGamePhase()
  const lastBucketTime = useGameState((state) => state.lastBucketTime)
  const currentTime = useGameState((state) => state.currentTime)
  const isShooting = useGameState((state) => state.isShooting)

  const camera = useThree((state) => state.camera)
  camera.position.z = 0
  camera.rotation.y = Math.PI

  useFrame((state) => {
    if (isGamePlaying) {
      if (getTimeLeftInSec(lastBucketTime, currentTime) > 0 || isShooting) {
        updateCurrentTime()
      } else {
        endGameFn()
      }

      if (basketRef.current) {
        basketRef.current.setNextKinematicTranslation({ x: 1.5 * Math.sin(state.clock.getElapsedTime()), y: basketInitialPosition.y, z: basketInitialPosition.z });
      }
    }
  })

  const handleBucket = () => {
    if (ballRef.current) {
      resetBallPosition()
      scoreBucket()
      if (basketRef.current) {
        const { x, y, z } = basketRef.current.translation()
        createFirework(new Vector3(x, y, z))
      }
    }
  }

  return <>
    <color args={['#bdedfc']} attach="background" />
    <Lights />
    <Physics debug={!import.meta.env.PROD}>
      <Basket ref={basketRef} initialPosition={basketInitialPosition} onBucket={handleBucket} />
      <Ball ballRef={ballRef} initialPosition={ballInitialPosition} />
      <ShootingPlane
        position={ballInitialPosition}
        onPointerDown={(pointerDirection) => {
          if (!isShooting) {
            displayArrow(pointerDirection)
          }
        }}
        onPointerMove={(pointerDirection) => {
          if (!isShooting) {
            moveArrow(pointerDirection)
          }
        }}
        onPointerUp={(pointerDirection) => {
          hideArrow()
          if (!isShooting) {
            shootBall(pointerDirection)
          }
        }} />
      <ShootingArrow arrowGroupRef={arrowGroupRef} arrowRef={arrowRef} position={ballInitialPosition} />
      {isGamePlaying && <Fireworks />}
    </Physics>
  </>
}