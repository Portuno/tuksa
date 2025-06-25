import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

function logWithTime(...args: any[]) {
  console.log(`[${new Date().toISOString()}]`, ...args);
}
function errorWithTime(...args: any[]) {
  console.error(`[${new Date().toISOString()}]`, ...args);
}

function getChatId(chat_id?: string) {
  return chat_id || randomUUID();
}

export async function POST(req: NextRequest) {
  const { message, chat_id } = await req.json();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const user = process.env.MABOT_API_USER;
  const pass = process.env.MABOT_API_PASS;

  logWithTime("[AsistenteBot] ENV:", { apiBaseUrl, user: !!user, pass: !!pass });
  logWithTime("[AsistenteBot] Incoming message:", message, "chat_id:", chat_id);

  if (!apiBaseUrl || !user || !pass) {
    errorWithTime("[AsistenteBot] Configuración incompleta", { apiBaseUrl, user, pass });
    return NextResponse.json({ error: "Configuración incompleta" }, { status: 500 });
  }

  // 1. Login para obtener el token
  let token = null;
  try {
    logWithTime("[AsistenteBot] Intentando login en:", `${apiBaseUrl}/auth/login`);
    const loginRes = await fetch(`${apiBaseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        username: user,
        password: pass,
      }),
    });
    logWithTime("[AsistenteBot] Login status:", loginRes.status);
    const loginText = await loginRes.clone().text();
    logWithTime("[AsistenteBot] Login response body:", loginText);
    if (!loginRes.ok) {
      errorWithTime("[AsistenteBot] Login error:", loginText);
      return NextResponse.json({ error: "No se pudo autenticar con Mabot", detail: loginText }, { status: 401 });
    }
    const loginData = JSON.parse(loginText);
    token = loginData.access_token;
    logWithTime("[AsistenteBot] Token obtenido:", !!token);
  } catch (e: unknown) {
    errorWithTime("[AsistenteBot] Error de autenticación:", e);
    return NextResponse.json({ error: "Error de autenticación", detail: e instanceof Error ? e.message : String(e) }, { status: 401 });
  }

  // 2. Enviar mensaje al bot
  try {
    logWithTime("[AsistenteBot] Enviando mensaje a:", `${apiBaseUrl}/io/input`);
    const chatId = getChatId(chat_id);
    const bodyToSend = {
      platform: "web",
      bot_username: "inmoredes",
      chat_id: chatId,
      messages: [
        {
          role: "user",
          contents: [
            { type: "text", value: message },
          ],
        },
      ],
    };
    logWithTime("[AsistenteBot] Body enviado al bot:", JSON.stringify(bodyToSend));
    const botRes = await fetch(`${apiBaseUrl}/io/input`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyToSend),
    });
    logWithTime("[AsistenteBot] Bot response status:", botRes.status);
    const botText = await botRes.clone().text();
    logWithTime("[AsistenteBot] Bot response body:", botText);
    if (!botRes.ok) {
      errorWithTime("[AsistenteBot] Error al contactar al bot:", botText);
      return NextResponse.json({ error: "Error al contactar al bot", detail: botText }, { status: 500 });
    }
    const botData = JSON.parse(botText);
    const reply = botData.messages?.[0]?.contents?.[0]?.value || "(Sin respuesta)";
    logWithTime("[AsistenteBot] Bot reply:", reply);
    return NextResponse.json({ reply });
  } catch (e: unknown) {
    errorWithTime("[AsistenteBot] Error de conexión con el bot:", e);
    return NextResponse.json({ error: "Error de conexión con el bot", detail: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
} 