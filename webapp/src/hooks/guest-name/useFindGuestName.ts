import { useInjection } from "inversify-react"
import { GuestNameService as GuestNameService } from "../../domain/GuestNameService"
import { useQuery } from "@tanstack/react-query"

export const useFindGuestName = () => {
  const guestNameService = useInjection<GuestNameService>(GuestNameService)
  const { isPending, isError, data } = useQuery<string | null>({
    queryKey: ['guestName'],
    queryFn: () => {
      return guestNameService.find()
    }
  })

  return { isPending, isError, name: data }
}