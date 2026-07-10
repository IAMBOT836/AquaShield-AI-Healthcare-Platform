from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"
    id              = Column(Integer, primary_key=True, index=True)
    username        = Column(String(50), unique=True, index=True, nullable=False)
    email           = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(200), nullable=False)
    is_active       = Column(Boolean, default=True)
    is_admin        = Column(Boolean, default=False)
    created_at      = Column(DateTime(timezone=True), server_default=func.now())
    predictions     = relationship("Prediction", back_populates="user", cascade="all, delete-orphan")
    chat_history    = relationship("ChatMessage", back_populates="user", cascade="all, delete-orphan")

class Prediction(Base):
    __tablename__ = "predictions"
    id             = Column(Integer, primary_key=True, index=True)
    user_id        = Column(Integer, ForeignKey("users.id"), nullable=False)
    image_filename = Column(String(300), nullable=False)
    image_url      = Column(String(500))
    organism_name  = Column(String(200))
    common_name    = Column(String(200))
    confidence     = Column(Float)
    risk_level     = Column(String(10))
    description    = Column(Text)
    symptoms       = Column(Text)
    created_at     = Column(DateTime(timezone=True), server_default=func.now())
    user           = relationship("User", back_populates="predictions")

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, ForeignKey("users.id"), nullable=False)
    role       = Column(String(10))
    content    = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    user       = relationship("User", back_populates="chat_history")
