import { redirect } from "next/navigation"

export default function Home() {
  redirect("/userAuth/login")
}
