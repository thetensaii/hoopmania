import { useInjection } from "inversify-react"
import { useGameState } from "../stores/GameState"
import { GuestPlayerNameService } from "../domain/GuestPlayerNameService"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const usePlayerName = () => {
  const setPlayerName = useGameState((state) => state.setPlayerName)
  const guestPlayerNameService = useInjection<GuestPlayerNameService>(GuestPlayerNameService)
  const queryClient = useQueryClient()

  const savePlayerNameMutation = useMutation({
    mutationFn: async (newPlayerName: string) => {
      await guestPlayerNameService.savePlayerName(newPlayerName)
    }
  })

  const loadPlayerName = async (isConnected: boolean) => {
    if (isConnected) return

    const playerName = await queryClient.fetchQuery({
      queryKey: ['playerName'],
      queryFn: async () => {
        return guestPlayerNameService.findPlayerName()
      }
    })

    if (playerName) {
      setPlayerName(playerName)
    }
  }

  const savePlayerName = async (newPlayerName: string) => {
    await savePlayerNameMutation.mutateAsync(newPlayerName)
    setPlayerName(newPlayerName)
  }

  return { loadPlayerName, savePlayerName }
}