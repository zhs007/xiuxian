# 代码评审报告（report001）

版本信息

- 仓库：zhs007/xiuxian
- 分支：main
- 提交：bb039a6f8b3e9cc1f3011bd88c431887c13ec620
- 作者：Zerro Zhao <sssxueren@gmail.com>
- 日期：Wed Sep 3 11:37:20 2025 +0800
- 标题：Merge pull request #3 from zhs007/feat/main-scene-and-card-drag%

评审范围

- 架构与配置：package.json、vite.config.ts、tsconfig\*.json、eslint.config.js、index.html
- 前端入口与场景：src/main.ts、src/scenes/StartScene.ts、src/scenes/MainScene.ts
- 逻辑与测试：src/game/logic/startScreen.ts、src/game/logic/startScreen.test.ts
- 服务端：server/index.ts

总体评价

- 工程结构清晰：前端（Pixi + Vite）与后端（Fastify）分离，脚本齐全，TypeScript 严格模式开启。
- Pixi v8 API 使用正确（Federated Pointer Events、eventMode、Assets.load 等），基础交互顺畅。
- 单元测试已覆盖核心逻辑类（StartScreenLogic），并配置了覆盖率收集（限定到逻辑目录）。
- 仍有若干可改进点（资源与场景生命周期、可测试性、脚本与 CI 细化、配置一致性等）。

质量闸门（本次会话实测）

- Lint：PASS（npm run lint 未输出问题）
- 单元测试：PASS（1 文件/4 用例 通过，vitest 运行成功）
- 构建：DEFERRED（当前终端处于 vitest watch 状态未执行构建；建议在本地或 CI 中执行 npm run build 验证）
- 类型检查：基本 PASS（tsconfig 严格，未见编辑器级错误；建议在 CI 中显式运行 tsc --noEmit）

亮点

- 使用设计分辨率 + CSS 等比缩放适配，简单直接，代码可读性好。
- MainScene 拖拽到非线性映射 + 倾斜角做候选判定，手感考虑周到；拖拽开始前取消 tween 防止争抢。
- StartScene 视图与 StartScreenLogic 分离，便于测试与维护；已有基础单测与覆盖率配置。
- ESLint + Prettier + TypeScript 严格选项开启，质量基线较好。

发现的问题与建议

1. 场景切换的资源与事件清理
   - 问题：StartScene 被从 stage 移除但未 destroy；其内部（或后续扩展）可能挂事件或资源，潜在泄漏。
   - 建议：
     - 统一的 Scene 管理器：push/pop 时调用 onShow/onHide/onDestroy；
     - 在切换时对前一 Scene 调用 removeAllListeners()/destroy({ children: true })，或提供自定义 dispose。

2. 拖拽/动画与输入状态的并发
   - 问题：动画进行时继续响应 pointer 可能导致状态竞争（尽管有 killTweensOf）；
   - 建议：飞出动画期间将 card.eventMode 设为 'none'，完成后恢复；或用一个 isAnimating 标志短路输入。

3. 交互/映射逻辑可测试性
   - 问题：MainScene 中映射公式与阈值分散在事件回调里，难以单元测试。
   - 建议：抽取纯函数（如 mapDragToX/rotation、swipeDecision），添加针对边界/非线性系数的单测与快照。

4. 设计常量重复与配置集中
   - 问题：designWidth/designHeight 在多个文件重复定义。
   - 建议：新增 src/config/display.ts 输出 DESIGN_SIZE 等统一常量（以及缩放策略枚举），避免散落。

5. 资源加载与失败兜底
   - 问题：Assets.load 未做失败处理；资源缺失会抛错并阻断。
   - 建议：try/catch + 占位图/重试/上报；并考虑在启动阶段统一预加载与进度反馈。

6. StartScene 交互体验
   - 建议：按钮添加按压/悬停的视觉反馈（色调、缩放、阴影），并为图形容器设置明确 hitArea，避免文本超界影响命中。

7. 构建与脚本/CI 细化
   - 问题：npm run test 默认进入 watch 模式，不利于 CI。
   - 建议：
     - 新增 test:ci: "vitest run"；
     - GitHub Actions：在 push/PR 上运行 lint、tsc --noEmit、vitest run、npm run build，并产出覆盖率工件。

8. tsconfig.node.json include 指向的文件缺失
   - 现状：include 包含 ".eslintrc.cjs"、"prettier.config.js"，而仓库中为 eslint.config.js、.prettierrc。
   - 建议：修正 include 以避免 IDE/工具链潜在解析开销或误报。

9. 服务端 Fastify 健壮性
   - 建议：
     - 增加 CORS（开发可宽松、生产收敛到域白名单），并声明路由 schema（typebox/zod）；
     - 增加优雅关闭（SIGTERM 处理）、host 显式绑定、健康检查路由；
     - 在 Vite 代理与服务端端口/host 通过环境变量统一配置（.env）。

10. 代码一致性与无关注释
    - 现状：MainScene 中存在少量“debug removed”“canceled”等注释；
    - 建议：清理无关注释，统一中文/英文注释风格，保留有价值的意图性说明。

11. 视觉与动画细节
    - 建议：飞出后回中（reset）可考虑动画过渡以减少“瞬移”感；并针对横竖屏切换时的 anchor/布局做适配策略。

12. 安全与依赖
    - 建议：在 CI 中启用 npm audit、renovate/depup；依赖采用 caret 已可接受，注意重大版本变更日志（如 Fastify/Pixi）。

建议的后续步骤（可分支实施）

- chore(config): 提取显示常量与 Scene 管理框架；
- feat(main-scene): 抽取拖拽映射纯函数并补充单测与边界用例；
- chore(scripts): 新增 test:ci 与 tsc:check，完善 GitHub Actions；
- fix(config): 修正 tsconfig.node.json include；
- feat(server): 增加 CORS、schema 校验与优雅关闭；
- perf/ui: 动画阶段禁用输入、回中动画化、按钮态反馈与 hitArea；
- qa: 新增 MainScene 交互逻辑的单测，提升覆盖率（已配置 coverage 目录，可复用）。

附：运行与验证（提示）

- 开发前端：npm run dev（Vite 端口 8080，代理 /api->3000）
- 开发后端：npm run serve（Fastify 3000）
- 测试（CI 模式）：vitest run 或新增脚本 test:ci
- 构建：npm run build（client + server）

—— 本报告由自动化代码评审生成，供参考与改进之用。
