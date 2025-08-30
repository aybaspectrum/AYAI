from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import tempfile
import langextract
from langextract.data import ExampleData, Extraction
import traceback
import os
import pdfplumber
import docx
from dotenv import load_dotenv

load_dotenv()
print("GOOGLE_API_KEY:", os.environ.get("GOOGLE_API_KEY"))

app = FastAPI()

def extract_text_from_file(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    if ext == ".pdf":
        with pdfplumber.open(file_path) as pdf:
            text = "\n".join(page.extract_text() or "" for page in pdf.pages)
    elif ext == ".docx":
        doc = docx.Document(file_path)
        text = "\n".join([para.text for para in doc.paragraphs])
    elif ext == ".txt":
        with open(file_path, "r", encoding="utf-8") as f:
            text = f.read()
    else:
        raise ValueError("Unsupported file type")
    return text

@app.post("/extract")
async def extract_entities(file: UploadFile = File(...)):
    print("Received file upload request")
    try:
        # Save uploaded file to a temporary location
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        # Convert file to text
        try:
            text = extract_text_from_file(tmp_path)
            # Save text to a new temp file for langextract
            with tempfile.NamedTemporaryFile(delete=False, suffix=".txt", mode="w", encoding="utf-8") as txt_tmp:
                txt_tmp.write(text)
                text_path = txt_tmp.name
        except Exception as e:
            print("[File parsing failed]")
            traceback.print_exc()
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
            return JSONResponse(status_code=400, content={"error": f"File parsing failed: {str(e)}"})
        finally:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)

        # Define what you want to extract, e.g., jobs, education, projects
        examples = [
            ExampleData(
                text="John Doe worked at Google as a Software Engineer from 2015 to 2020.",
                extractions=[
                    Extraction(
                        extraction_class="job",
                        extraction_text="Software Engineer",
                        attributes={"Company": "Google", "Years": "2015-2020"}
                    )
                ]
            ),
            ExampleData(
                text="Jane Smith received her MSc in Computer Science from MIT in 2018.",
                extractions=[
                    Extraction(
                        extraction_class="degree",
                        extraction_text="MSc in Computer Science",
                        attributes={"Institution": "MIT", "Year": "2018"}
                    )
                ]
            ),
            # Add more examples as needed
        ]

        # Extract entities using langextract
        try:
            entities = langextract.extract(text_path, examples=examples)
            os.remove(text_path)  # Clean up temp file
            # Convert AnnotatedDocument or other custom objects to dict for JSON serialization
            if hasattr(entities, "to_dict"):
                entities = entities.to_dict()
            elif hasattr(entities, "dict"):
                entities = entities.dict()
            elif hasattr(entities, "__dict__"):
                entities = entities.__dict__
            return JSONResponse(content={"entities": entities})
        except Exception as e:
            print("[Extraction failed]")
            traceback.print_exc()
            if os.path.exists(text_path):
                os.remove(text_path)
            return JSONResponse(status_code=500, content={"error": f"Extraction failed: {str(e)}"})
    except Exception as e:
        print("[General error in /extract endpoint]")
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": f"General error: {str(e)}"})