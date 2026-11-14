---
title: 个性化定制指南
publishDate: 2024-07-30
description: 'astro-theme-pure 主题个性化定制指南'
tags:
  - Waline
  - Vercel
  - Supabase
heroImage: { src: './thumbnail.jpg', color: '#64574D' }
language: '中文'
---

## 站点配置

[astro-theme-pure](https://github.com/cworld1/astro-theme-pure)

定制该主题通常需要修改较多源码。

我们已尽量将配置项集中在 `src/site.config.ts` 文件，方便用户统一管理，并集成了多种常用社交/工具图标。如果你需要添加新的图标，则需要自行修改源码。

你可以全局搜索以下关键词，快速定位需要替换的文本：

- `Lorem ipsum`
- `astro-theme-pure`
- `cworld`

下面将详细介绍各部分定制方法。

### 配置文件

详见 [配置文件说明](https://astro-pure.js.org/docs/setup/configuration)。

#### Waline 评论系统

详见 [Waline 评论系统集成](https://astro-pure.js.org/docs/integrations/comment)。

#### 页脚

当前支持的社交媒体有：

- `coolapk`
- `telegram`
- `github`
- `bilibili`
- `twitter`
- `zhihu`
- `steam`
- `netease_music`

如需添加新的社交媒体，请修改以下文件：

- `src/types.ts`：新增 `SocialLink.name` 枚举值，并在 `SocialMediaIconId` 中添加图标映射关系
- `public/icons/social.svg`：按现有格式新增一个 symbol 图标

  建议在以下网站查找社交媒体图标，以保持风格统一：
  - [remixicon](https://remixicon.com/)
  - [mingcute](https://www.mingcute.com/)

### 其他需替换的文件

- `public/favicon`：站点 favicon，可在 [favicon.io](https://favicon.io/favicon-converter/) 生成
- `public/images/social-card.png`：站点社交分享卡片
- `src/assets/`：此目录下存放客户端头像、赞助二维码等图片，请替换为你自己的图片

## 其他页面

### 关于页

当前支持的工具图标位于 `src/icons` 目录。

如需添加新的工具图标，请在 `src/icons` 目录下新增图标文件。

建议在以下网站查找新图标，以保持风格一致：

- [iconify](https://icon-sets.iconify.design/)
- [icones](https://icones.js.org/)

## 部署方式

详见 [部署说明](https://astro-pure.js.org/docs/deployment)。
