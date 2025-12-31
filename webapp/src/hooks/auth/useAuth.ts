import { authClient } from "../../auth-client"
import { Environment } from "../../environment"

export const useAuth = () => {
  const { data } = authClient.useSession()

  const signInWithDiscord = async () => {
    await authClient.signIn.social({
      provider: 'discord',
      callbackURL: Environment.VITE_WEBAPP_URL
    })
  }

  const signOut = async () => {
    await authClient.signOut()
  }

  return { isConnected: !!data?.user, signInWithDiscord, signOut }

}