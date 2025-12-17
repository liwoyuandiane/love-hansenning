# 部署指南

## 1. Supabase 数据库配置

### 1.1 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并注册账号
2. 点击 "New Project" 创建新项目
3. 选择项目名称和数据库密码
4. 选择离你最近的地域
5. 等待项目创建完成

### 1.2 执行数据库脚本

1. 在 Supabase 控制台进入 SQL Editor
2. 复制 `database-schema.sql` 文件内容
3. 粘贴到 SQL Editor 并执行
4. 验证表是否创建成功

### 1.3 配置 Authentication

1. 进入 Authentication → Settings
2. 启用 "Email" 认证方式
3. 配置 SMTP 设置（可选）
4. 创建管理员用户：
   - 进入 Authentication → Users
   - 点击 "Add User"
   - 输入邮箱和密码
   - 记录登录信息

### 1.4 获取 API Keys

1. 进入 Settings → API
2. 记录以下信息：
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - anon public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

## 2. Netlify 部署配置

### 2.1 准备 GitHub 仓库

1. 在 GitHub 创建新仓库
2. 将代码推送到仓库
3. 确保所有文件已提交

### 2.2 连接 Netlify

1. 访问 [Netlify](https://netlify.com) 并登录
2. 点击 "Add new site" → "Import an existing project"
3. 选择 GitHub 并授权
4. 选择你的仓库

### 2.3 构建设置

在部署设置中配置：

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18

### 2.4 环境变量配置

在 Netlify 的 Site settings → Environment variables 中添加：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
```

### 2.5 部署

1. 点击 "Deploy site"
2. 等待构建完成
3. 访问生成的 URL 测试网站

## 3. 域名配置（可选）

### 3.1 自定义域名

1. 在 Netlify 进入 Domain management
2. 点击 "Add custom domain"
3. 输入你的域名
4. 按照提示配置 DNS

### 3.2 SSL 证书

Netlify 会自动提供免费的 SSL 证书，无需额外配置。

## 4. 验证部署

### 4.1 功能测试

访问以下页面验证功能：

- **首页**: `https://your-domain.com`
- **后台管理**: `https://your-domain.com/admin`
- 使用之前创建的管理员账号登录

### 4.2 数据同步测试

1. 在后台管理中添加一些数据
2. 刷新首页查看数据是否同步显示
3. 测试图片上传和音乐播放功能

## 5. 常见问题

### 5.1 构建失败

- 检查环境变量是否正确配置
- 确认 Node.js 版本为 18
- 查看构建日志中的错误信息

### 5.2 数据库连接失败

- 确认 Supabase URL 和 Key 正确
- 检查网络连接是否正常
- 验证 Supabase 项目是否正常运行

### 5.3 认证问题

- 确认 Supabase Auth 已启用
- 检查用户是否已创建
- 验证邮箱和密码是否正确

## 6. 维护和更新

### 6.1 代码更新

1. 在本地修改代码
2. 推送到 GitHub
3. Netlify 会自动重新部署

### 6.2 数据库备份

在 Supabase 控制台可以定期备份数据库：

1. 进入 Database → Backups
2. 点击 "Create backup"
3. 下载备份文件

### 6.3 监控和日志

- Netlify 提供构建日志和访问日志
- Supabase 提供数据库监控和查询分析
- 定期检查网站性能和安全性

## 7. 安全建议

1. **定期更新依赖**: 使用 `npm audit` 检查安全漏洞
2. **强密码策略**: 确保管理员密码强度足够
3. **HTTPS 强制**: Netlify 默认启用 HTTPS
4. **定期备份**: 定期备份数据库和文件
5. **监控访问**: 关注异常访问模式

## 8. 技术支持

如果遇到问题，可以：

1. 查看 Netlify 和 Supabase 官方文档
2. 检查项目 README.md 中的说明
3. 在项目仓库提交 Issue
4. 联系技术支持团队