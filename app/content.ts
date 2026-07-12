import type { MenuItem, VlogItem, WorkItem } from "./types";

export const menuItems: MenuItem[] = [
  { id: "works", label: "WORKS", note: "things we made", object: "book" },
  { id: "vlog", label: "VLOG", note: "days on tape", object: "camera" },
  { id: "about", label: "ABOUT US", note: "花·生 & 尘光", object: "journal" },
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
    description: "午后、尘光和一些没有被计划的画面。适合展示摄影、插画或生活提案。",
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
    title: "日本初印象-京都之诗",
    date: "FEB 2024",
    duration: "06:09",
    note: "首站来到京都，在街头巷尾慢慢散步，收集那些像漫画分镜一样突然出现的城市细节。",
    bilibiliUrl: "https://www.bilibili.com/video/BV1MK421C7F5/?share_source=copy_web&vd_source=47909c70ab0fa4a2a2d703f8195263ed",
    accent: "#f06b47",
  },
  {
    id: "vlog-02",
    title: "2025春日本升龙道上",
    date: "JUN 2025",
    duration: "13:27",
    note: "春节反向旅行，从名古屋、高山、白川乡到金泽和富山，把日本中部的雪、温泉、街道和亲子旅途收进一卷胶片。",
    bilibiliUrl: "https://www.bilibili.com/video/BV1fPMBzkE4T/?share_source=copy_web&vd_source=47909c70ab0fa4a2a2d703f8195263ed",
    accent: "#d6de43",
  },
  {
    id: "vlog-03",
    title: "春节日本中部秘境之旅：下集",
    date: "JUN 2025",
    duration: "17:29",
    note: "白川乡、金泽、富山一路遇见暴风雪，雪人、雪仗、能登牛丼和童话小屋，都被收进这段北陆回忆影像。",
    bilibiliUrl: "https://www.bilibili.com/video/BV1vdM6z1Edb/?share_source=copy_web&vd_source=47909c70ab0fa4a2a2d703f8195263ed",
    accent: "#f4b43f",
  },
];

export const profile = {
  title: "花·生 & 尘光",
  intro:
    "在平凡的生活里，捕捉光影，记录每一个感动自己的瞬间，精致对待人生，善待自己，经营好自己的生活……灵感点亮生活里尘光的精神乐园！",
  tags: ["生活影像", "空间与物件", "摄影", "family trip"],
};

export const contacts = [
  {
    label: "BILIBILI",
    value: "space.bilibili.com/491472948",
    href: "https://space.bilibili.com/491472948?spm_id_from=333.337.0.0",
  },
  { label: "E-MAIL", value: "hello@example.com", href: "mailto:hello@example.com" },
  { label: "REDNOTE", value: "等待填写小红书账号", href: "#" },
];
