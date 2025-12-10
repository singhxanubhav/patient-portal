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

# Design Document - Patient Portal

## 1. Tech Stack Choices

### Q1. What frontend framework did you use and why?
**Choice:** React.js (Vite)
**Reasoning:** - **Component-Based:** React allows us to build reusable UI components (like the file list and upload form), making the code clean and maintainable.
- **State Management:** React's `useState` and `useEffect` hooks make it easy to handle real-time UI updates (e.g., refreshing the list after upload).
- **Ecosystem:** Huge community support and libraries like `axios` make API integration seamless.

### Q2. What backend framework did you choose and why?
**Choice:** Node.js with Express.js
**Reasoning:**
- **Simplicity:** Express is minimal and un-opinionated, perfect for building a simple REST API quickly.
- **JavaScript Everywhere:** Using JS on both frontend and backend reduces context switching.
- **Middleware Support:** Easy handling of file uploads using middleware like `multer`.

### Q3. What database did you choose and why?
**Choice:** PostgreSQL (via Supabase) & Prisma ORM
**Reasoning:**
- **Relational Data:** Medical records require structured data (id, filename, dates), which SQL handles better than NoSQL.
- **Prisma:** Provide type safety and auto-generated database clients, reducing the chance of SQL injection and syntax errors.
- **Supabase:** Provides a managed PostgreSQL instance, making it easier to set up without local installation complexities.

### Q4. If you were to support 1,000 users, what changes would you consider?
1.  **Cloud Storage:** Instead of storing files on the local server disk (which is hard to scale), I would move file storage to an object store like **AWS S3** or **Supabase Storage**.
2.  **Database Indexing:** Ensure proper indexing on the `filename` or `userId` columns for faster search queries.
3.  **Authentication:** Implement JWT-based authentication (e.g., NextAuth or Supabase Auth) to segregate user data.
4.  **Rate Limiting:** Use tools like `express-rate-limit` to prevent abuse of the upload API.

---

## 2. Architecture Overview

**Flow:**
[Frontend (React)] <---> [Backend API (Express)] <---> [Database (Supabase/PostgreSQL)]
                                      |
                                      V
                                [Local Disk (uploads/)]

1.  **User** interacts with the **React Frontend**.
2.  Frontend sends HTTP requests to **Express Backend**.
3.  Backend uses **Multer** to save the PDF file to the local `uploads/` folder.
4.  Backend uses **Prisma** to save file metadata (name, path, size) to **Supabase**.
5.  Backend returns a JSON response to the Frontend.

---

## 3. API Specification

| Endpoint | Method | Description | Sample Body/Params |
| :--- | :--- | :--- | :--- |
| `/documents/upload` | `POST` | Upload a PDF file | Form-Data: `file` (binary) |
| `/documents` | `GET` | List all uploaded files | None |
| `/documents/:id` | `GET` | Download a specific file | Param: `id` (e.g., 1) |
| `/documents/:id` | `DELETE` | Delete a file | Param: `id` (e.g., 1) |

---

## 4. Data Flow (Upload Process)

1.  User selects a PDF file in the frontend form.
2.  Frontend creates a `FormData` object and sends a POST request to `/documents/upload`.
3.  **Backend Validation:** Server checks if the file is a PDF.
4.  **Storage:** The file is saved with a unique timestamped name in the `uploads/` directory.
5.  **Database Entry:** Prisma creates a new row in the `Document` table with the file path and metadata.
6.  **Response:** Server responds with `201 Created` and the file details.
7.  **UI Update:** Frontend receives the success message and refreshes the file list.

## 5. Assumptions
1.  **Single User:** The system assumes a single user environment (no login required) as per the problem statement.
2.  **Local Storage:** The server has write permissions to the local file system.
3.  **File Type:** Only PDF files are strictly allowed; others are rejected.

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
