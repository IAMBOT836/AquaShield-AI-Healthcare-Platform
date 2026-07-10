from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    is_admin: bool
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class PredictionOut(BaseModel):
    id: int
    user_id: int
    image_filename: str
    image_url: Optional[str] = None
    organism_name: Optional[str] = None
    common_name: Optional[str] = None
    confidence: Optional[float] = None
    risk_level: Optional[str] = None
    description: Optional[str] = None
    symptoms: Optional[List[str]] = None
    created_at: datetime
    class Config:
        from_attributes = True

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

class ChatMessageOut(BaseModel):
    id: int
    role: str
    content: str
    created_at: datetime
    class Config:
        from_attributes = True

class DashboardStats(BaseModel):
    total_scans: int
    high_risk: int
    medium_risk: int
    low_risk: int
    safe_samples: int
    avg_confidence: Optional[float] = None
