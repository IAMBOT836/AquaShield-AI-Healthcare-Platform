from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from .. import models, schemas
from ..auth import get_current_user
from ..database import get_db

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/stats", response_model=schemas.DashboardStats)
def get_stats(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    base = db.query(models.Prediction).filter(models.Prediction.user_id == current_user.id)
    avg  = db.query(func.avg(models.Prediction.confidence)).filter(models.Prediction.user_id == current_user.id).scalar()
    return schemas.DashboardStats(
        total_scans=base.count(),
        high_risk=base.filter(models.Prediction.risk_level == "HIGH").count(),
        medium_risk=base.filter(models.Prediction.risk_level == "MEDIUM").count(),
        low_risk=base.filter(models.Prediction.risk_level == "LOW").count(),
        safe_samples=base.filter(models.Prediction.risk_level == "LOW").count(),
        avg_confidence=round(float(avg), 1) if avg else 0.0,
    )
