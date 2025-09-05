# Plan: Refactor server out of game app

## 1. 原始需求理解

用户希望重构项目，将 `apps/game/server` 从 `apps/game` 中完全独立出来。目前文件结构上 `apps/server` 已经独立，但项目配置（特别是 `apps/game/tsconfig.json`）仍然残留着旧的结构引用，需要清理。同时需要确保 npm scripts 也能正常工作。

## 2. 目标

- 移除 `apps/game` 中对旧 `server` 目录的所有引用。
- 验证清理后 `game` 和 `server` 应用仍能独立构建和运行。
- 确保整个 monorepo 的开发、构建和测试流程正常。
- 按照要求更新项目文档。

## 3. 任务分解

1.  **清理配置文件**:
    -   修改 `apps/game/tsconfig.json` 文件，从 `include` 数组中移除 `"server"`。

2.  **验证修改**:
    -   在 `apps/game` 目录下运行 `pnpm build`，确保游戏前端可以独立成功构建。
    -   在 `apps/game` 目录下运行 `pnpm test`, 确保测试不受影响。
    -   在根目录运行 `pnpm dev`，确保开发服务器（Vite）和后端服务（Fastify）可以正常协同工作。

3.  **创建任务报告**:
    -   任务完成后，在 `jules/` 目录下创建 `plan006-report.md`，记录执行过程、遇到的问题和解决方案。

4.  **更新项目文档**:
    -   更新根目录下的 `jules.md`，添加本次重构的相关信息。
    -   阅读 `agents.md`，判断是否需要更新，如果需要则进行更新。

5.  **提交代码**:
    -   在所有步骤完成后，提交代码。
