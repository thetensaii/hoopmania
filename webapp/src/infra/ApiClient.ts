import { injectable } from "inversify";
import { Environment } from "../environment";

@injectable()
export class ApiClient {
  public async get(path: string): Promise<Response> {
    const res = await fetch(new URL(path, Environment.VITE_API_URL))

    return res
  }

  public async post(path: string, body?: object): Promise<Response> {
    const res = await fetch(new URL(path, Environment.VITE_API_URL), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(body)
    })

    return res
  }
}