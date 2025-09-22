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
    import.meta.env?.VITE_CAL_LINK;

  const [scriptReady, setScriptReady] = useState(false);
  const [scriptFailed, setScriptFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const wantsScript = prefer === "script" || prefer === "auto";
  const wantsIframe = prefer === "iframe" || prefer === "auto";

  useEffect(() => {
    if (!wantsScript) return;
    if (typeof window === "undefined" || !resolvedLink) {
      setScriptFailed(true);
      setIsLoading(false);
      return;
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
      setIsLoading(false);
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
        setIsLoading(false);
        console.error("[CalEmbed] Failed to load Cal.com script");
      };
      document.head.appendChild(s);
    }

    return () => {
      // no-op cleanup; Cal manages its own listeners
    };
  }, [resolvedLink, wantsScript]);

  // Add timeout for script loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!scriptReady && !scriptFailed) {
        console.warn("[CalEmbed] Script loading timeout, falling back to iframe");
        setScriptFailed(true);
        setIsLoading(false);
      }
    }, 8000);

    return () => clearTimeout(timeout);
  }, [scriptReady, scriptFailed]);

  const dataAttrs = useMemo(() => {
    return {
      "data-cal-link": resolvedLink,
      "data-cal-config": JSON.stringify({ layout: "month_view" }),
    };
  }, [resolvedLink]);

  const canUseScript = wantsScript && scriptReady && !scriptFailed && resolvedLink && !isLoading;
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
      VITE_CAL_LINK: import.meta.env?.VITE_CAL_LINK || "N/A",
      RESOLVED_LINK: resolvedLink || "N/A"
    });
    console.groupEnd();
  }, [resolvedLink, scriptReady, scriptFailed, canUseScript, shouldUseIframe]);

  if (!resolvedLink) {
    console.error("[CalEmbed] No calLink provided. Set NEXT_PUBLIC_CAL_LINK or VITE_CAL_LINK.");
    return (
      <div className={`p-6 rounded-xl border border-red-300 bg-red-50 ${className}`}>
        <p className="font-semibold text-red-800">Booking Configuration Error</p>
        <p className="text-sm text-red-600 mt-2">
          Calendar link not configured. Please contact support.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading calendar...</span>
        </div>
      )}
      
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
          onLoad={() => console.log("[CalEmbed] Iframe loaded successfully")}
          onError={() => console.error("[CalEmbed] Iframe failed to load")}
        />
      )}

      {!canUseScript && !shouldUseIframe && !isLoading && (
        <div className="p-6 rounded-xl border border-yellow-300 bg-yellow-50">
          <p className="font-semibold text-yellow-800">Booking widget unavailable</p>
          <p className="text-sm text-gray-600">
            Unable to load calendar. Please try refreshing the page or contact support.
          </p>
          <a 
            href={`https://cal.com/${resolvedLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Open Calendar Directly
          </a>
        </div>
      )}
    </div>
  );
}