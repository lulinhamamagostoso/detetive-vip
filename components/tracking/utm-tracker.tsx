"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { captureUTMParams } from "@/lib/tracking-events"

function UTMCaptureInner() {
  const searchParams = useSearchParams()

  useEffect(() => {
    captureUTMParams()
  }, [searchParams])

  return null
}

export default function UTMTracker() {
  return (
    <Suspense fallback={null}>
      <UTMCaptureInner />
    </Suspense>
  )
}
