"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useChallengeParam(defaultId: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const challengeId = searchParams.get("challenge") ?? defaultId;

  function setChallengeId(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("challenge", id);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return {
    challengeId,
    setChallengeId,
  };
}
