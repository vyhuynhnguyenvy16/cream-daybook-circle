import { createFileRoute } from "@tanstack/react-router";
import { MatPrototype } from "@/components/mat-prototype";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hôm nay — Mật" },
      { name: "description", content: "Chia sẻ ảnh, hẹn đi chơi và giữ kỷ niệm cùng những người bạn thân." },
      { property: "og:title", content: "Hôm nay — Mật" },
      { property: "og:description", content: "Chia sẻ ảnh, hẹn đi chơi và giữ kỷ niệm cùng những người bạn thân." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MatPrototype,
});