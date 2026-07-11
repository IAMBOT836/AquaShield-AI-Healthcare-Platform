from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from .database import engine
from . import models
from .routers import auth, predictions, chat, dashboard

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AquaShield AI Healthcare Platform API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://localhost:3000","http://127.0.0.1:5173", "https://aqua-shield-ai-healthcare-platform.vercel.app"],
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

uploads_dir = Path("uploads")
uploads_dir.mkdir(exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(uploads_dir)), name="uploads")

app.include_router(auth.router)
app.include_router(predictions.router)
app.include_router(chat.router)
app.include_router(dashboard.router)

@app.get("/")
def root():
    return {"message": "AquaShield AI Healthcare Platform API", "version": "1.0.0", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "healthy"}
