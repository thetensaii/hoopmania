import { Spherical, Vector3 } from "three"

type FireworkAttributes = {
  positionsArray: Float32Array
  sizesArray: Float32Array
  timeMultipliersArray: Float32Array
}

export const createFireworkAttributes = (count: number): FireworkAttributes => {
  const positionsArray = new Float32Array(count * 3)
  const sizesArray = new Float32Array(count)
  const timeMultipliersArray = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const spherical = new Spherical(
      0.75 + Math.random() * 0.25,
      Math.random() * Math.PI / 2,
      Math.random() * Math.PI * 2
    )
    const position = new Vector3().setFromSpherical(spherical)

    positionsArray[i3] = position.x
    positionsArray[i3 + 1] = position.y
    positionsArray[i3 + 2] = position.z


    sizesArray[i] = Math.random()
    timeMultipliersArray[i] = 1 + Math.random()
  }

  return {
    positionsArray,
    sizesArray,
    timeMultipliersArray
  }
}
