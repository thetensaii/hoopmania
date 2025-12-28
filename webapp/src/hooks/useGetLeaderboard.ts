import { useQuery } from "@tanstack/react-query"
import { Game } from "../domain/Game"

export const useGetLeaderboard = () => {
  const query = useQuery<Game[]>({
    queryKey: ['leaderboard'], queryFn: async () => {
      const res = await fetch(new URL('/leaderboard', import.meta.env.VITE_API_URL))
      if (!res.ok) {
        throw new Error('[useGetLeaderboard] - Error when retrieving leaderboard')
      }

      const { data } = await res.json()
      const leaderboard = Game.array().parse(data)

      return leaderboard
    }
  })

  return query
}