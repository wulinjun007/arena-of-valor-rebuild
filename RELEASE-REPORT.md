# Release Report — Arena of Valor Fan Rebuild

**Date:** 2026-10-02 · **Commit:** `feat: Arena of Valor fan rebuild — 5-page dark design system site with 68-hero roster, news/esports archives`

## LIVE / 状态

| Channel | URL | Status |
|---|---|---|
| **GitHub Pages（当前生产）** | https://wulinjun007.github.io/arena-of-valor-rebuild/ | **LIVE — 已公网验证**（5 页 + 全部资源 200，桌面/移动实拍通过） |
| GitHub 源仓库 | https://github.com/wulinjun007/arena-of-valor-rebuild | main 已推送（唯一可信源） |
| Netlify | https://arena-of-valor-rebuild.netlify.app | **READY（未发布）** — 账户额度耗尽被平台阻断 |

## Netlify 阻断说明

`POST /deploys` 返回平台错误：**"Account credit usage exceeded — new deploys are
blocked until credits are added"**。站点已创建并配置完毕（name
`arena-of-valor-rebuild`、`sso_login=false` 已关访客保护）。额度恢复后一条命令补上生产：

```bash
cd aov-site && netlify deploy --prod --dir . --site 254fa781-e25c-4f73-95d0-af38eb51e184
```

## 公网验证记录（GitHub Pages）

- 5/5 页面 HTTP 200（index / heroes / news / esports / game）
- 静态资源抽查 6/6 200（CSS、2×JS、英雄卡 PNG、新闻 banner、商店徽章）
- Playwright 线上实拍：桌面 1440 + 移动 390 渲染正确（Yorn 首屏、移动端 44vh 图高钳制生效）
- 交互自测：导航下拉 ✓ 移动端汉堡菜单 ✓ 视频弹窗（YouTube JM_UdSUW1ao）✓
  英雄职业筛选（Mage = 17/68）✓ 英雄详情弹窗 ✓ 新闻分类筛选 ✓

## QA

- 本地 Playwright 全页截图 15 张，无坏图、无控制台错误（唯一 404 已修复：Butterfly
  无 785 featured 原画，改用官方 504 卡片图）
- `prefers-reduced-motion` 降级、focus-visible 焦点环、图片懒加载

## 数据与素材真实性

- 68 英雄 ID→名字映射：官方 JSONP 接口已死（`mws.eutc.ngame.proximabeta.com` 不可达），
  改用官方 504×430 卡片图上烧录的英雄名逐一识图确认；职业六分类经
  arenaofvalor.fandom.com 交叉验证（部分旧模板用 Archer/Initiator 等旧称已归一）
- 新闻/电竞/入门文章：标题、日期、配图均取自官网真实列表页，外链回原文
- 素材来源与版权声明见 `CREDITS.md`（站内页脚亦注明 unofficial fan-made rebuild）

## 已知限制

- GitHub Pages 首次冷访问偶发慢（CDN 预热，回访正常）
- Netlify 通道待额度恢复（见上）
- 部分英雄职业为社区 wiki 口径与官方六分类归一结果（如 Raz/Zill/Maloch 存在 Mage/Assassin
  历史口径差异），已按官方站筛 tab 的六分类对齐
