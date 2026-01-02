import { useMutation } from "@tanstack/react-query"
import type { Game } from "../domain/Game"
import { useInjection } from "inversify-react"
import { UnauthenticatedGameService } from "../domain/UnauthenticatedGameService"

export const useShareScore = () => {
  const unauthenticatedGameService = useInjection<UnauthenticatedGameService>(UnauthenticatedGameService)
  const mutation = useMutation({
    mutationFn: async (game: Game) => {
      await unauthenticatedGameService.shareGame(game)
    }
  })

  return mutation
}