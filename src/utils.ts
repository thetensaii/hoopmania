export const getTimeLeftInSec = (lastBucketTime: number, currentTime: number) => {
  return (7_000 - (currentTime - lastBucketTime)) / 1_000
} 