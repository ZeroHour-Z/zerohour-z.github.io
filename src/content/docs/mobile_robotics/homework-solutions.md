---
title: "作业题解析"
publishDate: 2026-05-13
description: "移动机器人作业题解析：差动驱动、双目视觉、机动性、定位与规划相关题目整理。"
tags:
  - Mobile Robotics
  - Course Notes
  - Homework
language: zh-CN
---

# 作业题解析

> 所有题目来自 2026 Homework.pdf

---

## 题1: 差动驱动运动学计算

### 题目
差动驱动机器人，左轮直径 $2\mathrm{m}$ ($r_1 = 1\mathrm{m}$)，右轮直径 $3\mathrm{m}$ ($r_2 = 1.5\mathrm{m}$)，半轮距 $l = \pi/5\ \mathrm{m}$。机器人朝向 $\theta = \pi/4$，两轮以 $\omega = 6\ \mathrm{rad/s}$ 转动。求 $\dot{x}, \dot{y}, \dot{\theta}$。

### 解

**已知**: $r_1 = 1$, $r_2 = 1.5$, $l = \pi/5$, $\theta = \pi/4$, $\dot{\phi}_1 = \dot{\phi}_2 = 6$

**本体速度**:

$$
v_{xR} = \frac{r_1 \dot{\phi}_1 + r_2 \dot{\phi}_2}{2} = \frac{1 \times 6 + 1.5 \times 6}{2} = 7.5\ \mathrm{m/s}
$$

$$
v_{yR} = 0
$$

$$
\dot{\theta} = \frac{r_1 \dot{\phi}_1 - r_2 \dot{\phi}_2}{2l} = \frac{6 - 9}{2\pi/5} = -\frac{7.5}{\pi} \approx -2.387\ \mathrm{rad/s}
$$

**惯性系速度**:

$$
\dot{x} = v_{xR} \cos\theta = 7.5 \times \cos(\pi/4) = 7.5 \times \frac{\sqrt{2}}{2} \approx 5.303\ \mathrm{m/s}
$$

$$
\dot{y} = v_{xR} \sin\theta = 7.5 \times \sin(\pi/4) = 7.5 \times \frac{\sqrt{2}}{2} \approx 5.303\ \mathrm{m/s}
$$

$$
\dot{\theta} = -\frac{7.5}{\pi} \approx -2.387\ \mathrm{rad/s}
$$

### 关键点
- 两轮直径不同时，转速相同也会产生角速度 ($\dot{\theta} \neq 0$)
- $\dot{\theta}$ 的符号取决于哪边轮子大（右轮大 → 左转，$\dot{\theta}$ 为负）
- 惯性系速度需通过 $\cos\theta$ / $\sin\theta$ 投影

---

## 题2: 机动性分析

### 题目
对以下情况确定 $\delta_m, \delta_s, \delta_M$:
(a) 自行车 (b) 单球形轮动态平衡机器人 (c) 汽车 (d) 三瑞典轮机器人

### 解

| 机器人 | $\delta_m$ | $\delta_s$ | $\delta_M$ | 分析 |
|--------|-----------|-----------|-----------|------|
| **(a) 自行车** | 1 | 1 | **2** | 后轮固定 (1 个滑动约束) + 前轮操纵 |
| **(b) 单球形轮** | 3 | 0 | **3** | 球形轮无滑动约束，全向运动 |
| **(c) 汽车** | 1 | 1 | **2** | $N_f=2$ 同轴 → $\operatorname{rank}[C_{1f}]=1$; $N_s=2$ 同轴 → $\delta_s=1$ |
| **(d) 三瑞典轮** | 3 | 0 | **3** | 瑞典轮无滑动约束，全向机器人 |

### 关键判断规则
1. 固定标准轮 → 每个产生一个滑动约束 → 降低 $\delta_m$
2. **同轴的同类型轮**只计为 1 个约束（$\operatorname{rank}=1$ 而非 $N$）
3. 瑞典轮 → 无滑动约束 → 不降低 $\delta_m$
4. 操纵轮 → 提供 $\delta_s$，但自身也产生约束

---

## 题3: 双目视觉 — 对齐摄像机参数

### 题目
左右摄像机方向完全对准，成像面共面，$x$ 共轴，基线 $b=0.5\mathrm{m}$。
写出 $r'_r = R \cdot r'_l + r_0$ 中的 $R$ 和 $r_0$。

### 解

**旋转矩阵 $R$**:

$$
R = \begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix} = I \quad \text{(单位阵)}
$$

因为两摄像机方向完全对准，无旋转。

**平移向量 $r_0$**:

$$
r_0 = \begin{bmatrix} -b \\ 0 \\ 0 \end{bmatrix} = \begin{bmatrix} -0.5 \\ 0 \\ 0 \end{bmatrix}
$$

右摄像机相对左摄像机沿 $x$ 轴向左偏移 $b = 0.5\mathrm{m}$。

---

## 题4: 双目视觉 — 深度计算

### 题目
$f = 100\ \mathrm{mm} = 0.1\ \mathrm{m}$。P 点在左摄像机成像 $(0.005, 0.008)$，右摄像机成像 $(0.010, 0.008)$。求 P 点离左右摄像机透镜的距离。

### 解

**第 1 步: 验证共轭对**
$y_l = y_r = 0.008$ → 确认是共轭对（同一条表偏振线）。

**第 2 步: 计算视差**

$$
d = x_l - x_r = 0.005 - 0.010 = -0.005\ \mathrm{m}, \quad |d| = 0.005\ \mathrm{m}
$$

**第 3 步: 计算深度 $Z$**

$$
Z = \frac{b \cdot f}{|d|} = \frac{0.5 \times 0.1}{0.005} = 10\ \mathrm{m}
$$

**第 4 步: 3D 位置**

$$
X = Z \cdot \frac{x_l}{f} = 10 \times \frac{0.005}{0.1} = 0.5\ \mathrm{m}
$$

$$
Y = Z \cdot \frac{y_l}{f} = 10 \times \frac{0.008}{0.1} = 0.8\ \mathrm{m}
$$

$P$ 点离左右摄像机透镜垂直距离均为 $\approx 10\ \mathrm{m}$。

---

## 题5: 3×3 滤波核计算

### 题目
用以下滤波器对 $4 \times 4$ 图像滤波:
- (a) $3 \times 3$ 加权均值滤波器，边界补 $0$
- (b) $3 \times 3$ 中值滤波器，不处理边界

### 解题方法

#### (a) 加权均值滤波
边界补 $0$ → 图像外扩展一圈 $0$，输出仍为 $4 \times 4$。

对每个像素 $(i,j)$，取其 $3 \times 3$ 邻域（边界外为 $0$），与核逐元素相乘后求和。

#### (b) 中值滤波
不处理边界 → 输出为 $2 \times 2$（仅内部像素）。

对每个内部像素 $(i,j)$，取其 $3 \times 3$ 邻域的 $9$ 个值，**排序后取中值**（第 5 个）。

### 注意
- 加权均值: 核与窗口点乘后累加
- 中值滤波: 排序 → 取中 → 对椒盐噪声效果好

---

## 各题考点对应

| 题号 | 考点 | 对应章节 |
|------|------|---------|
| 1 | 差动驱动运动学 | 第 3 章 |
| 2 | 机动性 $\delta_m / \delta_s / \delta_M$ | 第 3 章 (机动性) |
| 3 | 双目视觉旋转/平移参数 | 第 4 章 (计算机视觉) |
| 4 | 双目视觉深度计算 $Z = b \cdot f / d$ | 第 4 章 (计算机视觉) |
| 5 | 3×3 滤波核（均值/中值） | 第 4 章 (图像处理) |

---

## 解题公式速查

| 公式 | 用途 |
|------|------|
| $v = (r_1 \dot{\phi}_1 + r_2 \dot{\phi}_2)/2$ | 差动驱动平移速度 |
| $\dot{\theta} = (r_1 \dot{\phi}_1 - r_2 \dot{\phi}_2)/(2l)$ | 差动驱动角速度 |
| $\dot{x} = v \cos\theta,\; \dot{y} = v \sin\theta$ | 本体 → 惯性系投影 |
| $\delta_m = 3 - \operatorname{rank}[C_1]$ | 活动性程度 |
| $\delta_s = \operatorname{rank}[C_{1s}]$ | 可操纵度 |
| $\delta_M = \delta_m + \delta_s$ | 机器人机动性 |
| $Z = b \cdot f / |d|$ | 双目视觉深度 |
| $d = x_l - x_r$ | 双目视差 |
| $r_0 = [-b, 0, 0]^{\mathsf{T}}$ | 对齐摄像机平移 |
