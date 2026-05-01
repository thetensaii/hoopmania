import { useThree } from "@react-three/fiber"
import { Ball } from "./Ball"
import { Basket } from "./Basket"
import { Lights } from "./Lights"
import { Physics, RapierRigidBody } from "@react-three/rapier"
import { useEffect, useRef } from "react"
import { useGameState } from "../stores/GameState"
import { Group, Mesh, Vector3 } from "three"
import { ShootingPlane } from "./ShootingPlane"
import { getTimeLeftInSec } from "../utils"
import { BALL_INITIAL_POS, resetBallPosition, shootBall } from "./utils/ballActionsFunctions"
import { ShootingArrow } from "./ShootingArrow"
import { useShootingArrowActions } from "../hooks/3d/useShootingArrowActions"
import { useEndGameFn } from "../hooks/useEndGameFn"
import { useGamePhase } from "../hooks/useGamePhase"
import { Fireworks } from "./Fireworks"
import { useFireworksState } from "../stores/FireworksState"
import { BASKET_INITIAL_POS } from "../hooks/3d/useBasketActions"
import { Preload, useTexture } from '@react-three/drei';
import { token } from "../../styled-system/tokens"
import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async';

const shootAudio = new Audio('./shoot.mp3')
const bucketAudio = new Audio('./bonus-point.mp3')
const gameOverAudio = new Audio('./gameover.mp3')
useTexture.preload('./particles/firework.png')

export const Experience = () => {
  const basketRigidBodyRef = useRef<RapierRigidBody>(null)
  const ballRigidBodyRef = useRef<RapierRigidBody>(null)
  const arrowGroupRef = useRef<Group>(null)
  const arrowRef = useRef<Mesh>(null)
  const isShootingRef = useRef<boolean>(false)

  const scoreBucket = useGameState((state) => state.scoreBucket)
  const { displayArrow, moveArrow, hideArrow } = useShootingArrowActions({ arrowGroupRef, arrowRef, ballPosition: BALL_INITIAL_POS })
  const endGameFn = useEndGameFn()
  const createFirework = useFireworksState((state) => state.createFirework)

  const { isGamePlaying } = useGamePhase()
  const lastBucketTime = useGameState((state) => state.lastBucketTime)
  const score = useGameState((state) => state.score)

  const camera = useThree((state) => state.camera)
  camera.position.z = 0

  useEffect(() => {
    const intervalId = setIntervalAsync(async () => {
      if (isGamePlaying && getTimeLeftInSec(lastBucketTime, Date.now()) < 0 && !isShootingRef.current) {
        gameOverAudio.currentTime = 0
        gameOverAudio.play()
        await endGameFn()
      }
    }, 200)

    return () => { (async () => await clearIntervalAsync(intervalId))() }
  }, [isGamePlaying, lastBucketTime, endGameFn])

  const handleBucket = () => {
    if (ballRigidBodyRef.current) {
      resetBallPosition(ballRigidBodyRef, isShootingRef)
      scoreBucket()
      bucketAudio.currentTime = 0
      bucketAudio.play()
      if (basketRigidBodyRef.current) {
        const { x, y, z } = basketRigidBodyRef.current.translation()
        createFirework(new Vector3(x, y, z))
      }
    }
  }

  return <>
    <Preload all />
    <color args={[token('colors.container.default')]} attach="background" />
    <Lights />
    <Physics debug={!import.meta.env.PROD}>
      <Basket ref={basketRigidBodyRef} initialPosition={BASKET_INITIAL_POS} onBucket={handleBucket} score={score} />
      <Ball rigidBodyRef={ballRigidBodyRef} isShootingRef={isShootingRef} initialPosition={BALL_INITIAL_POS} />
      <ShootingPlane
        position={BALL_INITIAL_POS}
        onPointerDown={(pointerDirection) => {
          if (!isShootingRef.current) {
            displayArrow(pointerDirection)
          }
        }}
        onPointerMove={(pointerDirection) => {
          if (!isShootingRef.current) {
            moveArrow(pointerDirection)
          }
        }}
        onPointerUp={(pointerDirection) => {
          hideArrow()
          if (!isShootingRef.current && getTimeLeftInSec(lastBucketTime, Date.now()) > 0) {
            shootAudio.currentTime = 0
            shootAudio.play()
            shootBall(pointerDirection, ballRigidBodyRef, isShootingRef)
          }
        }} />
      <ShootingArrow arrowGroupRef={arrowGroupRef} arrowRef={arrowRef} position={BALL_INITIAL_POS} />
      {isGamePlaying && <Fireworks />}
    </Physics>
  </>
}