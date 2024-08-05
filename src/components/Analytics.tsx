import Script from "next/script";
import React from "react";

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
  return (
    <>
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-7TEBD1HXFS'
      ></Script>
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gaId}');
          `
        }}
      />
    </>
  );
}
