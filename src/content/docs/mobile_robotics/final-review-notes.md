---
title: "移动机器人期末复习笔记 — 索引"
publishDate: 2026-05-13
description: "移动机器人期末复习笔记 — 索引课程笔记。"
tags:
  - Mobile Robotics
  - Course Notes
  - Final Review
language: zh-CN
---

# 移动机器人期末复习笔记 — 索引

> 按章节整理的复习笔记，每个章节一个独立文件。点击下方链接跳转。

---

## 📂 章节笔记

| 章节 | 文件 | 核心内容 |
|------|------|---------|
| 第1章 | [第1章-简介](./ch1-introduction/) | 导航四模块、3W、基本概念 |
| 第2章 | [第2章-运动](./ch2-locomotion/) | 四种轮形、腿式 vs 轮式 |
| 第3章 | [第3章-运动学](./ch3-kinematics/) ⭐ | 差动驱动公式、轮子约束、非完整系统 |
| 机动性 | [第3章补充-机动性](./ch3-maneuverability/) ⭐ | $\delta_m/\delta_s/\delta_M$、ICR、完整性 |
| 第4章 | [第4章-感知](./ch4-perception/) ⭐ | 传感器分类、双目视觉、Sobel、霍夫变换 |
| 第5章 | [第5章-定位](./ch5-localization/) ⭐ | 马尔可夫定位、ACT/SEE、卡尔曼滤波 |
| 第6章 | [第6章-规划与导航](./ch6-planning-navigation/) | 可视图/Voronoi/单元格/势场法 |

---

## 📝 作业 & 指南

| 文件 | 内容 |
|------|------|
| [作业题解析](./homework-solutions/) | 5 道作业题完整解答 |
| [考前重点指南](./exam-priority-guide/) | 优先级排序 + 课件-笔记对照 + 复习策略 |

---

## 🔑 考试公式速查

### 差动驱动
$$
v = \frac{r\dot{\phi}_1 + r\dot{\phi}_2}{2},\quad \dot{\theta} = \frac{r\dot{\phi}_1 - r\dot{\phi}_2}{2l},\quad \dot{x}=v\cos\theta,\; \dot{y}=v\sin\theta
$$

### 机动性
$$
\delta_m = 3 - \operatorname{rank}[C_1],\quad \delta_s = \operatorname{rank}[C_{1s}],\quad \delta_M = \delta_m + \delta_s
$$

### 双目视觉
$$
Z = \frac{b \cdot f}{|d|},\quad d = x_l - x_r,\quad r_0 = [-b, 0, 0]^{\mathsf{T}}
$$

### 马尔可夫
$$
p_t(l \mid o_t) = \sum_{l'} p(l \mid l', o_t) \cdot p_{t-1}(l'),\quad p_t(l) \propto p(i \mid l) \cdot p_t(l \mid o_t)
$$

### Sobel 3×3
$$
G_x = \begin{bmatrix} -1 & 0 & 1 \\ -2 & 0 & 2 \\ -1 & 0 & 1 \end{bmatrix},\quad
G_y = \begin{bmatrix} -1 & -2 & -1 \\ 0 & 0 & 0 \\ 1 & 2 & 1 \end{bmatrix}
$$

---

*控制不考，避障不考。时间砸在 P0 上。*
