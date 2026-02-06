# 🌿 Branch Strategy

Dự án này sử dụng **2 branches** để support cả Vercel và Cloudflare Pages.

---

## 📋 Branches

### 1️⃣ `vercel` branch
**Deploy target:** Vercel  
**Next.js version:** 16.1.4 (latest, secure)

✅ **Features:**
- Next.js 16.1.4 - Bảo mật, mới nhất
- Edge Runtime API routes
- Không có Cloudflare packages
- Build command: `npm run build`

**Deploy:**
```bash
git checkout vercel
git push origin vercel
```

Vercel tự động deploy từ branch `vercel`.

---

### 2️⃣ `cloudflare` branch
**Deploy target:** Cloudflare Pages  
**Next.js version:** 15.5.2 (compatible với @cloudflare/next-on-pages)

✅ **Features:**
- Next.js 15.5.2
- @cloudflare/next-on-pages adapter
- Wrangler tools
- Build command: `npx @cloudflare/next-on-pages`
- Output: `.vercel/output/static`

**Deploy:**
```bash
git checkout cloudflare
git push origin cloudflare
```

Cloudflare Pages tự động deploy từ branch `cloudflare`.

---

## 🔄 Workflow

### Khi thêm features mới:

#### Option 1: Develop trên `main`, merge vào cả 2 branches
```bash
# Develop trên main
git checkout main
# ... make changes ...
git add .
git commit -m "Add new feature"
git push origin main

# Merge vào vercel
git checkout vercel
git merge main
git push origin vercel

# Merge vào cloudflare
git checkout cloudflare
git merge main
git push origin cloudflare
```

#### Option 2: Develop trực tiếp trên branch target
```bash
# Nếu feature chỉ cho Vercel
git checkout vercel
# ... make changes ...
git commit -m "Vercel-specific feature"
git push origin vercel

# Nếu feature chỉ cho Cloudflare
git checkout cloudflare
# ... make changes ...
git commit -m "Cloudflare-specific feature"
git push origin cloudflare
```

---

## ⚙️ Deployment Configuration

### Vercel:
1. Dashboard → Project Settings
2. **Git Branch:** `vercel`
3. **Build Command:** `npm run build`
4. **Output Directory:** `.next`
5. Environment Variables: (đã setup)

### Cloudflare Pages:
1. Dashboard → Build Settings
2. **Production Branch:** `cloudflare`
3. **Build Command:** `npx @cloudflare/next-on-pages`
4. **Build Output:** `.vercel/output/static`
5. **Compatibility Flags:** `nodejs_compat`
6. Environment Variables: (đã setup)

---

## 🎯 URLs

- **Vercel:** https://chatbot-doanh-nghiep.vercel.app
- **Cloudflare:** https://saas-chatbot-showcase.pages.dev

---

## ⚠️ Lưu ý

### Về Next.js versions:
- `vercel` branch: **Next.js 16.1.4** (secure, latest)
- `cloudflare` branch: **Next.js 15.5.2** (có CVE nhưng cần thiết cho Cloudflare)

### Khi conflict:
Nếu có conflict khi merge giữa 2 branches:
1. Giữ nguyên `package.json` của mỗi branch (khác Next.js version)
2. Merge các file khác bình thường
3. Không merge `package-lock.json` - generate lại bằng `npm install`

### Best practice:
- Develop features chung trên `main`
- Test trên cả 2 platforms trước khi merge
- Keep `package.json` differences documented
- Sync environment variables giữa 2 platforms

---

## 🐛 Troubleshooting

### Branch đã outdated?
```bash
git checkout vercel
git merge main
npm install
git push origin vercel

git checkout cloudflare  
git merge main
npm install
git push origin cloudflare
```

### Muốn xóa 1 branch?
```bash
# Xóa local
git branch -d branch-name

# Xóa remote
git push origin --delete branch-name
```

### Muốn chỉ dùng 1 platform?
Xóa branch không dùng và update deployment settings.
