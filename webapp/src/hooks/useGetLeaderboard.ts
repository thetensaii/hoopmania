import { useQuery } from "@tanstack/react-query"
import { Game } from "../domain/Game"
import { useInjection } from "inversify-react"
import { LeaderboardService } from "../domain/LeaderboardService"

export const useGetLeaderboard = () => {
  const leaderboardService = useInjection<LeaderboardService>(LeaderboardService)
  const query = useQuery<Game[]>({
    queryKey: ['leaders'],
    queryFn: async () => {
      const leaders = await leaderboardService.getLeaders()
      return leaders
    }
  })

  return query
}