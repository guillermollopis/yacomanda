import { getServerEnv } from "@/config/env";

const GRAPH_API = "https://graph.facebook.com/v22.0";

/**
 * Exchange the short-lived auth code from FB.login for a user access token.
 */
export async function exchangeCodeForToken(code: string): Promise<string> {
  const env = getServerEnv();
  const url = new URL(`${GRAPH_API}/oauth/access_token`);
  url.searchParams.set("client_id", process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!);
  url.searchParams.set("client_secret", env.WHATSAPP_APP_SECRET);
  url.searchParams.set("code", code);

  const res = await fetch(url.toString());
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to exchange code for token: ${res.status} ${body}`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

/**
 * Exchange a short-lived token for a long-lived token (~60 days).
 */
export async function exchangeForLongLivedToken(
  shortToken: string
): Promise<string> {
  const env = getServerEnv();
  const url = new URL(`${GRAPH_API}/oauth/access_token`);
  url.searchParams.set("grant_type", "fb_exchange_token");
  url.searchParams.set("client_id", process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!);
  url.searchParams.set("client_secret", env.WHATSAPP_APP_SECRET);
  url.searchParams.set("fb_exchange_token", shortToken);

  const res = await fetch(url.toString());
  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Failed to exchange for long-lived token: ${res.status} ${body}`
    );
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

/**
 * Subscribe our app to the WABA so we receive webhooks.
 */
export async function subscribeApp(
  wabaId: string,
  token: string
): Promise<void> {
  const res = await fetch(`${GRAPH_API}/${wabaId}/subscribed_apps`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to subscribe app to WABA: ${res.status} ${body}`);
  }
}

/**
 * Register the phone number for WhatsApp messaging.
 */
export async function registerPhoneNumber(
  phoneNumberId: string,
  token: string
): Promise<void> {
  const res = await fetch(`${GRAPH_API}/${phoneNumberId}/register`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messaging_product: "whatsapp", pin: "000000" }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Failed to register phone number: ${res.status} ${body}`
    );
  }
}

/**
 * Fetch the display phone number and verified name for a phone number ID.
 */
export async function getPhoneNumber(
  phoneNumberId: string,
  token: string
): Promise<{ displayPhoneNumber: string; verifiedName: string }> {
  const url = `${GRAPH_API}/${phoneNumberId}?fields=display_phone_number,verified_name`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Failed to get phone number info: ${res.status} ${body}`
    );
  }

  const data = (await res.json()) as {
    display_phone_number: string;
    verified_name: string;
  };

  return {
    displayPhoneNumber: data.display_phone_number,
    verifiedName: data.verified_name,
  };
}
