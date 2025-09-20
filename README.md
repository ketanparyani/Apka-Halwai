# APKA HALWAI :Sweet Shop Management System 🍬

A full-stack Sweet Shop Management System built with React, Node.js, Express, TypeScript, and PostgreSQL.

## 🌟 Features

- ✅ **User Authentication** (Register/Login with JWT)
- ✅ **Sweet Management** (CRUD Operations)
- ✅ **Inventory Management** (Purchase/Restock)
- ✅ **Advanced Search & Filter** functionality
- ✅ **Modern Responsive UI** with beautiful gradients
- ✅ **Admin Dashboard** with special privileges
- ✅ **Role-based Access Control** (Admin/Customer)

## 👤 Admin Access

For administrative functions, use these credentials:
- **Email:** admin@apkahalwai.com
- **Password:** Admin123

**Admin Features:**
- Add new sweets to inventory
- Edit existing sweet details
- Restock inventory items
- Delete sweets from system
- Manage entire product catalog

## 🛠️ Tech Stack

- **Frontend:** React with TypeScript
- **Backend:** Node.js with Express and TypeScript
- **Database:** PostgreSQL
- **Authentication:** JWT Tokens
- **Styling:** Modern CSS with gradient effects

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/ketanparyani/Apka-Halwai.git
cd Apka-Halwai
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
```

3. **Install frontend dependencies:**
```bash
cd ../frontend
npm install
```

4. **Set up PostgreSQL database:**
   - Create database named `sweet_shop`
   - Run SQL commands from `database/init.sql`

5. **Configure environment variables:**
   - Backend `.env` file:
     
DATABASE_URL=postgresql://postgres:Ketan@1012@localhost:5432/sweet_shop
JWT_SECRET=B6373B2982DF80CEE70025459F9D598CAD7CDDD01525F1626E52C5377D0C4D51

PORT=5000
NODE_ENV=development
 

6. **Run the application:**
```bash
# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2)
cd frontend
npm start
```

## 🚀 API Endpoints

**Health Check**
  - `GET /api/health` - Check if API is running (returns {"message":"Sweet Shop API is running!"})
### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Sweets Management
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/:id` - Get sweet by ID
- `POST /api/sweets` - Create new sweet (Admin only)
- `PUT /api/sweets/:id` - Update sweet (Admin only)
- `DELETE /api/sweets/:id` - Delete sweet (Admin only)
- `GET /api/sweets/search` - Search sweets

### Inventory Management
- `POST /api/sweets/:id/purchase` - Purchase sweets
- `POST /api/sweets/:id/restock` - Restock inventory (Admin only)

## 🎨 UI Features

- **Modern Gradient Design** with beautiful color scheme
- **Responsive Layout** that works on all devices
- **Interactive Cards** with hover effects
- **Clean Dashboard** with intuitive navigation
- **Advanced Search** with multiple filters
- **Admin Controls** with special privileges

## 🤖 My AI Usage

### AI Tools Used
- **GitHub Copilot** - For code suggestions, quick fixes and boilerplate generation
- **ChatGPT** - For brainstorming API structures and debugging assistance

### How I Used AI
1. **API Design:** Used AI to brainstorm RESTful API endpoint structures and database schema design
2. **Boilerplate Code:** Generated initial controller and service layer templates
3. **Error Debugging:** Assisted in identifying and resolving TypeScript compilation errors
4. **UI Design:** Suggested modern CSS gradient designs and responsive layout patterns
5. **Documentation:** Helped create comprehensive README and code comments


## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Modern CSS gradient design patterns
- PostgreSQL for reliable database management
- JWT for secure authentication

**👨‍💻 Author**
Built by Ketan Paryani as part of Incubyte coding assesment challenge.

---

