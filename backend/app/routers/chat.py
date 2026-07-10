from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..auth import get_current_user
from ..database import get_db
from ..chat_service import get_ai_response

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/", response_model=schemas.ChatResponse)
def chat(request: schemas.ChatRequest, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    rows = db.query(models.ChatMessage).filter(models.ChatMessage.user_id == current_user.id).order_by(models.ChatMessage.created_at.desc()).limit(10).all()
    history = [{"role": h.role if h.role != "ai" else "model", "content": h.content} for h in reversed(rows)]
    db.add(models.ChatMessage(user_id=current_user.id, role="user", content=request.message))
    db.commit()
    reply = get_ai_response(request.message, history)
    db.add(models.ChatMessage(user_id=current_user.id, role="ai", content=reply))
    db.commit()
    return {"reply": reply}

@router.get("/", response_model=List[schemas.ChatMessageOut])
def get_history(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.ChatMessage).filter(models.ChatMessage.user_id == current_user.id).order_by(models.ChatMessage.created_at.asc()).all()
