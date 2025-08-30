# Instafolio Developer Documentation

Welcome to the Instafolio project! This documentation will help new developers get started, understand the architecture, and contribute effectively.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [PDF Extraction & Entity Extraction](#pdf-extraction--entity-extraction)
6. [API Endpoints](#api-endpoints)
7. [Adding Features](#adding-features)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

---

## Project Overview
Instafolio is a web application that allows users to upload resumes/CVs in PDF format, extract structured information (education, experience, projects, etc.), and visualize or edit their professional portfolio.

---

## Architecture
- **Frontend:** Next.js/React (in `src/app/`)
- **Backend:** FastAPI (Python, in `extractor_service/`)
- **Database:** Prisma (see `prisma/`)
- **PDF Extraction:** Python service using `pdfplumber` and `langextract` (Gemini LLM)
- **API Communication:** REST endpoints and custom upload handlers

---

## Backend Setup
1. **Environment:**
   - Use Conda or venv. Recommended: `conda create -n ayai-env python=3.10`
   - Activate: `conda activate ayai-env`
2. **Install dependencies:**
   - `pip install -r requirements.txt`
   - `pip install uvicorn python-dotenv`
3. **Environment Variables:**
   - Create a `.env` file in `extractor_service/` with your Gemini API key:
     ```
     GOOGLE_API_KEY=your-gemini-api-key
     ```
4. **Run the backend:**
   - `cd extractor_service`
   - `uvicorn main:app`
5. **API Docs:**
   - Visit [http://localhost:8000/docs](http://localhost:8000/docs) for interactive API documentation.

---

## Frontend Setup
1. **Install dependencies:**
   - `npm install` (in the project root)
2. **Run the frontend:**
   - `npm run dev`
   - App runs at [http://localhost:3000](http://localhost:3000)
3. **Environment Variables:**
   - Configure any required variables in `.env` (see `.env.example` if available)

---

## PDF Extraction & Entity Extraction
- Uploads are handled by the frontend and sent to the backend `/extract` endpoint.
- The backend uses `pdfplumber` to extract text and `langextract` (with Gemini LLM) to extract structured entities.
- Example extraction classes: `job`, `degree`, etc. (see `main.py` for sample examples).
- The backend expects a valid Gemini API key for extraction.

---

## API Endpoints
- **POST /extract**: Upload a file and extract entities.
- **Other endpoints**: See FastAPI docs and Next.js API routes for additional endpoints (e.g., `/api/instafolio/upload`).

---

## Adding Features
- **Backend:**
  - Add new endpoints in `main.py` (FastAPI).
  - Add new extraction examples or classes as needed.
- **Frontend:**
  - Add new pages/components in `src/app/`.
  - Use hooks and API utilities in `src/hooks/` and `src/utils/`.
- **Database:**
  - Update `prisma/schema.prisma` and run migrations as needed.

---

## Testing
- **Backend:** Use FastAPI's `/docs` for manual testing. Add Python tests as needed.
- **Frontend:** Use Playwright/Vitest for e2e and unit tests (`e2e/`, `tests/`).

---

## Troubleshooting
- **500 Internal Server Error:**
  - Check backend logs for Python tracebacks.
  - Ensure API key is set and valid.
  - Ensure all dependencies are installed in the correct environment.
- **PDF Extraction Issues:**
  - Check that the PDF is not encrypted or corrupted.
  - Update extraction examples for better results.
- **Conda/Environment Issues:**
  - Ignore `conda-libmamba-solver` warnings unless they block installs.
  - Always activate the correct environment before running backend commands.

---

## Best Practices
- Use version control (Git) and create feature branches for new work.
- Write clear commit messages and PR descriptions.
- Keep `.env` files out of version control.
- Add docstrings and comments to new code.
- Keep dependencies up to date.

---

## Resources
- [LangExtract GitHub](https://github.com/google/langextract)
- [Gemini API Docs](https://ai.google.dev/gemini-api/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)

---

For any questions, contact the project maintainer or check the README for updates.
