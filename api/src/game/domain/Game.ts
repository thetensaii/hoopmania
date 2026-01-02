import z from "zod";

export const Game = z.object({
  player: z.string(),
  score: z.number(),
  time: z.number()
})
export type Game = z.infer<typeof Game>;