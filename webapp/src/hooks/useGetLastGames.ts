import { useQuery } from "@tanstack/react-query"
import { Game } from "../domain/Game"
import { useInjection } from "inversify-react"
import { AuthenticatedGameService } from "../domain/AuthenticatedGameService"

export const useGetLastGames = () => {
  const gameService = useInjection<AuthenticatedGameService>(AuthenticatedGameService)
  const query = useQuery<Game[]>({
    queryKey: ['lastGames'],
    queryFn: async () => {
      const lastGames = await gameService.getLastGames()
      return lastGames
    }
  })

  return query
}