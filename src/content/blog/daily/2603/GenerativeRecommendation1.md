---
title: "Generative Recommendation 1"
publishDate: 2026-01-25
description: 'Paper Reading on Generative Recommendation'
tags:
  - PaperReading
  - Generative Recommendation
---

# Generative Recommendation

## Recommendation as Language Processing (RLP): A Unified Pretrain, Personalized Prompt & Predict Paradigm (P5)
[[2203.13366] Recommendation as Language Processing (RLP): A Unified Pretrain, Personalized Prompt & Predict Paradigm (P5)](https://arxiv.org/abs/2203.13366)

重要思想是将推荐视为语言处理 (RLP)，使用了预训练的 T5 (Text-to-Text Transfer Transformer) 模型结构，传统推荐是输出一个根据概率的排序，而 P5 的输出就是像大模型一样逐个字生成

涵盖了推荐中的多种推荐任务：

- 评分预测 (Rating Prediction)：询问用户对物品的评分
- 序列推荐 (Sequential Recommendation)：根据历史行为预测下一个物品
- 推荐解释 (Explanation)： 解释为什么向用户推荐某个物品
- 评论汇总 (Review Summarization)：总结用户对物品的评价
- 直接推荐 (Direct Recommendation)：从候选池中直接挑选物品，类似于重排和 Top-K 推荐

关键问题：大模型 LLM 用于推荐系统时，自然语言具有语义，而 ID 无意义，不能直接让 T5 处理 ID，解决方法是将每个 Item ID 和 User ID 当做一个不可分割的 Token 加入到 T5 的词表中，模型会为每个用户或者物品学习到一个独立的 Embedding 