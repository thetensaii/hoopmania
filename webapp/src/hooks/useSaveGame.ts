import { useMutation } from "@tanstack/react-query"
import { useInjection } from "inversify-react"
import { AuthenticatedGameService, AuthenticatedNewGame } from "../domain/AuthenticatedGameService"

export const useSaveGame = () => {
  const authenticatedGameService = useInjection<AuthenticatedGameService>(AuthenticatedGameService)
  const mutation = useMutation({
    mutationFn: async (game: AuthenticatedNewGame) => {
      await authenticatedGameService.saveGame(game)
    }
  })

  return mutation
}