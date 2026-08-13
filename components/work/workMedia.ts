export type WorkMediaKind = "image" | "video";

export type WorkMediaItem = {
  id: string;
  kind: WorkMediaKind;
  src?: string;
  poster?: string;
  alt: string;
  aspectRatio: string;
  objectPosition: string;
  client: string;
  project: string;
  tone: "charcoal" | "stone" | "silver" | "ink" | "bone" | "graphite";
};

// Replace only src/poster when approved client material arrives. The scene
// composition and motion are intentionally independent from the media files.
export const workMedia: WorkMediaItem[] = [
  {
    id: "placeholder-01",
    kind: "video",
    alt: "Reserved full-screen campaign film",
    aspectRatio: "16 / 9",
    objectPosition: "50% 50%",
    client: "SocialHaus Archive",
    project: "Campaign Film / 01",
    tone: "charcoal",
  },
  {
    id: "placeholder-02",
    kind: "image",
    alt: "Reserved portrait hospitality campaign image",
    aspectRatio: "4 / 5",
    objectPosition: "50% 44%",
    client: "Hospitality",
    project: "Editorial Frame / 02",
    tone: "stone",
  },
  {
    id: "placeholder-03",
    kind: "video",
    alt: "Reserved vertical social film",
    aspectRatio: "9 / 16",
    objectPosition: "50% 50%",
    client: "Social Campaign",
    project: "Motion Study / 03",
    tone: "silver",
  },
  {
    id: "placeholder-04",
    kind: "image",
    alt: "Reserved panoramic lifestyle campaign image",
    aspectRatio: "21 / 9",
    objectPosition: "58% 50%",
    client: "Lifestyle",
    project: "Campaign Horizon / 04",
    tone: "ink",
  },
  {
    id: "placeholder-05",
    kind: "image",
    alt: "Reserved brand identity image",
    aspectRatio: "3 / 4",
    objectPosition: "50% 50%",
    client: "Brand Identity",
    project: "Identity Detail / 05",
    tone: "bone",
  },
  {
    id: "placeholder-06",
    kind: "video",
    alt: "Reserved production sequence",
    aspectRatio: "16 / 10",
    objectPosition: "50% 50%",
    client: "Production",
    project: "Moving Image / 06",
    tone: "graphite",
  },
];
