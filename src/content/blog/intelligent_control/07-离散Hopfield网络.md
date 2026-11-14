---
title: "第 7 章 离散 Hopfield 网络"
publishDate: 2026-05-12
description: "离散Hopfield网络：状态更新、吸引子、能量函数、稳定性和外积和法。"
tags:
  - Intelligent Control
  - Course Notes
language: zh-CN
---

# 07 离散 Hopfield 网络

## 1. 本章定位

Hopfield 是典型反馈神经网络。本章考试重点是 DHNN 结构、状态更新、吸引子、能量函数、稳定性条件和外积和法。

## 2. Hopfield 网络概念

前馈网络的输出只由当前输入和权矩阵决定；反馈网络中，网络状态会反馈影响后续状态。

Hopfield 网络分为：

1. 离散型 DHNN。
2. 连续型 CHNN。

课件重点是 DHNN。

## 3. 网络状态

DHNN 中每个神经元输出称为状态：

$$
X=[x_1,x_2,\ldots,x_n]^T
$$

初始状态：

$$
X(0)=[x_1(0),x_2(0),\ldots,x_n(0)]^T
$$

动态演变：

$$
x_j=f(net_j),\quad j=1,2,\ldots,n
$$

## 4. 转移函数与净输入

符号函数：

$$
x_j=\operatorname{sgn}(net_j)=
\begin{cases}
1, & net_j\ge 0\\
-1, & net_j<0
\end{cases}
$$

净输入：

$$
net_j=\sum_{i=1}^{n}(w_{ij}x_i-T_j)
$$

常用约束：

$$
w_{ii}=0,\quad w_{ij}=w_{ji}
$$

网络稳定输出：

$$
\lim_{t\to\infty}X(t)
$$

## 5. 异步与同步工作方式

异步方式：每次只更新一个神经元。

$$
x_j(t+1)=
\begin{cases}
\operatorname{sgn}[net_j(t)], & j=i\\
x_j(t), & j\ne i
\end{cases}
$$

同步方式：所有神经元同时更新。

$$
x_j(t+1)=\operatorname{sgn}[net_j(t)],\quad j=1,2,\ldots,n
$$

## 6. 稳定性与吸引子

若从初态 $X(0)$ 出发，经有限次递归后：

$$
X(t+1)=X(t)
$$

则网络稳定。

吸引子定义：

$$
X=f(WX-T)
$$

吸引子就是网络最终收敛到的稳定状态。

## 7. 能量函数

DHNN 能量函数：

$$
E(t)=-\frac{1}{2}X^T(t)WX(t)+X^T(t)T
$$

状态变化：

$$
\Delta X(t)=X(t+1)-X(t)
$$

能量变化：

$$
\Delta E(t)=E(t+1)-E(t)
$$

异步更新且 $W$ 对称时：

$$
\Delta E(t)=-\Delta x_j(t)net_j(t)\le 0
$$

含义：网络演变过程中能量不增加，最终落入能量极小状态。能量极小状态称为能量井，对应吸引子。

## 8. 稳定性定理

定理 1：

> DHNN 若按异步方式调整状态，且连接权矩阵 $W$ 为对称阵，则对任意初态，网络最终收敛到一个吸引子。

定理 2：

> DHNN 若按同步方式调整状态，且连接权矩阵 $W$ 为非负定对称阵，则对任意初态，网络最终收敛到一个吸引子。

## 9. 吸引子性质

性质 1：

若 $X$ 是吸引子，阈值 $T=0$，且任意节点净输入不为零，则 $-X$ 也是吸引子。

证明关键：

$$
f[W(-X)]=f[-WX]=-f(WX)=-X
$$

性质 2：

若 $X_a$ 是吸引子，则与 $X_a$ 海明距离为 1 的 $X_b$ 一定不是吸引子。

## 10. 外积和法

给定 $P$ 个模式样本：

$$
X^p,\quad p=1,2,\ldots,P
$$

其中：

$$
x_i^p\in\{-1,1\},\quad n>P
$$

权值矩阵：

$$
W=\sum_{p=1}^{P}X^p(X^p)^T
$$

若要求 $w_{jj}=0$：

$$
W=\sum_{p=1}^{P}[X^p(X^p)^T-I]
$$

分量形式：

$$
w_{ij}=
\begin{cases}
\sum_{p=1}^{P}x_i^px_j^p, & i\ne j\\
0, & i=j
\end{cases}
$$

若样本两两正交：

$$
(X^p)^TX^k=
\begin{cases}
0, & p\ne k\\
n, & p=k
\end{cases}
$$

则：

$$
WX^k=(n-P)X^k
$$

因为 $n>P$，所以：

$$
f(WX^k)=X^k
$$

说明给定样本是网络吸引子。

## 11. 本章考点

必背：

1. DHNN 状态与符号函数。
2. 异步与同步更新区别。
3. 吸引子定义。
4. 能量函数。
5. 两个稳定性定理。
6. 外积和法权值设计。
