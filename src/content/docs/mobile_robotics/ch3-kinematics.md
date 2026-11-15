---
title: "第3章 移动机器人运动学"
publishDate: 2026-05-13
description: "第3章 移动机器人运动学课程笔记。"
tags:
  - Mobile Robotics
  - Course Notes
language: zh-CN
---

# 第3章 移动机器人运动学

> ⭐ 考试重点章节

---

## 3.1 什么是运动学？

**运动学 (Kinematics)**: 描述机器人机械行为的学科，建立机器人速度与轮子速度、转向角之间的函数关系。

与机械臂运动学的区别：
- 移动机器人可相对环境**无限制运动**
- **没有测量位置的直接方法** → 位置必须随时间积分
- 积分导致**误差累积** → 移动机器人的首要挑战

---

## 3.2 坐标系与位姿

### 两个坐标系
- **惯性系 $\{X_I, Y_I\}$**: 全局固定参考系
- **机器人系 $\{X_R, Y_R\}$**: 固连于机器人本体

### 位姿与速度

$$
\xi_I = \begin{bmatrix} x & y & \theta \end{bmatrix}^{\mathsf{T}}
$$

$$
\dot{\xi}_I = \begin{bmatrix} \dot{x} & \dot{y} & \dot{\theta} \end{bmatrix}^{\mathsf{T}}
$$

$$
\dot{\xi}_R = \begin{bmatrix} v_{xR} & v_{yR} & \dot{\theta} \end{bmatrix}^{\mathsf{T}}
$$

### 坐标变换

旋转矩阵 $R(\theta)$:

$$
R(\theta) = \begin{bmatrix}
\cos\theta & \sin\theta & 0 \\
-\sin\theta & \cos\theta & 0 \\
0 & 0 & 1
\end{bmatrix}
$$

逆映射 $R^{-1}(\theta) = R^{\mathsf{T}}(\theta)$:

$$
R^{-1}(\theta) = \begin{bmatrix}
\cos\theta & -\sin\theta & 0 \\
\sin\theta & \cos\theta & 0 \\
0 & 0 & 1
\end{bmatrix}
$$

---

## 3.3 前向运动学模型

### 问题
给定机器人几何特征和轮子转速 → 求机器人运动速度。

为什么不直接求位置？→ 没有闭合形式，需积分。

**前向运动学**（轮速 → 机器人速度）:

$$
\dot{\xi} = f(\dot{\phi}_1, \ldots, \dot{\phi}_n,\; \beta_1, \ldots, \beta_m,\; \dot{\beta}_1, \ldots, \dot{\beta}_m)
$$

**逆向运动学**（机器人速度 → 轮速）:

$$
\begin{bmatrix} \dot{\phi} & \beta & \dot{\beta} \end{bmatrix}^{\mathsf{T}} = f(\dot{x}, \dot{y}, \dot{\theta})
$$

---

## 3.4 差动驱动机器人运动学 ⭐核心

### 基本设定
- 两标准轮，半径 $r$，半轮距 $l$（即轮距 $2l$）
- 中心点 $P$ 在两轮中点
- 左轮转速 $\dot{\phi}_1$，右轮转速 $\dot{\phi}_2$

### 轮速与速度关系

**左轮线速度**:

$$
r\dot{\phi}_1 = v + l\dot{\theta}
$$

**右轮线速度**:

$$
r\dot{\phi}_2 = v - l\dot{\theta}
$$

### 本体坐标系速度

*（$v_{yR}=0$ 是非完整约束）*

$$
v_{xR} = \frac{r}{2}(\dot{\phi}_1 + \dot{\phi}_2)
$$

$$
v_{yR} = 0
$$

$$
\dot{\theta} = \frac{r}{2l}(\dot{\phi}_1 - \dot{\phi}_2)
$$

### 惯性坐标系速度

$$
\dot{x} = v_{xR} \cos\theta = \frac{r}{2}(\dot{\phi}_1 + \dot{\phi}_2) \cos\theta
$$

$$
\dot{y} = v_{xR} \sin\theta = \frac{r}{2}(\dot{\phi}_1 + \dot{\phi}_2) \sin\theta
$$

$$
\dot{\theta} = \frac{r}{2l}(\dot{\phi}_1 - \dot{\phi}_2)
$$

### 矩阵形式

$$
\dot{\xi}_R = \begin{bmatrix}
r/2 & r/2 \\
0 & 0 \\
r/(2l) & -r/(2l)
\end{bmatrix}
\begin{bmatrix} \dot{\phi}_1 \\ \dot{\phi}_2 \end{bmatrix}
$$

### 关键结论

| 条件 | 运动形式 |
|------|---------|
| $\dot{\phi}_1 = \dot{\phi}_2$ | 直线运动 |
| $\dot{\phi}_1 \neq \dot{\phi}_2$ | 绕 ICR 的圆弧运动 |
| $\dot{\phi}_1 = -\dot{\phi}_2$ | 原地旋转 ($v=0$) |

---

## 3.5 轮子的运动学约束 ⭐核心

### 前提假设
1. 水平面上运动
2. 轮子与地面**点接触**
3. 轮子不可变形，纯转动
4. **没有任何滑动**
5. 绕触点没有转动摩擦
6. 操纵轴与平面垂直
7. 轮子与刚性框架连接

### 约束参数

| 参数 | 含义 |
|------|------|
| $\alpha$ | 轮子在机器人坐标系中的角度位置 |
| $\beta$ | 转向角（固定标准轮 $\beta=0$） |
| $l$ | 轮子到中心点 $P$ 的距离 |
| $r$ | 轮子半径 |
| $\dot{\phi}$ | 轮子转速 |

### (1) 固定标准轮的滚动约束

> 本体速度在轮平面方向的分量 = 轮子线速度

$$
\begin{bmatrix} \sin(\alpha+\beta) & -\cos(\alpha+\beta) & -l\cos\beta \end{bmatrix} \cdot R(\theta) \cdot \dot{\xi}_I = r\dot{\phi}
$$

### (2) 固定标准轮的滑动约束

> 本体速度在垂直轮平面方向的分量 = 0（不能侧滑！）

$$
\begin{bmatrix} \cos(\alpha+\beta) & \sin(\alpha+\beta) & l\sin\beta \end{bmatrix} \cdot R(\theta) \cdot \dot{\xi}_I = 0
$$

### (3) 受操纵标准轮
- 滚动和滑动约束**形式不变**
- $\beta$ 成为**操纵变量**（可变）

### (4) 小脚轮 (Castor)
- 滚动约束形式不变，$\beta$ 也是时间变量
- 滑动约束需**额外考虑 $\dot{\beta}$**:

$$
\begin{bmatrix} \cos(\alpha+\beta) & \sin(\alpha+\beta) & d + l\sin\beta \end{bmatrix} \cdot R(\theta) \cdot \dot{\xi}_I + d\dot{\beta} = 0
$$

### (5) 瑞典轮 (Swedish Wheel)
- 滚动约束需考虑小轮轴面（参数 $\gamma$）:

$$
\begin{bmatrix} \sin(\alpha+\beta+\gamma) & -\cos(\alpha+\beta+\gamma) & -l\cos(\beta+\gamma) \end{bmatrix} \cdot R(\theta) \cdot \dot{\xi}_I = r\dot{\phi}\cos\gamma
$$

- **没有滑动约束！** ⭐

### (6) 球形轮
- 滚动约束与固定标准轮相同
- 滑动约束与固定标准轮相同

---

## 3.6 约束方程的矩阵形式

设有 $N = N_f + N_s$ 个标准轮：

**滚动约束**:

$$
J_1(\beta_s) \cdot R(\theta) \cdot \dot{\xi}_I + J_2 \cdot \dot{\phi} = 0
$$

其中 $J_2 = \operatorname{diag}(r_1, \ldots, r_N)$（对角阵）。

**滑动约束**:

$$
C_1(\beta_s) \cdot R(\theta) \cdot \dot{\xi}_I = 0
$$

---

## 3.7 差动驱动机器人约束实例

### 左轮: $\alpha_1 = \pi/2,\; \beta_1 = 0$
- 滚动: $v_{xR} - l\dot{\theta} = r\dot{\phi}_1$
- 滑动: $v_{yR} = 0$

### 右轮: $\alpha_2 = -\pi/2,\; \beta_2 = -\pi$
- 滚动: $v_{xR} + l\dot{\theta} = r\dot{\phi}_2$
- 滑动: $v_{yR} = 0$

### 矩阵形式

$$
\begin{bmatrix}
1 & 0 & -l \\
1 & 0 & l \\
0 & 1 & 0
\end{bmatrix}
\dot{\xi}_R =
\begin{bmatrix}
r & 0 \\
0 & r \\
0 & 0
\end{bmatrix}
\begin{bmatrix} \dot{\phi}_1 \\ \dot{\phi}_2 \end{bmatrix}
$$

### ⚠️ 轴安装不正的后果
如果右轮 $\alpha_2 \neq -\pi/2$（安装偏了），会产生额外的滑动约束 → **机器人不能移动！**

---

## 3.8 自行车模型

- 后轮: 固定标准轮
- 前轮: 操纵标准轮（转向角 $\beta$）

滑动约束 (前轮):

$$
-\sin\beta \cdot v_{xR} + \cos\beta \cdot v_{yR} + l\cos\beta \cdot \dot{\theta} = 0
$$

---

## 3.9 全向机器人（三瑞典轮）

三个瑞典轮 $\gamma=0$，$\alpha_1=\pi/3,\; \alpha_2=\pi,\; \alpha_3=-\pi/3$

只有滚动约束，**没有滑动约束** → 全向运动（$\delta_M = 3$）

---

## 3.10 运动学位置控制（了解）

### 开环控制
- 轨迹分割为直线+圆弧段
- 缺点: 预计算难、不光滑、不能适应动态变化

### 反馈控制
- 寻找控制矩阵 $K$，使 $v(t)=K \cdot e$
- 驱动误差 $e \to 0$: $\lim_{t\to\infty} e(t) = 0$
- 极坐标转换后系统局部指数稳定条件:

$$
k_\rho > 0,\quad k_\beta < 0,\quad k_\alpha - k_\rho > 0
$$

---

## 3.11 非完整系统

### 完整 vs 非完整

**完整约束**: 可表示为位置变量的显函数 $C(q)=0$
- 例: 固定操纵轮沿直线运行 → $v_x = r\dot{\phi}$ → $x = x_0 + \phi r$

**非完整约束**: 需微分关系 $C(q, \dot{q})=0$，不能仅用位置变量表示
- 固定和可操纵标准轮产生非完整约束
- 不能通过积分得到最终点！
- 各轮行走距离不足以确定位置，还需知道运动过程的时间函数

### 可积性条件
对于 $ds = dx \cos\theta + dy \sin\theta$，检查二阶混合偏导:

$$
\frac{\partial^2 s}{\partial x \partial \theta} = -\sin\theta \neq 0 = \frac{\partial^2 s}{\partial \theta \partial x}
$$

第 2 和第 3 等式不成立 → **非完整系统**

---

## 考前速记

| 知识点 | 记忆要点 |
|--------|---------|
| 运动学定义 | 速度与轮速的关系，不考虑力 |
| 差动驱动核心公式 | $v = (r\dot{\phi}_1+r\dot{\phi}_2)/2,\; \dot{\theta} = (r\dot{\phi}_1-r\dot{\phi}_2)/(2l)$ |
| 固定标准轮 | 有滚动约束 + 滑动约束 |
| 瑞典轮 | 只有滚动约束，无滑动约束 |
| 约束矩阵 | $J_1 R \dot{\xi}_I + J_2 \dot{\phi} = 0$ (滚动), $C_1 R \dot{\xi}_I = 0$ (滑动) |
| 非完整约束 | 标准轮产生，不能积分得到位置 |
| 轴不正 → 不能动 | 差动两轮必须同轴！ |
