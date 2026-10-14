// Cloudflare R2 (S3-compatible). Private buckets + short-TTL presigned URLs.
// Layout: quarantine/<uuid> (unscanned) -> private/<projectId>/... (clean) or public/...
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET ?? "clother-files";
export const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
export const MAX_IMG_BYTES = 10 * 1024 * 1024;
export const MAX_FILE_BYTES = 25 * 1024 * 1024;

export const r2Key = {
  quarantine: (id: string, name: string) => `quarantine/${id}/${name}`,
  privateFile: (projectId: string, name: string) => `private/${projectId}/${name}`,
  portfolio: (name: string) => `public/portfolio/${name}`,
};

// Sender uploads straight to quarantine via this URL; server promotes after scan.
export const presignedPut = (key: string, mime: string, secs = 900) =>
  getSignedUrl(client, new PutObjectCommand({ Bucket: BUCKET, Key: key, ContentType: mime }), {
    expiresIn: secs,
  });

// Readers (project members + admins only — checked in the Route Handler first).
export const presignedGet = (key: string, secs = 300) =>
  getSignedUrl(client, new GetObjectCommand({ Bucket: BUCKET, Key: key }), { expiresIn: secs });
