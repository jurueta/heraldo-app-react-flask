from sqlalchemy import Table, Column, String, Integer, BigInteger, ForeignKey, create_engine, Text, DateTime, TIMESTAMP
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func
from config import USERDB, PASSDB, HOSTDB, DBNAME

Base = declarative_base()


class User(Base):
    __tablename__ = "user"

    id = Column(BigInteger, primary_key=True)
    nombre_completo = Column(String(100), nullable=False)
    direccion = Column(String(100), nullable=False)
    telefono = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    username = Column(String(100), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    status = Column(Integer, default=1, nullable=False)

class Category(Base):
    __tablename__ = "category"

    id = Column(BigInteger, primary_key=True)
    nombre = Column(String(100), nullable=False)
    status = Column(Integer, default=1, nullable=False)

class Notice(Base):
    __tablename__ = 'notice'

    id = Column(BigInteger, primary_key=True)
    titulo = Column(String(100), nullable=False)
    descripcion = Column(Text, nullable=False)
    categoria = Column(ForeignKey('category.id'), nullable=False)
    resena = Column(Text, nullable=False)
    imagen = Column(String(100), nullable=False)
    autor = Column(String(100), nullable=False)
    hora = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    visible = Column(Integer, default=1, nullable=False)
    status = Column(Integer, default=1, nullable=False)


if __name__ == '__main__':
    engine = create_engine(
        f"mysql+mysqldb://{USERDB}:{PASSDB}@{HOSTDB}/{DBNAME}")
    with engine.connect() as conn:
        Base.metadata.create_all(engine)
        print("Create Tables")
