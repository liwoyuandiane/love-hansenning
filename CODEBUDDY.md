# CODEBUDDY.md This file provides guidance to CodeBuddy Code when working with code in this repository.

## 项目概述
这是一个浪漫爱情纪念单页面应用，专为情侣设计。网站包含了计时器、纪念日记录、愿望清单、地点探索和记忆墙等功能。

## 核心架构

### 单文件应用结构
- 整个应用位于 `index.html` 文件中，包含 HTML、CSS 和 JavaScript
- 使用内联样式和脚本，无外部依赖
- 数据持久化通过浏览器 localStorage 实现

### 主要功能模块
1. **计时器系统** - 精确计算从指定日期开始的恋爱时长
2. **纪念日管理** - 记录重要日期和事件
3. **愿望清单** - 共同目标规划
4. **探索地点** - 旅行计划标记
5. **记忆墙** - 展示重要时刻
6. **密码保护** - 敏感操作需要密码验证 (默认密码: 1234)

### 数据存储结构
```javascript
{
  anniversary: [{id, title, date}],
  wishlist: [{id, title, description}],
  explore: [{id, title, description}]
}
```

## 开发指南

### 运行方式
- 直接在浏览器中打开 `index.html` 文件
- 无需构建过程或依赖安装

### 主要操作点
- **修改纪念日日期**: 更新计时器相关的日期设置
- **修改默认密码**: 更新 `PASSWORD` 常量
- **添加新功能模块**: 在 `data` 对象中添加对应数组，并更新相关UI和事件处理

### 样式定制
- 主要颜色主题在 CSS 变量中定义
- 响应式设计通过媒体查询实现
- 动画效果使用 CSS keyframes 定义

## 注意事项
- 这是一个纯静态网站，无需服务器
- 所有数据存储在浏览器本地，更换设备会丢失数据
- 密码验证用于保护敏感操作（添加/删除内容）
- 音乐播放功能依赖外部音频链接