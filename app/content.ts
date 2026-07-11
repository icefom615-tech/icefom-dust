import type { MenuItem, VlogItem, WorkItem } from "./types";

export const menuItems: MenuItem[] = [
  { id: "works", label: "WORKS", note: "things we made", object: "book" },
  { id: "vlog", label: "VLOG", note: "days on tape", object: "camera" },
  { id: "about", label: "ABOUT US", note: "花·生 & 影子", object: "journal" },
  { id: "contact", label: "CONTACT", note: "say hello", object: "phone" },
];

export const works: WorkItem[] = [
  {
    id: "slow-room",
    title: "A ROOM THAT BREATHES",
    year: "2026",
    category: "SPACE / OBJECT",
    description: "给光线、植物和旧物留出位置。这里先放一件示例作品，之后只需在配置文件中替换。",
    palette: ["#f06b47", "#f5c54f", "#c9d9d1"],
  },
  {
    id: "afternoon-notes",
    title: "AFTERNOON NOTES",
    year: "2026",
    category: "PHOTO / DIARY",
    description: "午后、影子和一些没有被计划的画面。适合展示摄影、插画或生活提案。",
    palette: ["#d9e35a", "#f39b37", "#6a8790"],
  },
  {
    id: "found-things",
    title: "THINGS WE FOUND",
    year: "2025",
    category: "COLLECTION",
    description: "把日常捡回来的颜色、声音和物件重新排列，变成一份可以翻阅的档案。",
    palette: ["#eb5f62", "#f7dc76", "#9bb8ae"],
  },
];

export const vlogs: VlogItem[] = [
  {
    id: "vlog-01",
    title: "A SLOW SATURDAY",
    date: "JUL 2026",
    duration: "08:24",
    note: "做饭、散步，还有一场傍晚的雨。",
    bvid: "",
    accent: "#f06b47",
  },
  {
    id: "vlog-02",
    title: "ROOM, LIGHT, SHADOW",
    date: "JUN 2026",
    duration: "05:18",
    note: "等你提供哔哩哔哩 BV 号后，这里会直接播放视频。",
    bvid: "",
    accent: "#d6de43",
  },
  {
    id: "vlog-03",
    title: "ON THE WAY HOME",
    date: "MAY 2026",
    duration: "11:02",
    note: "路上的招牌、风声和一些突然想记住的瞬间。",
    bvid: "",
    accent: "#f4b43f",
  },
];

export const profile = {
  title: "花·生 & 影子",
  intro:
    "我们收集生活里容易被忽略的片刻：一束光、一间房、一段路和一件慢慢做完的作品。这里不是陈列柜，更像一间随时可以进来坐坐的房间。",
  tags: ["生活影像", "空间与物件", "摄影", "缓慢更新"],
};

export const contacts = [
  { label: "BILIBILI", value: "等待填写主页链接", href: "https://www.bilibili.com/" },
  { label: "E-MAIL", value: "hello@example.com", href: "mailto:hello@example.com" },
  { label: "REDNOTE", value: "等待填写小红书账号", href: "#" },
];
