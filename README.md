# Photography Portfolio - MERN Stack

A modern, dark-themed photography portfolio website built with the MERN stack (MongoDB, Express.js, React, Node.js). Features a minimalistic, cinematic design with orange (#FF6600) accents.

## Features

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile
- **Dynamic Hero Section**: Fullscreen carousel with photographer's best work
- **Gallery System**: Responsive grid with category filters and lazy loading
- **Image Modal**: Detailed view with EXIF data and sharing capabilities
- **Contact Form**: Interactive form with email integration
- **Admin CMS**: Complete content management system
- **Animations**: Smooth transitions using Framer Motion
- **Dark Theme**: Premium, immersive dark design

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Cloudinary** - Image hosting and optimization
- **Nodemailer** - Email service
- **JWT** - Authentication
- **Multer** - File upload handling

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **Lucide React** - Icons
- **React Lazy Load** - Image optimization

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Cloudinary account (for image hosting)
- Email service (Gmail recommended)

### Backend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/photography-portfolio

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_FROM=your_email@gmail.com

   # JWT Secret
   JWT_SECRET=your_super_secret_jwt_key_here

   # Admin Credentials
   ADMIN_EMAIL=admin@photographer.com
   ADMIN_PASSWORD=admin123
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system.

4. **Run the server**
   ```bash
   npm run server
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

### Full Stack Development

Run both backend and frontend concurrently:
```bash
npm run dev
```

## Project Structure

```
photography-portfolio/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── admin/      # Admin panel components
│   │   │   ├── Hero.js
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── ImageModal.js
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js
│   │   │   ├── Gallery.js
│   │   │   ├── About.js
│   │   │   ├── Contact.js
│   │   │   └── Admin.js
│   │   ├── utils/          # Utilities
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── models/                 # MongoDB models
│   ├── Gallery.js
│   ├── Contact.js
│   └── Content.js
├── routes/                 # API routes
│   ├── gallery.js
│   ├── contact.js
│   ├── admin.js
│   └── content.js
├── middleware/             # Custom middleware
│   └── auth.js
├── server.js              # Express server
├── package.json
└── .env
```

## API Endpoints

### Public Routes
- `GET /api/gallery` - Get gallery images
- `GET /api/gallery/:id` - Get single image
- `GET /api/gallery/stats/categories` - Get category statistics
- `POST /api/contact` - Submit contact form
- `GET /api/content/:section` - Get content section

### Admin Routes (Protected)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/gallery` - Get all images (admin)
- `POST /api/admin/gallery` - Upload new image
- `PUT /api/admin/gallery/:id` - Update image
- `DELETE /api/admin/gallery/:id` - Delete image
- `GET /api/admin/contacts` - Get all contacts
- `PUT /api/admin/contacts/:id` - Update contact status
- `GET /api/admin/content` - Get all content
- `PUT /api/admin/content/:section` - Update content section

## Admin Panel

Access the admin panel at `/admin` with the following default credentials:
- **Email**: admin@photographer.com
- **Password**: admin123

### Admin Features
- **Dashboard**: Overview of images, contacts, and statistics
- **Gallery Management**: Upload, edit, delete, and organize images
- **Contact Management**: View and manage client inquiries
- **Content Management**: Edit website content and sections

## Configuration

### Cloudinary Setup
1. Create a Cloudinary account
2. Get your cloud name, API key, and API secret
3. Update the `.env` file with your credentials

### Email Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an app password
3. Use the app password in the `EMAIL_PASS` field

### MongoDB Setup
- Local: Install MongoDB and run `mongod`
- Cloud: Use MongoDB Atlas and update the connection string

## Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables
2. Deploy the root directory
3. Ensure MongoDB connection string is updated

### Frontend Deployment (Netlify/Vercel)
1. Build the React app: `cd client && npm run build`
2. Deploy the `client/build` directory
3. Set up redirects for React Router

### Full Stack Deployment
The app is configured to serve the React build in production. Deploy the entire project to a platform like Heroku.

## Customization

### Colors
Update the color scheme in `client/tailwind.config.js`:
```js
colors: {
  primary: {
    600: '#FF6600', // Main orange color
    // ... other shades
  }
}
```

### Content
- Update photographer information in the About page
- Modify services and testimonials in the Home page
- Change contact information in the Contact page

### Images
- Replace placeholder images with actual portfolio photos
- Upload images through the admin panel
- Organize images by categories

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email hello@pixelstudio.com or create an issue in the repository.

---

Built with ❤️ for capturing beautiful memories.
