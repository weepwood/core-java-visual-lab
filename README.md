# ☕ Java Core Lab

《Java 核心技术》可视化交互学习平台。以 Cay S. Horstmann《Java 核心技术》第 12 版（Java 17）的两卷 24 章为知识索引，提供独立编写的讲解、Java 代码片段、常见误区、单选测验与交互式概念模拟器。

**在线网站：** https://weepwood.github.io/core-java-visual-lab/

## 已实现（v0.2）

- **24 章内容**：卷 I 12 章、卷 II 12 章，每章包括摘要、核心原理、至少 3 条知识要点、2 条常见误区、Java 示例与 1 道有解析的选择题。原先 18 个占位章节现已补充正文。
- **7 个互动模拟器**：数组引用共享、栈引用与堆对象可达性、HashMap 哈希桶与阈值扩容、泛型类型擦除、Stream 流水线、线程丢失更新与 AtomicInteger 对比、线程状态机。
- **Notion 风格的浅色布局**：米白工作区侧栏、轻量导航、文档式正文、知识列表、轻量标签、移动端折叠菜单，以及复制代码功能。
- **学习功能**：全文知识点搜索、卷册筛选、收藏章节、完成状态与进度可视化；进度保存在本浏览器 localStorage，延续旧版存储键。
- **质量检查**：Node.js 内置测试运行器，验证章节数据完整性、测验答案索引与各实验的关键状态边界；GitHub Actions 在验证成功后部署 GitHub Pages。

## 快速开始

运行本地静态服务（ES Modules 不建议直接使用 file:// 打开）：

```bash
python -m http.server 8000
# 打开 http://localhost:8000
```

使用 Node.js >= 20 做无需安装依赖的语法与内容检查：

```bash
npm run check
```

目录结构：

```
index.html                HTML 模块入口
src/content.js            24 章课程数据
src/labs.js               7 种交互模拟器状态及可视化
src/app.js                导航、搜索、测验、收藏与进度
src/style.css             浅色响应式样式
tests/content.test.mjs    内容与模拟器测试
.github/workflows/deploy.yml  校验 + Pages 自动部署
```

## 内容准确性边界

1. 该站是原创的学习辅助资料，不是原书授权电子版，不复制原书正文、原插图或习题；不同版本的原书章名、顺序可能不同。
2. 当前覆盖 24 个章节的**教学概览与关键点**，但不是每章完整细目讲义：每章一段原理综述、三条以上知识点、两条误区、一段案例、一题自测。后续需要扩写成多节、更多例题和场景。
3. HashMap 实验采用 **容量 4 → 8 的缩小模型**，以便快速展示碰撞和阈值行为，不等于标准 HashMap 的默认容量；不演示树化。
4. 泛型展示“擦除后的概念形式”而不是 javac 反编译输出；线程演示是固定交错的教学模型，不是实际调度追踪；GC “不可达”不代表立即回收。
5. 当前代码片段有独立可运行的例子，也有需要外围方法或外部文件/数据源的片段。在线网页目前不执行用户输入的 Java 代码。

Java 17 权威规范和 API：[Java SE 17 Specifications](https://docs.oracle.com/en/java/javase/17/docs/specs/index.html) · [Stream API](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/stream/Stream.html)

## 后续计划

- 丰富各章为分节教材，每章更多题目、变式实验与工程案例。
- 加入可搜索的知识关系图、代码运行环境（隔离执行）、章节依赖学习路线。
- 增加浏览器 E2E / 可视化回归、无障碍审计、PWA 离线学习与导出进度。
- 如未来状态管理变复杂，再考虑 React/TypeScript 迁移；当前零依赖 ES Modules 便于直接静态部署。

## 设计灵感

视觉参考 Notion 的浅色工作区设计模式（侧边栏、文档排版、轻量属性标签），不是对 Notion 官方客户端的复制。Java Core Lab 的内容与交互均为原创。
