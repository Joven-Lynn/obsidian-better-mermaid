# Better Mermaid (中文)

一个增强 Obsidian Mermaid 图表浏览体验的插件，支持单击放大、平移缩放和 PNG 导出。

## 功能

- **单击放大** — 阅读模式下单击任意 Mermaid 图表，在全屏弹窗中查看
- **平移与缩放** — 滚轮平移，Ctrl + 滚轮缩放，左键拖拽移动
- **预设缩放** — 快速切换 20%、50%、75%、100% 缩放比例
- **导出 PNG** — 将图表下载为高分辨率 PNG 图片（2x 高清）
- **自定义 CSS** — 注入自己的 CSS 样式，定制 Mermaid 图表外观
- **国际化** — 支持英文和中文界面切换

## 预览

单击 Mermaid 图表 → 打开带磨砂玻璃浮动控件的弹窗：
<img width="1547" height="850" alt="image" src="https://github.com/user-attachments/assets/12ffd099-4f55-4ad9-a2ae-48ec8d4fb31f" />

## 安装

1. 从最新 Release 下载 `main.js`、`manifest.json` 和 `styles.css`
2. 将这三个文件复制到仓库的 `.obsidian/plugins/obsidian-better-mermaid/` 目录
3. 在 Obsidian 设置 → 第三方插件中启用

### 手动构建

```bash
npm install
npm run build
```

然后将 `main.js`、`manifest.json`、`styles.css` 复制到插件目录。

## 使用方式

| 操作 | 控制方式 |
|------|----------|
| 打开弹窗 | 阅读模式下单击 Mermaid 图表 |
| 上下平移 | 鼠标滚轮 |
| 左右平移 | Shift + 鼠标滚轮 |
| 缩放 | Ctrl + 鼠标滚轮 |
| 自由拖拽 | 按住左键拖动 |
| 预设缩放 | 下拉框选择（20% / 50% / 75% / 100%） |
| 下载 PNG | 点击 **下载 PNG** 按钮 |

## 设置

| 设置项 | 说明 | 默认值 |
|--------|------|--------|
| 语言 | 界面语言（English / 中文） | English |
| 启用单击放大 | 开启/关闭单击放大功能 | 开 |
| 弹窗宽度 | 弹窗宽度（视口百分比） | 80% |
| 弹窗高度 | 弹窗高度（视口百分比） | 80% |
| 自定义 CSS | 注入到 Obsidian 的 CSS 规则 | *(空)* |

每个滑块右侧有重置按钮，可恢复默认值。

## 自定义 CSS 示例

```css
/* 修改 Mermaid 主题配色 */
div.mermaid svg {
  filter: invert(1) hue-rotate(180deg);
}

/* 给图表添加边框 */
div.mermaid {
  border: 1px solid var(--background-modifier-border);
  border-radius: 8px;
  padding: 12px;
}
```

## 兼容性

- 最低 Obsidian 版本：**0.15.0**
- 支持桌面端和移动端

## 许可证

MIT
