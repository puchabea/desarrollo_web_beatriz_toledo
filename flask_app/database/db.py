from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, Enum, BigInteger, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship, Session, joinedload
from datetime import datetime
DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

# --- Models ---

class Region(Base):
    __tablename__ = 'region'
    id = Column(Integer, primary_key=True, autoincrement=False)
    nombre = Column(String(200), nullable=False)

    comunas = relationship("Comuna", back_populates="region")

class Comuna(Base):
    __tablename__ = 'comuna'

    id = Column(Integer, primary_key=True, autoincrement=False)
    nombre = Column(String(200), nullable=False)
    region_id = Column(Integer, ForeignKey('region.id'), nullable=False)

    region = relationship("Region", back_populates="comunas")
    avisos = relationship("AvisoAdopcion", back_populates="comuna") 

class AvisoAdopcion(Base):
    __tablename__ = 'aviso_adopcion'

    id = Column(Integer, primary_key=True, autoincrement=True)
    fecha_ingreso = Column(DateTime, nullable=False)
    comuna_id = Column(Integer, ForeignKey("comuna.id"), nullable=False)
    sector = Column(String(100))
    nombre = Column(String(200), nullable=False)
    email = Column(String(100), nullable=False)
    celular = Column(String(15))
    tipo = Column(Enum("gato", "perro"), nullable=False)
    cantidad = Column(Integer, nullable=False)
    edad = Column(Integer, nullable=False)
    unidad_medida = Column(Enum("a", "m"), nullable=False) 
    fecha_entrega = Column(DateTime, nullable=False)
    descripcion = Column(Text(500))

    comuna = relationship("Comuna", back_populates="avisos")
    fotos = relationship("Foto", back_populates="aviso", cascade="all, delete")
    contactos = relationship("ContactarPor", back_populates="aviso", cascade="all, delete")


class Foto(Base):
    __tablename__ = 'foto'

    id = Column(Integer, primary_key=True, autoincrement=True)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    aviso_id = Column(Integer, ForeignKey('aviso_adopcion.id'), nullable=False)

    aviso = relationship("AvisoAdopcion", back_populates="fotos")

class ContactarPor(Base):
    __tablename__ = 'contactar_por'

    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(Enum('whatsapp', 'telegram', 'X', 'instagram', 'tiktok', 'otra'), nullable=False)
    identificador = Column(String(150), nullable=False)
    aviso_id = Column(Integer, ForeignKey('aviso_adopcion.id'), nullable=False)

    aviso = relationship("AvisoAdopcion", back_populates="contactos")


# --- Database Functions ---

def get_region_by_id(id):
    session = SessionLocal()
    region = session.query(Region).filter_by(id=id).first()
    session.close()
    return region

def get_comuna_by_id(id):
    session = SessionLocal()
    comuna = session.query(Comuna).filter_by(id=id).first()
    session.close()
    return comuna

def get_region_by_nombre(name):
    session = SessionLocal()
    region = session.query(Region).filter_by(nombre=name).first()
    session.close()
    return region

def get_comuna_by_nombre(nombre_comuna):
    session = SessionLocal()
    comuna = session.query(Comuna).filter(Comuna.nombre == nombre_comuna).first()
    session.close()
    return comuna

def get_last_five_avisos():
    session = SessionLocal()
    avisos = (
        session.query(AvisoAdopcion)
        .options(
            joinedload(AvisoAdopcion.comuna),   
            joinedload(AvisoAdopcion.fotos))
        .order_by(AvisoAdopcion.fecha_ingreso.desc())
        .limit(5)
        .all()
    )
    session.close()
    return avisos

def create_aviso(region, comuna, sector, nombre, email, phone,
                 tipo, cantidad, edad, uni_medida,
                 fecha_dispo, descripcion):
    session = SessionLocal()
    comuna_obj = get_comuna_by_nombre(comuna)
    if uni_medida.lower() in ["años", "a"]:
        unidad = "a"
    else:
        unidad = "m"

    aviso = AvisoAdopcion(
        fecha_ingreso=datetime.now(),
        comuna_id = comuna_obj.id,
        sector=sector,
        nombre=nombre,
        email=email,
        celular=phone,
        tipo=tipo.lower(),
        cantidad=int(cantidad),
        edad=int(edad),
        unidad_medida = unidad, 
        fecha_entrega=fecha_dispo,
        descripcion=descripcion
    )
    session.add(aviso)
    session.commit()
    aviso_id = aviso.id
    session.close()
    return aviso_id


def agregar_foto_a_aviso(aviso_id, img_filename):
    session = SessionLocal()
    foto = Foto(
        ruta_archivo=f"static/uploads/{img_filename}",
        nombre_archivo=img_filename,
        aviso_id=aviso_id
    )
    session.add(foto)
    session.commit()
    session.close()

def agregar_contacto(aviso_id, tipo, valor):
    session = SessionLocal()

    contacto = ContactarPor(aviso_id=aviso_id, nombre=tipo, identificador=valor)
    session.add(contacto)

    session.commit()
    session.close()

def get_all_avisos():
    session = SessionLocal()
    avisos = (
        session.query(AvisoAdopcion)
        .options(
            joinedload(AvisoAdopcion.comuna).joinedload(Comuna.region),
            joinedload(AvisoAdopcion.fotos),
            joinedload(AvisoAdopcion.contactos)
        )
        .order_by(AvisoAdopcion.fecha_ingreso.desc())
        .limit(5)
        .all()
    )
    session.close()
    return avisos


def get_aviso_by_id(aviso_id):
    session = SessionLocal()
    aviso = (
        session.query(AvisoAdopcion)
        .options(
            joinedload(AvisoAdopcion.comuna).joinedload(Comuna.region),
            joinedload(AvisoAdopcion.fotos),
            joinedload(AvisoAdopcion.contactos)
        )
        .filter(AvisoAdopcion.id == aviso_id)
        .first()
    )
    session.close()
    return aviso

def get_paginated_avisos(offset, limit):
    session = SessionLocal()
    query = session.query(AvisoAdopcion).options(
        joinedload(AvisoAdopcion.comuna),
        joinedload(AvisoAdopcion.fotos),
        joinedload(AvisoAdopcion.contactos)
    ).order_by(AvisoAdopcion.fecha_ingreso.desc())

    total = query.count()
    avisos = query.offset(offset).limit(limit).all()
    session.close()
    return avisos, total


