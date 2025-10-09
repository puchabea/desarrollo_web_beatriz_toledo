import re
import filetype
from datetime import datetime, timedelta
from database import db

def validate_region(value):
    region = db.get_region_by_id(int(value))  
    return region is not None


def validate_comuna(value):
    comuna = db.get_comuna_by_nombre(value.strip())
    return comuna is not None


def validate_lugar(comuna_nombre, region_id):
    comuna = db.get_comuna_by_nombre(comuna_nombre.strip())
    region = db.get_region_by_id(int(region_id))
    if not comuna or not region:
        return False
    return comuna.region_id == region.id

def validate_sector(value):
    if len(value) >= 100:
        return False
    return True
    
def validate_nombre(value):
    if value:
        if len(value) >= 3 and len(value) < 200:
            return True
    return False

def validate_email(value):
    if value:
        r = r'^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
        return len(value) <= 100 and bool(re.match(r, value))
    return False

def validate_tel(value): 
    if value:
        r = r'/^\+\d{3}\.\d{8}$/'
        return bool(re.match(r, value))

def validate_contactarPor(value):  # formato 
    if value:
        if value.lower() in ["whatsapp", "telegram", "instagram", "X", "tikTok", "otra"]:
            return True
        return False
def validate_contactos(values):
    if len(values) > 5:
        return False
    for value in values:
        if not validate_contactos(value):
            return False
    return True

def validate_identificador(value):
    return len(value) >= 4 and len(value) <= 50

def validate_identificadores(values):
    for value in values:
        if not validate_identificador(value):
            return False
    return True
    
def validate_tipo(value):
    if value:
        if value.lower() in ["gato", "perro"]:
            return True
    return False
 
def validate_cantidad(value):
    if value:
        if value.isdigit() and int(value) > 0:
            return True
    return False

def validate_edad(value):
    if value:
        if value.isdigit() and int(value) > 0: 
            return True
    return False

def validate_uni_medida(value):
    if value:
        uni_medida = value.lower()
        if uni_medida in ["m", "a", "meses", "años"]:
            return True
    return False

def validate_fecha_dispo(fecha):
    if fecha:
        # Formato esperado: 2025-10-10T02:02
        pattern = r'^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d$'
        if re.match(pattern, fecha):
            fecha_dt = datetime.strptime(fecha, "%Y-%m-%dT%H:%M")
            fecha_default = datetime.now() + timedelta(hours=3)
            return fecha_dt > fecha_default
    return False

def validate_foto(value):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif"}

    # check if a file was submitted
    if value is None:
        return False

    # check if the browser submitted an empty file
    if value.filename == "":
        return False
    
    # check file extension
    ftype_guess = filetype.guess(value)
    if ftype_guess.extension not in ALLOWED_EXTENSIONS:
        return False
    # check mimetype
    if ftype_guess.mime not in ALLOWED_MIMETYPES:
        return False
    return True

def validate_fotos(fotos):
    if len(fotos) < 1 or len(fotos) > 5:
        return False
    for foto in fotos:
        if not validate_foto(foto):
            return False
    return True

def validate_aviso(region, comuna, sector, nombre, email, tipo, cantidad, edad, uni_medida, fecha_dispo, fotos):
    if not validate_region(region):
        return False

    if not validate_comuna(comuna):
        return False

    if not validate_lugar(comuna, region):
        return False

    if not validate_sector(sector):
        return False

    if not validate_nombre(nombre):
        return False

    if not validate_email(email):
        return False

    if not validate_tipo(tipo):
        return False

    if not validate_cantidad(cantidad):
        return False

    if not validate_edad(edad):
        return False

    if not validate_uni_medida(uni_medida):
        return False

    if not validate_fecha_dispo(fecha_dispo):
        return False

    if not validate_fotos(fotos):
        return False
    return True

