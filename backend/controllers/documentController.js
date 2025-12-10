import fs from 'fs';
import path from 'path';
import prisma from '../config/prisma.js';
import { fileURLToPath } from 'url';

// Fix dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload Controller
export const uploadDocument = async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ error: "Please upload a PDF file" });

        const newDoc = await prisma.document.create({
            data: {
                filename: req.file.originalname,
                filepath: req.file.path,
                filesize: req.file.size,
            },
        });

        res.status(201).json({ message: "Uploaded Successfully", doc: newDoc });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// List All Documents
export const getDocuments = async (req, res) => {
    try {
        const docs = await prisma.document.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(docs);
    } catch (error) {
        res.status(500).json({ error: "Error fetching documents" });
    }
};

// Download File
export const downloadDocument = async (req, res) => {
    try {
        const doc = await prisma.document.findUnique({
            where: { id: parseInt(req.params.id) },
        });

        if (!doc) return res.status(404).json({ error: "File not found" });

        const fullPath = path.join(__dirname, '..', doc.filepath);
        res.download(fullPath, doc.filename);

    } catch (error) {
        res.status(500).json({ error: "Download failed" });
    }
};

// Delete File
export const deleteDocument = async (req, res) => {
    try {
        const doc = await prisma.document.findUnique({
            where: { id: parseInt(req.params.id) },
        });

        if (!doc) return res.status(404).json({ error: "File not found" });

        if (fs.existsSync(doc.filepath)) fs.unlinkSync(doc.filepath);

        await prisma.document.delete({
            where: { id: parseInt(req.params.id) },
        });

        res.json({ message: "Deleted Successfully" });

    } catch (error) {
        res.status(500).json({ error: "Deletion failed" });
    }
};
