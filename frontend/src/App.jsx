import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Trash2, Download, FileText, Upload } from "lucide-react";

const API_URL = "http://localhost:5000";

function App() {
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState("");

  /* ------------------------------------
     1) fetchDocuments: returns data (does NOT call setState)
     memoized to keep stable ref
  ------------------------------------ */
  const fetchDocuments = useCallback(async () => {
    const res = await axios.get(`${API_URL}/documents`);
    return res.data;
  }, []);

  /* ------------------------------------
     2) refreshDocuments: calls fetchDocuments and then updates state
     use this from event handlers
  ------------------------------------ */
  const refreshDocuments = useCallback(async () => {
    try {
      const data = await fetchDocuments();
      setDocuments(data);
    } catch (error) {
      console.error("Error refreshing documents", error);
    }
  }, [fetchDocuments]);

  /* ------------------------------------
     3) useEffect: do async fetch and setState asynchronously
     (avoids calling setState synchronously in effect body)
  ------------------------------------ */
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const data = await fetchDocuments();
        if (isMounted) setDocuments(data);
      } catch (error) {
        console.error("Error fetching docs on mount", error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [fetchDocuments]);

  /* ------------------------------------
     4) Upload File
  ------------------------------------ */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${API_URL}/documents/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("File uploaded successfully!");
      setFile(null);
      await refreshDocuments(); // refresh list after upload
    } catch (error) {
      console.error("Upload failed", error);
      setMessage("Upload failed: " + (error.response?.data?.error || "Error"));
    }
  };

  /* ------------------------------------
     5) Delete File
  ------------------------------------ */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      await axios.delete(`${API_URL}/documents/${id}`);
      await refreshDocuments();
    } catch (error) {
      console.error("Delete failed", error);
      alert("Delete failed");
    }
  };

  /* ------------------------------------
     6) Download File
  ------------------------------------ */
  const handleDownload = (id) => {
    window.open(`${API_URL}/documents/${id}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Patient Document Portal
        </h1>

        {/* Upload Section */}
        <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold mb-4">Upload New Report</h2>

          <form onSubmit={handleUpload} className="flex gap-4 items-center">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full 
              file:border-0 file:text-sm file:font-semibold file:bg-blue-50 
              file:text-blue-700 hover:file:bg-blue-100"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg 
              hover:bg-blue-700 flex items-center gap-2"
            >
              <Upload size={18} /> Upload
            </button>
          </form>

          {message && (
            <p className="mt-2 text-green-600 font-medium">{message}</p>
          )}
        </div>

        {/* Document List */}
        <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>

        <div className="space-y-3">
          {documents.length === 0 ? (
            <p className="text-gray-500">No documents found.</p>
          ) : null}

          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-gray-50 
              rounded-lg border hover:shadow-sm transition"
            >
              <div className="flex items-center gap-3">
                <FileText className="text-red-500" />

                <div>
                  <p className="font-medium text-gray-800">{doc.filename}</p>
                  <p className="text-xs text-gray-500">
                    {(doc.filesize / 1024).toFixed(2)} KB •{" "}
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(doc.id)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                  title="Download"
                >
                  <Download size={20} />
                </button>

                <button
                  onClick={() => handleDelete(doc.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
