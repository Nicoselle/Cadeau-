import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ArticleImage } from "@/types/newspaper";

export function EditionFigure({
  image,
  priority = false,
  ratio = "video",
  className,
}: {
  image: ArticleImage;
  priority?: boolean;
  ratio?: "video" | "still";
  className?: string;
}) {
  return (
    <figure className={cn(className)}>
      <div
        className={cn(
          "relative overflow-hidden border border-hairline bg-muted",
          ratio === "still" ? "aspect-[4/3]" : "aspect-[16/9]",
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 760px, 100vw"
          className="object-cover object-center"
        />
      </div>
      {image.caption ? (
        <figcaption className="mt-2 max-w-2xl font-serif text-[13px] italic leading-snug text-muted-foreground">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
