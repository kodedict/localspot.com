

import useSWR, { mutate } from "swr"
import axios from "axios"
import { useState, useCallback } from "react"
import { useSession, signOut } from "next-auth/react"
import type { Session } from "next-auth"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
type ExtendedSession = Session & { accessToken?: string }

export default function useApiRequest(setError?: any) {
  const { data: session } = useSession() as { data: ExtendedSession }
  const [requestErrors, setRequestErrors] = useState(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [requestLoading, setPostLoading] = useState(false)

  // 🔥 Global unauthorized handler
  const handleUnauthorized = (error: any) => {
    if (error.response?.status === 401) {
      // sign user out
      signOut()
      // optional UI effect
      document.getElementById("unauthorized_layout")?.classList.remove("hidden")
      return error.response?.data || "Unauthorized"
    }
    return null
  }

  // build headers with token
  const getHeaders = useCallback(() => {
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    if (session?.accessToken) {
      headers.Authorization = `Bearer ${session.accessToken}`
    }
    return headers
  }, [session])

  // ✅ Cached GET (SWR)
  function Get<T = any>(endpoint: string, options = {}) {
    const fetcher = async (url: string) => {
      try {
        const { data } = await axios.get(url, { headers: getHeaders() })
        if (data.status !== "200") {
          console.log("error message from api", data.message)
        }
        return data?.data
      } catch (error) {
        console.log("error", error)
        const unauthorized = handleUnauthorized(error)
        if (unauthorized) throw unauthorized
        throw error
      }
    }

    const { data, error, isLoading, mutate } = useSWR<T>(endpoint, fetcher, {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
      ...options,
    })

    return {
      data,
      error,
      loading: isLoading,
      mutate,
    }
  }


  // ✅ One-off async GET (no cache)
  async function ReturnGet(endpoint: string) {
    if (!endpoint) return null
    try {
      const { data } = await axios.get(endpoint, { headers: getHeaders() })
      return data?.data
    } catch (error) {
      const unauthorized = handleUnauthorized(error)
      if (unauthorized) return unauthorized
      setErrorMessage((error as any)?.message || "Something went wrong")
      return null
    }
  }

  // ✅ POST with SWR revalidation
  async function Post({ endpoint, payload, refreshEndpoint }: {
    endpoint: string,
    payload?: any,
    refreshEndpoint?: string | string[]
  }) {
    setPostLoading(true) // start loading
    try {
      const { data } = await axios.post(endpoint, payload, {
        headers: getHeaders(),
      })

      if (refreshEndpoint) {
        if (Array.isArray(refreshEndpoint))
          refreshEndpoint.forEach((url) => mutate(url))
        else mutate(refreshEndpoint)
      }

      return data
    } catch (error: any) {
      const unauthorized = handleUnauthorized(error)
      if (unauthorized) return unauthorized

      setRequestErrors(error?.response?.data || null)
      setErrorMessage(error?.message || null)

      if (setError && error?.response?.data) {
        Object.entries(error.response.data).forEach(([field, messages]) => {
          setError(field, {
            type: "manual",
            message: Array.isArray(messages) ? messages.join(", ") : String(messages),
          })
        })
      }

      return null
    } finally {
      setPostLoading(false) // stop loading
    }
  }


  async function Download(endpoint: string, filenameFallback = "file.pdf") {
    try {
      const response = await axios.get(endpoint, {
        responseType: "blob",
        headers: getHeaders(),
      })

      const disposition = response.headers["content-disposition"]
      let filename = filenameFallback
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

      return true
    } catch (error) {
      const unauthorized = handleUnauthorized(error)
      if (unauthorized) return false
      setErrorMessage("Download failed!")
      return false
    }
  }

  return {
    Get,
    ReturnGet,
    Post,
    requestLoading,
    Download,
    requestErrors,
    errorMessage,
  }
}
