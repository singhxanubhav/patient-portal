# Patient Portal - Full Stack Developer Assignment

A full-stack application designed for a healthcare platform where users can upload, view, manage, and delete medical documents (PDFs). This solution focuses on a clean architecture, RESTful API design, and efficient file handling.

## 🚀 Features
- **Upload:** Users can upload medical records (PDF only) with validation.
- **List:** View a list of all uploaded documents with metadata (size, date).
- **Download:** Retrieve and download specific documents.
- **Delete:** Remove documents from both the local storage and the database.
- **Persistence:** Metadata is stored in a PostgreSQL database (Supabase) via Prisma ORM.

---

## 🛠 Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React.js (Vite), Tailwind CSS, Axios, Lucide React |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (hosted on Supabase) |
| **ORM** | Prisma |
| **File Handling** | Multer (Local Storage) |

---

## ⚙️ Prerequisites

Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Git](https://git-scm.com/)
- A **Supabase** project URL (for the PostgreSQL database)

---

## 📥 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/singhxanubhav/patient-portal.git
cd patient-portal
