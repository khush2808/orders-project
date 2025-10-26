# 🚀 Installation Guide

## Quick Start

Since you're experiencing terminal encoding issues, here's how to install and run the project:

### Step 1: Install Dependencies

Open a **new terminal** (PowerShell, CMD, or Git Bash) and run:

```bash
npm install
```

This will install all required packages:
- next@^14.2.0
- react@^18.3.1
- react-dom@^18.3.1
- mobx@^6.13.0
- mobx-react-lite@^4.0.7
- react-hook-form@^7.52.0
- express@^4.19.0
- typescript@^5.5.0
- tailwindcss@^3.4.0
- And all type definitions

### Step 2: Run the Development Server

```bash
npm run dev
```

This starts the custom Express server with Next.js.

### Step 3: Open in Browser

Navigate to: **http://localhost:3000**

## Alternative: Manual Installation

If `npm install` doesn't work, try installing packages individually:

```bash
npm install next@14.2.0 react@18.3.1 react-dom@18.3.1
npm install mobx@6.13.0 mobx-react-lite@4.0.7
npm install react-hook-form@7.52.0
npm install express@4.19.0
npm install --save-dev typescript@5.5.0 @types/node@20.14.0 @types/react@18.3.0 @types/react-dom@18.3.0 @types/express@4.17.21
npm install --save-dev tailwindcss@3.4.0 postcss@8.4.0 autoprefixer@10.4.0
npm install --save-dev eslint@8.57.0 eslint-config-next@14.2.0
```

## Troubleshooting

### Issue: Terminal encoding problems

**Solution**: 
1. Close current terminal
2. Open a new PowerShell or CMD window
3. Navigate to project directory
4. Run commands again

### Issue: Port 3000 already in use

**Solution**:
```bash
# Use a different port
set PORT=3001
npm run dev
```

### Issue: Module not found

**Solution**:
```bash
# Clear and reinstall
rmdir /s /q node_modules
del package-lock.json
npm install
```

## Verification

After installation, verify these files exist:
- ✅ `node_modules/` folder
- ✅ `package-lock.json` file

Then run `npm run dev` and you should see:
```
🚀 Server is ready!
📍 Local: http://localhost:3000
```

## What Gets Installed?

### Production Dependencies
- **next**: React framework with SSR, routing, and optimization
- **react & react-dom**: Core React library
- **mobx & mobx-react-lite**: State management
- **react-hook-form**: Form handling and validation
- **express**: Web server framework

### Development Dependencies
- **typescript**: Type checking
- **@types/***: TypeScript type definitions
- **tailwindcss**: CSS framework
- **eslint**: Code linting

Total size: ~500MB (includes all dependencies and their dependencies)

## Next Steps

Once installed, check out:
1. **README.md** - Full project documentation
2. **app/order/page.tsx** - Main order page
3. **stores/OrderStore.ts** - MobX state management
4. **server/server.js** - Custom Express server

Happy coding! 🎉
