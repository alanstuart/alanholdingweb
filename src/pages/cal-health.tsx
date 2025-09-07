"use client";
import CalEmbed from "../components/CalEmbed";

export default function CalHealth() {
  const envLink =
    (typeof process !== "undefined" && (process as any).env?.NEXT_PUBLIC_CAL_LINK) ||
    import.meta.env?.VITE_CAL_LINK ||
    "alan-s.-holding-wtiey5/30min";

  console.groupCollapsed("[Cal Health]");
  console.log("Detected CAL link:", envLink);
  console.log("Script src check:", document.querySelector('script[src^="https://cal.com/embed"]'));
  console.log("Window.Cal available:", typeof window !== 'undefined' ? !!(window as any).Cal : 'SSR');
  console.groupEnd();

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-2">Cal Health Check</h1>
      <p className="text-sm text-gray-600 mb-6">Detected link: <code>{envLink}</code></p>
      
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="font-semibold mb-2">Diagnostics:</h2>
        <ul className="text-sm space-y-1">
          <li>✅ Cal link: {envLink}</li>
          <li>✅ Component: CalEmbed loaded</li>
          <li>✅ Fallback: iframe available</li>
          <li>⚠️ Environment: Set VITE_CAL_LINK for custom link</li>
        </ul>
      </div>
      
      <CalEmbed calLink={envLink} prefer="auto" />
    </main>
  );
}