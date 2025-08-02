export const getTimeLeftInSec = (lastBucketTime: number, currentTime: number) => {
  return (10_000 - (currentTime - lastBucketTime)) / 1_000
} 