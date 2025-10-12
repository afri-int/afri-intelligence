// src/pages/TeacherDashboard.tsx

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "../styles/teacherDashboard.module.css";
import { UserContext } from "../../context/userContext";

interface Grade {
  _id?: string;
  name?: string;
  level?: number;
}

interface Subject {
  _id?: string;
  name?: string;
}

interface Language {
  _id?: string;
  name?: string;
  code?: string;
}

interface GlossaryTerm {
  term: string;
  definition: string;
}

const TeacherDashboard: React.FC = () => {
  const { user } = useContext(UserContext)!;

  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"document" | "glossary">("document");

  const [docForm, setDocForm] = useState({
    grade: "",
    subject: "",
    year: new Date().getFullYear(),
    paperType: "p1",
    language: "",
    file: null as File | null,
  });
  const [docLoading, setDocLoading] = useState(false);

  const [glossaryForm, setGlossaryForm] = useState({
    grade: "",
    subject: "",
    title: "",
    id: "",
  });
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>([
    { term: "", definition: "" }
  ]);
  const [glossaryLoading, setGlossaryLoading] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/past-papers/filters`)
      .then((res) => {
        setGrades(res.data.grades || []);
        setSubjects(res.data.subjects || []);
        setYears(res.data.years || [2025, 2024, 2023]);
      })
      .catch(() => alert("Failed to load filter options"));

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/languages`)
      .then((res) => setLanguages(res.data || []))
      .catch(() => alert("Failed to load languages"));
  }, []);

  if (!user) return <p className={styles.loading}>Loading...</p>;

  const handleDocChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDocForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setDocForm((prev) => ({ ...prev, file }));
  };

  const handleDocSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docForm.file) return alert("Please select a PDF file.");

    const formData = new FormData();
    formData.append("file", docForm.file);
    formData.append("grade", docForm.grade);
    formData.append("subject", docForm.subject);
    formData.append("year", docForm.year.toString());
    formData.append("paper", docForm.paperType);
    formData.append("language", docForm.language);

    try {
      setDocLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/past-papers/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Document uploaded successfully!");
      setDocForm({
        grade: "",
        subject: "",
        year: new Date().getFullYear(),
        paperType: "p1",
        language: "",
        file: null,
      });
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      alert(`Upload failed: ${errorMessage}`);
    } finally {
      setDocLoading(false);
    }
  };

  const handleGlossaryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setGlossaryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTermChange = (index: number, field: keyof GlossaryTerm, value: string) => {
    setGlossaryTerms(prev => 
      prev.map((term, i) => 
        i === index ? { ...term, [field]: value } : term
      )
    );
  };

  const addTerm = () => {
    setGlossaryTerms(prev => [...prev, { term: "", definition: "" }]);
  };

  const removeTerm = (index: number) => {
    if (glossaryTerms.length > 1) {
      setGlossaryTerms(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleGlossarySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validTerms = glossaryTerms.filter(t => t.term.trim() && t.definition.trim());
    
    if (validTerms.length === 0) {
      return alert("Please add at least one complete term with both name and definition.");
    }

    try {
      setGlossaryLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/glossary/upload`,
        {
          subject: glossaryForm.subject,
          grade: glossaryForm.grade,
          title: glossaryForm.title,
          id: glossaryForm.id,
          terms: validTerms,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      alert("Glossary topic uploaded!");
      setGlossaryForm({ subject: "", grade: "", title: "", id: "" });
      setGlossaryTerms([{ term: "", definition: "" }]);
    } catch (err: unknown) {
      console.error("Upload error:", err);
    
      let errorMessage = 'An unknown error occurred';
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as any;
        console.error("Error response:", axiosError.response?.data);
        errorMessage = axiosError.response?.data?.error || axiosError.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
    
      alert(`Glossary upload failed: ${errorMessage}`);
    } finally {
      setGlossaryLoading(false);
    }
  };

  const renderOptions = (items: any[]) =>
    items.map((item, index) => {
      if (typeof item === "number") {
        return (
          <option key={index} value={item}>
            {item}
          </option>
        );
      }
      if (typeof item === "string") {
        return (
          <option key={index} value={item}>
            {item}
          </option>
        );
      }
      if (typeof item === "object" && item !== null) {
        return (
          <option
            key={item._id ?? index}
            value={item._id}
          >
            {item.name ?? item.level ?? item.code ?? `Item ${index + 1}`}
          </option>
        );
      }
      return null;
    });

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Welcome, {user.name}!</h1>
        <p className={styles.subtitle}>Teacher Dashboard</p>
      </div>

      <div className={styles.tabContainer}>
        <button 
          className={`${styles.tab} ${activeTab === "document" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("document")}
        >
          <span className={styles.tabContent}>
            <span className={styles.tabIcon}>📄</span>
            <span className={styles.tabText}>Upload Document</span>
          </span>
        </button>
        <button 
          className={`${styles.tab} ${activeTab === "glossary" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("glossary")}
        >
          <span className={styles.tabContent}>
            <span className={styles.tabIcon}>📚</span>
            <span className={styles.tabText}>Upload Glossary</span>
          </span>
        </button>
      </div>

      <div className={styles.contentContainer}>
        {activeTab === "document" && (
          <form className={styles.uploadForm} onSubmit={handleDocSubmit}>
            <div className={styles.formHeader}>
              <h2>Upload Past Paper</h2>
              <p>Fill in the details below to upload a new past paper</p>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Grade</label>
                <select
                  name="grade"
                  value={docForm.grade}
                  onChange={handleDocChange}
                  required
                >
                  <option value="">Select Grade</option>
                  {renderOptions(grades)}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Subject</label>
                <select
                  name="subject"
                  value={docForm.subject}
                  onChange={handleDocChange}
                  required
                >
                  <option value="">Select Subject</option>
                  {renderOptions(subjects)}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Year</label>
                <select
                  name="year"
                  value={docForm.year}
                  onChange={handleDocChange}
                  required
                >
                  <option value="">Select Year</option>
                  {renderOptions(years)}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Paper Type</label>
                <select
                  name="paperType"
                  value={docForm.paperType}
                  onChange={handleDocChange}
                  required
                >
                  <option value="p1">Paper 1</option>
                  <option value="p2">Paper 2</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Language</label>
                <select
                  name="language"
                  value={docForm.language}
                  onChange={handleDocChange}
                  required
                >
                  <option value="">Select Language</option>
                  {renderOptions(languages)}
                </select>
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>PDF File</label>
                <div className={styles.fileInputContainer}>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                    required
                  />
                  <span className={styles.fileInputLabel}>
                    {docForm.file ? docForm.file.name : "Choose PDF file..."}
                  </span>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={docLoading}
              className={styles.submitButton}
            >
              {docLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  Uploading...
                </>
              ) : (
                "Upload Document"
              )}
            </button>
          </form>
        )}

        {activeTab === "glossary" && (
          <form className={`${styles.uploadForm} ${styles.glossaryForm}`} onSubmit={handleGlossarySubmit}>
            <div className={styles.formHeader}>
              <h2>Upload Glossary</h2>
              <p>Create a new glossary topic with terms and definitions</p>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Subject</label>
                <select
                  name="subject"
                  value={glossaryForm.subject}
                  onChange={handleGlossaryChange}
                  required
                >
                  <option value="">Select Subject</option>
                  {renderOptions(subjects)}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Grade</label>
                <select
                  name="grade"
                  value={glossaryForm.grade}
                  onChange={handleGlossaryChange}
                  required
                >
                  <option value="">Select Grade</option>
                  {renderOptions(grades)}
                </select>
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Topic Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter topic title"
                  value={glossaryForm.title}
                  onChange={handleGlossaryChange}
                  required
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Topic ID</label>
                <input
                  type="text"
                  name="id"
                  placeholder="topic-id-no-spaces"
                  value={glossaryForm.id}
                  onChange={handleGlossaryChange}
                  required
                />
                <small className={styles.helperText}>
                  Use lowercase letters, numbers, and hyphens only
                </small>
              </div>
            </div>

            <div className={styles.termsSection}>
              <div className={styles.sectionHeader}>
                <h3>Terms & Definitions</h3>
                <button
                  type="button"
                  onClick={addTerm}
                  className={styles.addBtn}
                >
                  + Add Term
                </button>
              </div>
              
              <div className={styles.termsList}>
                {glossaryTerms.map((termObj, index) => (
                  <div key={index} className={styles.termCard}>
                    <div className={styles.termHeader}>
                      <span className={styles.termNumber}>Term #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeTerm(index)}
                        disabled={glossaryTerms.length === 1}
                        className={styles.removeBtn}
                      >
                        ×
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter term"
                      value={termObj.term}
                      onChange={(e) => handleTermChange(index, 'term', e.target.value)}
                      className={styles.termInput}
                      required
                    />
                    <textarea
                      placeholder="Enter definition"
                      value={termObj.definition}
                      onChange={(e) => handleTermChange(index, 'definition', e.target.value)}
                      className={styles.definitionInput}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={glossaryLoading}
              className={styles.submitButton}
            >
              {glossaryLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  Uploading...
                </>
              ) : (
                "Upload Glossary"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;