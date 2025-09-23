import axios from "axios"
import { getSession } from "next-auth/react"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json", Accept: "*/*" },
})

export async function apiRequest({ endpoint, method = "GET", payload}: any) {
  try {
    const session: any = await getSession()
    const token = session?.accessToken

    const url = endpoint

    const { data } = await api({
      method,
      url,
      data: payload ? JSON.stringify(payload) : undefined,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })

    return data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      //signOut({ callbackUrl: "/login" })
    }
    throw axios.isAxiosError(error) && error.response?.data ? error.response.data : error
  }
}

export async function downloadApiRequest(endpoint: string) {
  const session: any = await getSession()
  const token = session?.accessToken

  const response = await api.post(endpoint, {}, {
    responseType: "blob",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  const disposition = response.headers["content-disposition"]
  let filename = "file.pdf"
  if (disposition && disposition.includes("filename=")) {
    const match = disposition.match(/filename="?([^"]+)"?/)
    if (match && match[1]) filename = match[1]
  }

  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", filename)
  document.body.appendChild(link)
  link.click()
  link.remove()
}
