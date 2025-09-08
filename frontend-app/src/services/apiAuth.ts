import { AppRestfulApi } from "../utils/axios";

export async function login(email: string, password: string) {
  console.log(email, password);

  AppRestfulApi.post("/login", { email, password });
}
