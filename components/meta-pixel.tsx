"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"

declare global {
  interface Window {
    fbq: any
  }
}

const PIXEL_ID = "826670937148646"
const PIXEL_URL = "https://capig.detetive.vip/tr"

export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params || {})
  }
}

export default function MetaPixel() {
  const pathname = usePathname()

  // Dispara PageView em toda navegação
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView")
    }
  }, [pathname])

  return (
    <>
      {/* Script do Meta Pixel com CAPI Gateway */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            '${PIXEL_URL}?id=${PIXEL_ID}');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* Fallback noscript para navegadores sem JavaScript */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`${PIXEL_URL}?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
