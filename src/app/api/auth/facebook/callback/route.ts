import { NextRequest, NextResponse } from "next/server";

/**
 * Facebook OAuth redirect callback.
 * Receives the auth code, sends it to the opener window via postMessage, and closes.
 */
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code") ?? "";
  const error = req.nextUrl.searchParams.get("error") ?? "";
  const errorDescription =
    req.nextUrl.searchParams.get("error_description") ?? "";

  const html = `<!DOCTYPE html>
<html lang="es">
<head><title>Conectando WhatsApp...</title></head>
<body style="font-family:system-ui;display:flex;align-items:center;justify-content:center;height:100vh;margin:0">
<p>Cerrando ventana...</p>
<script>
(function() {
  var msg = {
    type: "FB_OAUTH_CALLBACK",
    code: ${JSON.stringify(code)},
    error: ${JSON.stringify(error)},
    errorDescription: ${JSON.stringify(errorDescription)}
  };
  if (window.opener) {
    // Use "*" because the popup may land on www.domain.com while
    // the opener is on domain.com (or vice versa after redirects).
    // The code is short-lived and tied to a specific redirect_uri,
    // so the security risk is minimal.
    window.opener.postMessage(msg, "*");
  }
  window.close();
})();
</script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
