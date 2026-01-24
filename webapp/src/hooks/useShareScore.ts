import { useMutation } from "@tanstack/react-query"
import type { Game } from "../domain/Game"
import { useInjection } from "inversify-react"
import { GuestGameService } from "../domain/GuestGameService"

export const useShareScore = () => {
  const guestGameService = useInjection<GuestGameService>(GuestGameService)
  const mutation = useMutation({
    mutationFn: async (game: Game) => {
      await guestGameService.shareGame(game)
    }
  })

  return mutation
}