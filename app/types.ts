export type PanelId = "works" | "vlog" | "about" | "contact";

export interface WorkItem {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  palette: [string, string, string];
  image?: string;
  imageAlt?: string;
}

export interface VlogItem {
  id: string;
  title: string;
  date: string;
  duration: string;
  note: string;
  bvid?: string;
  bilibiliUrl?: string;
  accent: string;
}

export interface MenuItem {
  id: PanelId;
  label: string;
  note: string;
  object: "book" | "camera" | "journal" | "phone";
}
