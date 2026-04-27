import { authClient } from "../../auth-client"
import { Environment } from "../../environment"
import { useAuthState } from "../../stores/AuthState"
import { track } from "@plausible-analytics/tracker"

export const useAuth = () => {
  const { disconnect } = useAuthState()

  const signInWithDiscord = async () => {
    await authClient.signIn.social({
      provider: 'discord',
      callbackURL: Environment.VITE_WEBAPP_URL
    })

    track('sign-in', {})
  }

  const signOut = async () => {
    await authClient.signOut()
    disconnect()

    track('sign-out', {})
  }

  return { signInWithDiscord, signOut }

}