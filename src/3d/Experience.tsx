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
import { BALL_INITIAL_POS, useBallActions } from "../hooks/3d/useBallActions"
import { ShootingArrow } from "./ShootingArrow"
import { useShootingArrowActions } from "../hooks/3d/useShootingArrowActions"
import { useEndGameFn } from "../hooks/useEndGameFn"
import { useGamePhase } from "../hooks/useGamePhase"
import { Fireworks } from "./Fireworks"
import { useFireworksState } from "../FireworksState"
import { BASKET_INITIAL_POS } from "../hooks/3d/useBasketActions"
import { Preload } from '@react-three/drei';
import { token } from "../../styled-system/tokens"

const bucketAudio = new Audio('./swish.mp3')

export const Experience = () => {
  const basketRef = useRef<RapierRigidBody>(null)
  const ballRef = useRef<RapierRigidBody>(null)
  const arrowGroupRef = useRef<Group>(null)
  const arrowRef = useRef<Mesh>(null)

  const scoreBucket = useGameState((state) => state.scoreBucket)
  const { resetBallPosition, shootBall } = useBallActions(ballRef)
  const { displayArrow, moveArrow, hideArrow } = useShootingArrowActions({ arrowGroupRef, arrowRef, ballPosition: BALL_INITIAL_POS })
  const endGameFn = useEndGameFn()
  const createFirework = useFireworksState((state) => state.createFirework)


  const { isGamePlaying } = useGamePhase()
  const lastBucketTime = useGameState((state) => state.lastBucketTime)
  const isShooting = useGameState((state) => state.isShooting)

  const camera = useThree((state) => state.camera)
  camera.position.z = 0
  camera.rotation.y = Math.PI

  useFrame(() => {
    if (isGamePlaying) {
      if (getTimeLeftInSec(lastBucketTime, Date.now()) < 0 && !isShooting) {
        endGameFn()
      }
    }
  })

  const handleBucket = () => {
    if (ballRef.current) {
      resetBallPosition()
      scoreBucket()
      bucketAudio.currentTime = 0
      bucketAudio.play()
      if (basketRef.current) {
        const { x, y, z } = basketRef.current.translation()
        createFirework(new Vector3(x, y, z))
      }
    }
  }

  return <>
    <Preload all />
    <color args={[token('colors.blue.500')]} attach="background" />
    <Lights />
    <Physics debug={!import.meta.env.PROD}>
      <Basket ref={basketRef} initialPosition={BASKET_INITIAL_POS} onBucket={handleBucket} />
      <Ball ballRef={ballRef} initialPosition={BALL_INITIAL_POS} />
      <ShootingPlane
        position={BALL_INITIAL_POS}
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
      <ShootingArrow arrowGroupRef={arrowGroupRef} arrowRef={arrowRef} position={BALL_INITIAL_POS} />
      {isGamePlaying && <Fireworks />}
    </Physics>
  </>
}