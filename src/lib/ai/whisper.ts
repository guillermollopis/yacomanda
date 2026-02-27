import OpenAI, { toFile } from "openai";

export async function transcribeAudio(
  buffer: Buffer,
  mimeType: string
): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const client = new OpenAI({ apiKey });

  const ext =
    mimeType === "audio/ogg"
      ? "ogg"
      : mimeType === "audio/mpeg"
        ? "mp3"
        : mimeType === "audio/opus"
          ? "opus"
          : "ogg";

  const file = await toFile(buffer, `audio.${ext}`, { type: mimeType });

  const transcription = await client.audio.transcriptions.create({
    model: "whisper-1",
    file,
    language: "es",
  });

  return transcription.text || null;
}
