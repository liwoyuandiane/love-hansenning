# CODEBUDDY.md This file provides guidance to CodeBuddy Code when working with code in this repository.

## 项目概述
这是一个基于 Next.js 14 和 Supabase 的现代化全栈爱情纪念网站，专为情侣设计。网站包含完整的后台管理系统、数据同步功能，支持用户认证和数据持久化。

## 核心架构

### 技术栈
- **前端**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **后端**: Next.js API Routes, Supabase (PostgreSQL)
- **认证**: Supabase Auth
- **部署**: Netlify

### 数据流架构
- 前端组件通过 `lib/supabase.ts` 中的 API 函数直接与 Supabase 交互
- 使用 React Hooks (useState, useEffect) 进行状态管理
- 数据库操作通过 Supabase JavaScript SDK 实现
- 文件上传使用 Supabase Storage

### 数据库结构
项目使用 PostgreSQL 数据库，包含以下主要表：
- `website_config` - 网站基础配置（情侣名字、纪念日期、音乐等）
- `anniversaries` - 纪念日数据
- `wishlist` - 愿望清单
- `explore_locations` - 探索地点
- `photo_gallery` - 照片墙

## 开发命令

### 环境设置
```bash
# 安装依赖
npm install

# 复制环境变量模板
cp .env.local.example .env.local
```

### 开发与构建
```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

### 数据库初始化
1. 在 Supabase 创建项目
2. 执行 `database-schema.sql` 中的 SQL 语句
3. 配置环境变量：`NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 项目结构

### 核心目录
- `app/` - Next.js App Router 页面和 API 路由
  - `page.tsx` - 主页面组件
  - `admin/page.tsx` - 后台管理页面
  - `api/` - API 路由处理程序
- `components/` - 可复用 React 组件
  - `AdminDashboard.tsx` - 后台管理面板
  - `LoveTimer.tsx` - 恋爱计时器
  - 各种管理组件（AnniversaryManager, WishlistManager 等）
- `lib/` - 工具函数和配置
  - `supabase.ts` - Supabase 客户端和 API 函数

### 关键文件说明
- `package.json` - 项目依赖和脚本
- `next.config.cjs` - Next.js 配置
- `tailwind.config.js` - Tailwind CSS 配置
- `database-schema.sql` - 数据库表结构定义
- `netlify.toml` - Netlify 部署配置

## 开发指南

### 添加新功能模块
1. 在 `database-schema.sql` 中创建对应的数据库表
2. 在 `lib/supabase.ts` 中添加类型定义和 API 函数
3. 创建对应的 React 组件（在 `components/` 目录）
4. 集成到主页面和后台管理界面

### 样式定制
- 使用 Tailwind CSS 进行样式设计
- 全局样式定义在 `app/globals.css`
- 响应式设计通过 Tailwind 的响应式类实现

### API 开发
- API 路由位于 `app/api/` 目录
- 使用 Next.js 的 Route Handlers
- 支持 GET、POST、PUT、DELETE 等 HTTP 方法

## 部署说明

### Netlify 部署
1. 构建命令：`npm run build`
2. 发布目录：`.next`
3. 环境变量：配置 Supabase 相关变量

### 环境要求
- Node.js 18+  
- Supabase 项目配置
- 数据库表结构初始化