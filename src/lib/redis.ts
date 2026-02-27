import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

let _redis: Redis | null = null;

export function getRedis(): Redis {
  if (!_redis) {
    _redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  return _redis;
}

export function createWaRateLimiter(): Ratelimit {
  return new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(80, "1 s"),
    prefix: "wa_rate",
  });
}

export async function isDuplicate(
  key: string,
  ttlSeconds = 3600
): Promise<boolean> {
  const result = await getRedis().set(key, "1", { nx: true, ex: ttlSeconds });
  return result === null;
}
