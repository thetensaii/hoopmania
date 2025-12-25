const ALLOWED_TIME_BETWEEN_BUCKET_IN_MS = 10_000

export const getTimeLeftInSec = (lastBucketTime: number, currentTime: number) => {
  return (ALLOWED_TIME_BETWEEN_BUCKET_IN_MS - (currentTime - lastBucketTime)) / 1_000
} 