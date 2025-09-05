"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  calLink?: string; // e.g. "alanholding/intro" or "alanholding"
  className?: string;
  prefer?: "script" | "iframe" | "auto"; // auto = try script then fallback
  iframeHeight?: number;
};

export default function CalEmbed({
  calLink,
  className,
  prefer = "auto",
  iframeHeight = 750,
}: Props) {
  const resolvedLink =
    calLink ||
    (typeof process !== "undefined" && (process as any).env?.NEXT_PUBLIC_CAL_LINK) ||
    import.meta.env?.VITE_CAL_LINK ||
    "alan-s.-holding-wtiey5/30min";

  const [scriptReady, setScriptReady] = useState(false);
  const [scriptFailed, setScriptFailed] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const wantsScript = prefer === "script" || prefer === "auto";
  const wantsIframe = prefer === "iframe" || prefer === "auto";

  useEffect(() => {
    if (!wantsScript) return;
    if (typeof window === "undefined" || !resolvedLink || resolvedLink === "alan-s.-holding-wtiey5/30min") {
      // Don't fail for the fallback link, it's valid
      if (resolvedLink === "alan-s.-holding-wtiey5/30min") {
        // Continue with script loading
      } else {
        setScriptFailed(true);
        return;
      }
    }

    const existing = document.querySelector<HTMLScriptElement>('script[src^="https://cal.com/embed"]');
    const load = () => {
      try {
        // @ts-ignore
        if (window?.Cal && typeof (window as any).Cal === "object") {
          // @ts-ignore
          (window as any).Cal("init", { origin: "https://cal.com" });
          // @ts-ignore
          (window as any).Cal("ui", { styles: { branding: { brandColor: "#111111" } } });
          setScriptReady(true);
          console.log("[CalEmbed] Script loaded successfully");
        } else {
          setScriptFailed(true);
          console.warn("[CalEmbed] Cal object not available after script load");
        }
      } catch (error) {
        setScriptFailed(true);
        console.error("[CalEmbed] Error initializing Cal:", error);
      }
    };

    if (existing) {
      existing.addEventListener("load", load, { once: true });
      if ((existing as any).readyState === "complete") load();
    } else {
      const s = document.createElement("script");
      s.src = "https://cal.com/embed.js";
      s.async = true;
      s.onload = load;
      s.onerror = () => {
        setScriptFailed(true);
        console.error("[CalEmbed] Failed to load Cal.com script");
      };
      document.head.appendChild(s);
    }

    return () => {
      // no-op cleanup; Cal manages its own listeners
    };
  }, [resolvedLink, wantsScript]);

  const dataAttrs = useMemo(() => {
    return {
      "data-cal-link": resolvedLink,
      "data-cal-config": JSON.stringify({ layout: "month_view" }),
    };
  }, [resolvedLink]);

  const canUseScript = wantsScript && scriptReady && !scriptFailed && resolvedLink;
  const shouldUseIframe = wantsIframe && (!canUseScript || scriptFailed);

  // Console diagnosis
  useEffect(() => {
    console.groupCollapsed("[CalEmbed] Diagnosis");
    console.log("Cal link:", resolvedLink);
    console.log("Script ready:", scriptReady);
    console.log("Script failed:", scriptFailed);
    console.log("Can use script:", canUseScript);
    console.log("Should use iframe:", shouldUseIframe);
    console.log("Environment vars:", {
      NEXT_PUBLIC_CAL_LINK: typeof process !== "undefined" ? (process as any).env?.NEXT_PUBLIC_CAL_LINK : "N/A",
      VITE_CAL_LINK: typeof import !== "undefined" ? (import as any).meta?.env?.VITE_CAL_LINK : "N/A"
    });
    console.groupEnd();
  }, [resolvedLink, scriptReady, scriptFailed, canUseScript, shouldUseIframe]);

  if (!resolvedLink) {
    console.warn("[CalEmbed] No calLink provided. Set NEXT_PUBLIC_CAL_LINK or VITE_CAL_LINK.");
  }

  return (
    <div className={className}>
      {canUseScript && (
        <div ref={rootRef} {...(dataAttrs as any)} />
      )}

      {shouldUseIframe && (
        <iframe
          src={`https://cal.com/${resolvedLink}`}
          width="100%"
          height={iframeHeight}
          title="Book a time"
          frameBorder="0"
          allow="camera; microphone; fullscreen; autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ borderRadius: "1rem", width: "100%" }}
        />
      )}

      {!canUseScript && !shouldUseIframe && (
        <div className="p-4 rounded-xl border">
          <p className="font-semibold">Booking widget unavailable</p>
          <p className="text-sm text-gray-600">
            Check CAL_LINK and CSP. Set <code>NEXT_PUBLIC_CAL_LINK</code> or <code>VITE_CAL_LINK</code>.
          </p>
        </div>
      )}
    </div>
  );
}