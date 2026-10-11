# Java Core Visual Lab
《Java 核心技术》主题知识可视化交互学习网站。当前为 MVP，采用无构建依赖的静态单页站点，可直接在浏览器打开 `index.html`。

## 已实现
- 卷 I、卷 II 共 24 章主题导航、搜索、难度标签
- 6 章原创深度学习卡：Java 平台、基本结构、对象与类、集合、并发、Stream
- 数组共享引用、线程状态的交互可视化（简化教学模拟）
- 选择题与答案解析，浏览器 localStorage 保存学习完成状态
- 响应式深色 UI、GitHub Pages 部署工作流

## 知识范围与版权
以 Cay S. Horstmann《Java 核心技术》第 12 版（以 Java 17 为基础）的知识主题为索引，独立撰写概念、示例和题目，不复制书籍正文或配套图示。**当前只有 6 章深入内容，其余 18 章提供学习大纲，不能视作完整全书讲义。** 章节名称与不同中译版可能存在差异。

## 使用
直接双击 `index.html`，或者用 `python -m http.server 8000` 启动本地静态服务。

## 部署
main 分支变更会触发 `.github/workflows/deploy.yml`。首次部署时在 Settings → Pages → Build and deployment 中选择 **GitHub Actions** 作为 Source。上线地址预计为 https://weepwood.github.io/core-java-visual-lab/ ，以 Actions 与 Pages 的实际状态为准。

## 实施路线
- P0：知识总览、六个深度主题、两项交互实验、章节测验与进度（已交付）
- P1：完善 24 章原创课程、常见错误及章节重点
- P2：对象内存图、HashMap 桶结构、Stream 流水线与并发竞态模拟器
- P3：知识依赖图谱、代码运行沙盒、搜索与练习题库
- P4：自动化测试、无障碍、PWA 离线模式和进度导入导出

## 限制
线程演示不是实时 JVM 监测；当前示例不会在线编译或执行 Java；学习状态仅在当前浏览器内保存。
