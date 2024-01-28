# Next Auth v5 - Advanced Guide (2024)

Key Features:

- 🔐 Next-auth  
- 🔑 Credentials Provider
- 🌐 OAuth Provider (Social login with Google & GitHub)
- 👥 User roles (Admin & User)
- 🔓 Login component (Opens in redirect or modal)
- 📝 Register component
- ⚠️ Error component
- 🔘 Login button
- 🚪 Logout button
- 🚧 Role Gate
- 🔍 Exploring next.js middleware
- 📈 Extending & Exploring next-auth session
- 🔄 Exploring next-auth callbacks
- 👤 useCurrentUser hook
- 🛂 useRole hook
- 🧑 currentUser utility
- 👮 currentRole utility
- 🖥️ Example with server component
- 💻 Example with client component
- 👑 Render content for admins using RoleGate component
- 🛡️ Protect API Routes for admins only
- 🔄 Change user role in Settings page (for development purposes only)

### Prerequisites

**Node version 18.7.x**

### Cloning the repository

```shell
git clone https://github.com/salihyil/next-auth-tutorial.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```js
https://next-auth.js.org/configuration/options#secret
NEXTAUTH_SECRET= # Linux: `openssl rand -hex 32` or go to https://generate-secret.vercel.app/32

AUTH_GITHUB_ID= 
AUTH_GITHUB_SECRET= 

AUTH_GOOGLE_ID= 
AUTH_GOOGLE_SECRET= 

MONGODB_URI=
```

### Setup Prisma

```shell
npx prisma generate
npx prisma db push
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
