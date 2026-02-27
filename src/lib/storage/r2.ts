import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

let _s3: S3Client | null = null;

function getS3Client(): S3Client {
  if (!_s3) {
    _s3 = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY!,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY!,
      },
    });
  }
  return _s3;
}

function mimeToExt(mimeType: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "audio/ogg": "ogg",
    "audio/mpeg": "mp3",
    "audio/opus": "opus",
    "video/mp4": "mp4",
    "application/pdf": "pdf",
  };
  return map[mimeType] ?? "bin";
}

export async function uploadMedia(
  businessId: string,
  messageId: string,
  buffer: Buffer,
  mimeType: string
): Promise<string> {
  const ext = mimeToExt(mimeType);
  const key = `media/${businessId}/${messageId}.${ext}`;

  await getS3Client().send(
    new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    })
  );

  return key;
}

export function getMediaUrl(key: string): string {
  const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
  if (publicUrl) return `${publicUrl}/${key}`;
  return key;
}
