# 内容替换指南

网站的作品、Vlog、个人介绍和联系方式都集中在 `app/content.ts`，无需修改动画代码。

## 添加作品

把图片放入 `public/works/`，然后为作品填写：

```ts
{
  id: "唯一英文名称",
  title: "作品标题",
  year: "2026",
  category: "PHOTO / SPACE",
  description: "作品介绍",
  palette: ["#f06b47", "#f5c54f", "#c9d9d1"],
  image: "/works/图片文件名.jpg",
  imageAlt: "图片内容说明",
}
```

若暂时没有图片，删除 `image` 和 `imageAlt`，网站会显示自动生成的复古色块作品。

## 添加哔哩哔哩 Vlog

可以填写 BV 号或完整链接，网站会自动识别：

```ts
{
  id: "vlog-04",
  title: "视频标题",
  date: "JUL 2026",
  duration: "08:24",
  note: "视频简介",
  bilibiliUrl: "https://www.bilibili.com/video/BVxxxxxxxxxx",
  accent: "#f06b47",
}
```

## 联系信息

在 `contacts` 中替换显示文字和链接。暂时不想公开的平台可以保留 `href: "#"`；网站不会收集访客资料。

