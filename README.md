# 🌊 AquaShield AI – Intelligent Waterborne Pathogen Detection & Healthcare Platform

> **An AI-powered healthcare platform for detecting waterborne pathogens from microscope images using Deep Learning and providing intelligent medical guidance through Gemini AI.**

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Python](https://img.shields.io/badge/Python-3.11-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111-green)
![React](https://img.shields.io/badge/React-18-61DAFB)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![SQLite](https://img.shields.io/badge/SQLite-Database-blue)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange)
![Status](https://img.shields.io/badge/Status-Active-success)

---

## 📖 Overview

AquaShield AI is an intelligent healthcare platform that assists in identifying waterborne pathogens using Artificial Intelligence.

Users can upload microscope images of water samples, receive AI-generated predictions, understand associated health risks, and interact with an intelligent healthcare assistant powered by Google's Gemini AI.

The goal of AquaShield AI is to assist researchers, healthcare professionals, laboratories, and educational institutions in rapid pathogen identification and awareness.

---



# ✨ Features

## 🔐 Authentication

* User Registration
* Secure Login
* JWT Authentication
* Protected Routes
* User Profile

---

## 🤖 AI Pathogen Detection

* Upload microscope images
* Image preprocessing
* AI-powered classification
* Confidence score
* Risk level detection
* Disease description
* Symptom analysis

---

## 💬 Gemini AI Healthcare Assistant

The integrated Gemini chatbot can:

* Explain detected pathogens
* Suggest purification methods
* Answer healthcare questions
* Explain AI predictions
* Provide disease information
* Offer prevention recommendations

---

## 📊 Dashboard

Interactive dashboard including:

* Total scans
* Prediction history
* Recent analyses
* User statistics
* AI prediction summaries

---

## 📁 Prediction History

* Previous uploads
* Prediction details
* Confidence values
* Risk levels
* Searchable history

---

## 🩺 Medical Recommendations

Each prediction includes:

* Organism Name
* Common Name
* Confidence Score
* Risk Level
* Symptoms
* Description
* Health Recommendations

---

# 🏗 System Architecture

```text
Microscope Image
        │
        ▼
Image Upload
        │
        ▼
FastAPI Backend
        │
        ▼
AI Prediction Engine
        │
        ▼
Disease Detection
        │
        ▼
Gemini AI Assistant
        │
        ▼
Dashboard & Reports
```

---

# 🛠 Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* JWT Authentication
* Uvicorn

### AI & Machine Learning

* PyTorch
* ResNet18
* Pillow
* NumPy
* Gemini API

### Database

* SQLite (Development)
* PostgreSQL (Production Ready)

---

# 📂 Project Structure

```text
AquaShield-AI-Healthcare-Platform
│
├── backend
│   ├── app
│   ├── model
│   ├── uploads
│   ├── requirements.txt
│   └── run.py
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── dataset_full.csv
├── dataset_labels.csv
├── dataset_summary.csv
└── setup.ps1
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/IAMBOT836/AquaShield-AI-Healthcare-Platform.git

cd AquaShield-AI-Healthcare-Platform
```

---

## Backend

```bash
cd backend

python -m venv .venv

.venv\Scripts\activate

pip install -r requirements.txt

python run.py
```

Backend runs at:

```
http://localhost:8000
```

Swagger:

```
http://localhost:8000/docs
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🔑 Environment Variables

Create:

```
backend/.env
```

Example:

```env
GEMINI_API_KEY=YOUR_API_KEY
SECRET_KEY=YOUR_SECRET_KEY
DATABASE_URL=sqlite:///./aquashield.db
ACCESS_TOKEN_EXPIRE_MINUTES=60
UPLOAD_DIR=uploads
MODEL_PATH=model/aquashield_model.pth
CLASS_LABELS_PATH=model/class_labels.json
```

---

# 📡 API Endpoints

## Authentication

* POST `/auth/register`
* POST `/auth/token`
* GET `/auth/me`

---

## Predictions

* POST `/predictions/upload`
* GET `/predictions`
* GET `/predictions/{id}`

---

## Chat

* POST `/chat`
* GET `/chat`

---

## Dashboard

* GET `/dashboard/stats`

---

# 📈 Future Enhancements

* PDF Medical Reports
* Email Notifications
* Doctor Portal
* Multi-language Support
* Cloud Storage
* AI Model Improvements
* PostgreSQL Migration
* Docker Deployment
* Kubernetes Support

---

# 👨‍💻 Developer

**Kishanraj**

B.Tech – Computer Science (AI & ML)

Presidency University, Bengaluru

GitHub:

https://github.com/IAMBOT836

---

# 📜 License

This project is licensed under the **MIT License**.

---

## ⭐ Support

If you found this project useful:

⭐ Star this repository

🍴 Fork the repository

🐞 Report issues

💡 Suggest improvements

---

> **"Empowering healthcare through Artificial Intelligence for safer water and healthier communities."**
