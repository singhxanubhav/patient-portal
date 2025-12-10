# 🏥 Patient Portal

<div align="center">

**A modern healthcare document management system**

Built with React · Node.js · Express · PostgreSQL

[View Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📋 Overview

A full-stack application designed for healthcare platforms where users can securely upload, view, manage, and delete medical documents. This solution emphasizes clean architecture, RESTful API design, and efficient file handling with a focus on user experience.

---

## ✨ Features

- 📤 **Upload Medical Records** - Secure PDF upload with validation and file size checks
- 📋 **Document Listing** - View all uploaded documents with metadata (size, upload date)
- 💾 **Download Documents** - Retrieve and download specific medical records
- 🗑️ **Delete Records** - Remove documents from both storage and database
- 🔒 **Data Persistence** - Metadata stored in PostgreSQL via Prisma ORM
- ⚡ **Fast & Responsive** - Built with modern tech stack for optimal performance

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React.js (Vite), Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (Supabase) |
| **ORM** | Prisma |
| **File Handling** | Multer (Local Storage) |
| **Icons** | Lucide React |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   React Frontend                    │
│          (Vite + Tailwind CSS + Axios)             │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ HTTP Requests
                  ▼
┌─────────────────────────────────────────────────────┐
│              Express.js Backend                     │
│         RESTful API (Upload/Download/Delete)       │
└─────────────┬───────────────────┬───────────────────┘
              │                   │
              │ Prisma ORM        │ Multer
              ▼                   ▼
    ┌──────────────────┐   ┌─────────────┐
    │   PostgreSQL     │   │   Local     │
    │   (Supabase)     │   │   Storage   │
    └──────────────────┘   └─────────────┘
```

---

## ⚙️ Prerequisites

Before running the project, ensure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** - For PostgreSQL database ([Sign up](https://supabase.com/))

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-link-here>
cd patient-portal
```

### 2. Backend Setup

**Navigate to backend directory:**

```bash
cd backend
```

**Install dependencies:**

```bash
npm install
```

**Environment Configuration:**

Create a `.env` file in the `backend` folder:

```env
DATABASE_URL="postgresql://postgres.[your-project]:[password]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"
PORT=5000
```

**Database Migration:**

Push the Prisma schema to Supabase:

```bash
npx prisma db push
```

**Start the Backend Server:**

```bash
node index.js
```

Backend will run on `http://localhost:5000` 🎉

---

### 3. Frontend Setup

**Open a new terminal and navigate to frontend:**

```bash
cd frontend
```

**Install dependencies:**

```bash
npm install
```

**Start the Development Server:**

```bash
npm run dev
```

Frontend will run on `http://localhost:5173` 🚀

---

## 📁 Project Structure

```
patient-portal/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   ├── uploads/               # Uploaded PDF files
│   ├── index.js               # Express server & API routes
│   ├── package.json
│   └── .env                   # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/        # React components
    │   ├── App.jsx            # Main application
    │   └── main.jsx           # Entry point
    ├── package.json
    └── vite.config.js         # Vite configuration
```

---

## 🔌 API Endpoints

### Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/upload` | Upload a new PDF document |
| `GET` | `/documents` | Get list of all documents |
| `GET` | `/download/:id` | Download a specific document |
| `DELETE` | `/delete/:id` | Delete a document |

### Example Request

**Upload Document:**
```bash
curl -X POST http://localhost:5000/upload \
  -F "file=@document.pdf"
```

---

## 🎨 UI Features

- **Drag & Drop Upload** - Intuitive file upload interface
- **Document Cards** - Clean display of file metadata
- **Responsive Design** - Works seamlessly on all devices
- **Loading States** - Visual feedback during operations
- **Error Handling** - User-friendly error messages

---

## 🔒 Security Features

- **File Type Validation** - Only PDF files allowed
- **File Size Limits** - Prevents oversized uploads
- **Sanitized Filenames** - Prevents path traversal attacks
- **Database Constraints** - Data integrity via Prisma

---

## 🧪 Testing

**Test the API endpoints:**

```bash
# Upload a document
curl -X POST -F "file=@test.pdf" http://localhost:5000/upload

# Get all documents
curl http://localhost:5000/documents

# Download a document
curl http://localhost:5000/download/1 --output document.pdf

# Delete a document
curl -X DELETE http://localhost:5000/delete/1
```

---

## 🚧 Future Enhancements

- [ ] User authentication & authorization
- [ ] Cloud storage integration (AWS S3/Azure Blob)
- [ ] Document preview functionality
- [ ] Advanced search and filtering
- [ ] Audit logs for document access
- [ ] Multi-file upload support

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/singhxanubhav)
- LinkedIn: [Connect with me](#)
- Email: anubhavsinghbkj@gmail.com

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the powerful UI library
- [Express.js](https://expressjs.com/) for the backend framework
- [Prisma](https://www.prisma.io/) for the excellent ORM
- [Supabase](https://supabase.com/) for database hosting
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for beautiful icons

---
