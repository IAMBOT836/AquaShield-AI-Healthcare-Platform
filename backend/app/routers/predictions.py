import json
from pathlib import Path
from typing import List

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from .. import models, schemas
from ..auth import get_current_user
from ..database import get_db
from ..prediction_service import predict_image
from ..config import get_settings

router = APIRouter(prefix="/predictions", tags=["Predictions"])
settings = get_settings()


@router.post("/upload", response_model=schemas.PredictionOut, status_code=201)
async def upload_and_predict(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    allowed = {"image/jpeg", "image/png", "image/jpg", "image/webp"}

    if file.content_type not in allowed:
        raise HTTPException(
            status_code=400,
            detail="Only image files accepted (JPEG, PNG)"
        )

    upload_dir = Path(settings.upload_dir)
    upload_dir.mkdir(parents=True, exist_ok=True)

    filename = f"{current_user.id}_{file.filename}"

    contents = await file.read()

    with open(upload_dir / filename, "wb") as f:
        f.write(contents)

    result = predict_image(contents)

    pred = models.Prediction(
        user_id=current_user.id,
        image_filename=filename,
        image_url=f"/uploads/{filename}",
        organism_name=result["organism_name"],
        common_name=result["common_name"],
        confidence=result["confidence"],
        risk_level=result["risk_level"],
        description=result["description"],
        symptoms=json.dumps(result["symptoms"]),
    )

    db.add(pred)
    db.commit()
    db.refresh(pred)

    return schemas.PredictionOut(
        id=pred.id,
        user_id=pred.user_id,
        image_filename=pred.image_filename,
        image_url=pred.image_url,
        organism_name=pred.organism_name,
        common_name=pred.common_name,
        confidence=pred.confidence,
        risk_level=pred.risk_level,
        description=pred.description,
        symptoms=json.loads(pred.symptoms) if pred.symptoms else [],
        created_at=pred.created_at,
    )


@router.get("/", response_model=List[schemas.PredictionOut])
def get_history(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    preds = (
        db.query(models.Prediction)
        .filter(models.Prediction.user_id == current_user.id)
        .order_by(models.Prediction.created_at.desc())
        .all()
    )

    return [
        schemas.PredictionOut(
            id=p.id,
            user_id=p.user_id,
            image_filename=p.image_filename,
            image_url=p.image_url,
            organism_name=p.organism_name,
            common_name=p.common_name,
            confidence=p.confidence,
            risk_level=p.risk_level,
            description=p.description,
            symptoms=json.loads(p.symptoms) if p.symptoms else [],
            created_at=p.created_at,
        )
        for p in preds
    ]


@router.get("/{prediction_id}", response_model=schemas.PredictionOut)
def get_prediction(
    prediction_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    pred = (
        db.query(models.Prediction)
        .filter(
            models.Prediction.id == prediction_id,
            models.Prediction.user_id == current_user.id,
        )
        .first()
    )

    if not pred:
        raise HTTPException(status_code=404, detail="Prediction not found")

    return schemas.PredictionOut(
        id=pred.id,
        user_id=pred.user_id,
        image_filename=pred.image_filename,
        image_url=pred.image_url,
        organism_name=pred.organism_name,
        common_name=pred.common_name,
        confidence=pred.confidence,
        risk_level=pred.risk_level,
        description=pred.description,
        symptoms=json.loads(pred.symptoms) if pred.symptoms else [],
        created_at=pred.created_at,
    )