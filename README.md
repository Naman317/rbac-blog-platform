Blogger- A Mern Stack Blogging Platform
Features:
JWT authentication based login and registration
-- Admin can create update delete blogs
can see top liked post

---user can see blog, like and unlike that blog
bookmark that blog

---Frontend

- React
- React Router DOM
- Tailwind CSS
- Axios
  ----Backend----
  -Node.js
- Express.js
- MongoDB + Mongoose
- Multer (image upload)
- JSON Web Token (JWT)
- Bcrypt (password hashing)

**\*\***Backend Setup**\***
-cd backend
-npm install
-mkdir uploads
-touch .env in that env file add:
-PORT=5000
-DB=your_mongodb_connection_string
-JWT_KEY=your_secret_key

-then run server by:
npm run dev or node app.js

**\*\***Frontend Setup**\***
-cd Frontend
-npm install
-touch .env in that add VITE_API_BASE_URL=http://localhost:5000
-npm run dev

##On registration, a dummy verification link is displayed (can be integrated email service).
