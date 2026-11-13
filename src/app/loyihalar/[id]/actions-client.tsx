"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icons";

export function ProjectActions({
  projectId,
  initialLikes,
  isOwner,
}: {
  projectId: string;
  initialLikes: number;
  isOwner: boolean;
}) {
  const [joined, setJoined] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [me, setMe] = useState<{ id: string } | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me").then((r) => (r.ok ? r.json() : { user: null })).then((d) => setMe(d.user));
  }, []);

  const join = async (action: "join" | "leave" | "like") => {
    if (!me) {
      router.push("/login");
      return;
    }
    const res = await fetch(`/api/projects/${projectId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const d = await res.json();
    if (!res.ok) return;
    if (action === "join") setJoined(true);
    if (action === "leave") setJoined(false);
    if (action === "like" && typeof d.likes === "number") setLikes(d.likes);
  };

  if (me === undefined) return null;

  return (
    <div className="mt-4 grid gap-2.5">
      {me ? (
        <>
          {isOwner ? (
            <div className="rounded-lg bg-emerald/10 px-4 py-3 text-center text-[13px] font-bold text-emerald-deep dark:text-emerald">
              Bu loyiha sizniki
            </div>
          ) : (
            <button
              onClick={() => join(joined ? "leave" : "join")}
              className={`flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition-colors ${
                joined
                  ? "border border-emerald bg-emerald/10 text-emerald-deep dark:text-emerald"
                  : "bg-emerald text-soft hover:bg-emerald-deep"
              }`}
            >
              <Icon name={joined ? "check" : "users"} className="h-4 w-4" />
              {joined ? "Jamoadasiz" : "Jamoa saflariga qo‘shilish"}
            </button>
          )}
          <button
            onClick={() => join("like")}
            className="flex items-center justify-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-bold text-ink/70 transition-colors hover:border-danger hover:text-danger dark:border-linedark dark:text-soft/70"
          >
            Qo‘llab-quvvatlash ({likes})
          </button>
        </>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="flex items-center justify-center gap-2 rounded-lg bg-emerald px-5 py-3 text-sm font-bold text-soft transition-colors hover:bg-emerald-deep"
        >
          Qo‘shilish uchun kirish
        </button>
      )}
    </div>
  );
}
