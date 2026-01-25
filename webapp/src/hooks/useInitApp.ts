import { authClient } from "../auth-client"
import { useEffect, useTransition } from "react"
import { useAuthState } from "../stores/AuthState"
import { useBestScore } from "./useBestScore"

let didInit = false

export const useInitApp = () => {
  const [isPending, startTransition] = useTransition()
  const { connect } = useAuthState()
  const { loadBestScore } = useBestScore()

  useEffect(() => {
    if (!didInit) {
      didInit = true
      startTransition(async () => {
        const { data } = await authClient.getSession()

        if (data?.user) {
          connect({ name: data.user.name })
        }

        const isConnected = !!data?.user
        await loadBestScore(isConnected)
      })
    }
  }, [connect, loadBestScore])

  return {
    isPending
  }

}