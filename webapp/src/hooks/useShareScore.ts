import { useMutation } from "@tanstack/react-query"
import type { Game } from "../domain/Game"
import { useInjection } from "inversify-react"
import { GuestGameService } from "../domain/GuestGameService"
import { GuestNameService } from "../domain/GuestNameService"
import { usePostGameScreenState } from "../stores/PostGameScreenState"

export const useShareScore = () => {
  const { setHasSharedScore } = usePostGameScreenState()

  const guestGameService = useInjection<GuestGameService>(GuestGameService)
  const guestNameService = useInjection<GuestNameService>(GuestNameService)

  const mutation = useMutation({
    mutationFn: async (game: Game) => {
      await guestGameService.shareGame(game)
      await guestNameService.save(game.player)
      setHasSharedScore(true)
    }
  })

  return mutation
}