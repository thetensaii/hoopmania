import { authClient } from "../../auth-client"
import { Environment } from "../../environment"
import { useAuthState } from "../../stores/AuthState"

export const useAuth = () => {
  const { disconnect } = useAuthState()

  const signInWithDiscord = async () => {
    await authClient.signIn.social({
      provider: 'discord',
      callbackURL: Environment.VITE_WEBAPP_URL
    })
  }

  const signOut = async () => {
    await authClient.signOut()
    disconnect()
  }

  return { signInWithDiscord, signOut }

}