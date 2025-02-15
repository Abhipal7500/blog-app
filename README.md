# Next.js Blog App

A **full-stack blog application** built using **Next.js 14, Tailwind CSS, MongoDB, and JWT authentication**, allowing **admins to upload and manage blogs** securely.

## Features

✅ **Admin Authentication**:
- Implemented **JWT-based authentication** to restrict access to the admin panel.
- Only verified admins can upload, edit, or delete blogs.

✅ **CRUD Functionality**:
- Admins can **Create, Read, Update, and Delete (CRUD)** blog posts.
- Optimized database operations for efficient performance.

✅ **User Interface**:
- **Modern, clean, and responsive UI** using **Tailwind CSS**.
- **Next.js component-based architecture** for better maintainability.
- **Accessibility best practices** to cater to diverse users.

✅ **Performance Optimizations**:
- **Redis Caching** for **faster GET requests**, reducing database load.
- **Lazy Loading** of images to improve page speed.
- **Database Connection Optimization** to ensure connections are only established when needed.
- **Cache Invalidation** on **POST & DELETE** requests for real-time data consistency.

✅ **Security Enhancements**:
- **JWT-based authentication** to **protect admin routes**.
- **Environment variables** for sensitive credentials (**MongoDB, SMTP, JWT**).
- Secure **SMTP-based email verification** using **Mailtrap & Nodemailer**.

✅ **Deployment & CI/CD**:
- Successfully **deployed** the application on **Vercel**.
- Configured **CI/CD pipelines** for smooth development & deployment.

## Tech Stack

- **Frontend**: Next.js 14, React.js, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Database**: MongoDB (Optimized with Redis Caching)
- **Email Services**: Mailtrap, Nodemailer
- **Hosting & Deployment**: Vercel
- **Version Control**: Git

## Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/nextjs-blog-app.git
cd nextjs-blog-app
```

### Step 2: Install Dependencies

```bash
npm install  
# or  
yarn install  
# or  
pnpm install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file and add the following:

```env
MONGO_URI=
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
ADMIN_ROLE=admin
ADMIN_VERIFIED=true
JWT_SECRET=your_secret_key
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SMTP_SECURE=false
```

### Step 4: Run the Development Server

```bash
npm run dev  
# or  
yarn dev  
# or  
pnpm dev
```

Now, open **[http://localhost:3000](http://localhost:3000)** to view the app in your browser.

## Deployment

The application is deployed on **Vercel**. To deploy your version:

```bash
vercel
```


## Contributing

Contributions are welcome! Please submit a pull request or open an issue if you find any bugs.

## License

This project is licensed under the **MIT License**.

---

🚀 **Happy Coding!** 🚀

