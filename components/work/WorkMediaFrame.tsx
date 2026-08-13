import type { CSSProperties } from "react";
import type { WorkMediaItem } from "./workMedia";

type WorkMediaProps = {
  item: WorkMediaItem;
  className?: string;
  priority?: boolean;
};

export function WorkMedia({ item, className = "", priority = false }: WorkMediaProps) {
  const mediaStyle = {
    "--media-ratio": item.aspectRatio,
    "--media-position": item.objectPosition,
  } as CSSProperties;

  return (
    <figure
      className={`work-media work-media--${item.tone} ${className}`}
      style={mediaStyle}
      data-media-id={item.id}
      aria-label={`${item.client}, ${item.project}`}
    >
      <div className="work-media__surface">
        {item.src ? (
          // Local campaign paths are supplied by the work manifest.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt={item.alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
        ) : null}

        {false && item.kind === "video" && item.src ? (
          <video
            muted
            playsInline
            loop
            preload={priority ? "metadata" : "none"}
            poster={item.poster}
            aria-label={item.alt}
          >
            <source src={item.src} />
          </video>
        ) : null}

        {!item.src ? (
          <div className="work-media__placeholder" aria-hidden="true">
            <span>{item.id.replace("placeholder-", "SH / ")}</span>
            <i>{item.kind === "video" ? "Moving image" : "Still image"}</i>
          </div>
        ) : null}
      </div>

      <figcaption className="work-media__caption">
        <span>{item.client}</span>
        <span>{item.project}</span>
      </figcaption>
    </figure>
  );
}
