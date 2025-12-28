import { useMutation } from "@tanstack/react-query"
import type { Game } from "../domain/Game"

export const useShareScore = () => {
  const mutation = useMutation({
    mutationFn: async (game: Game) => {
      const res = await fetch(new URL('/score', import.meta.env.VITE_API_URL),
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(game)
        }
      )

      if (!res.ok) {
        throw new Error('[useShareScore] - Error when sharing score')
      }
    }
  })

  return mutation
}