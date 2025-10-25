from flask import Flask, request, render_template, redirect, url_for, session, jsonify
from flask_cors import cross_origin
from utils.validations import validate_aviso, validate_comentario
from database import db
from werkzeug.utils import secure_filename
import hashlib
import filetype
import os
import uuid

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)
app.secret_key = "secret_key"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# --- Auth Routes ---

@app.route("/", methods=["GET"])
def portada():
    avisos = db.get_last_five_avisos()
    return render_template("portada.html", avisos=avisos)

@app.route("/agregar_aviso", methods=["GET","POST"])
def agregar_aviso():
    if request.method == "POST":
        region = request.form.get("select-region")
        comuna = request.form.get("select-comuna")
        sector = request.form.get("sector")
        nombre = request.form.get("nombre")
        email = request.form.get("email")
        phone = request.form.get("phone")
        tipo = request.form.get("tipo")
        cantidad = request.form.get("cantidad")
        edad = request.form.get("edad")
        uni_medida = request.form.get("uni_medida")
        fecha_dispo = request.form.get("fecha_dispo")
        descripcion = request.form.get("descripcion")
        fotos = request.files.getlist("files")
        comments = request.form.getlist("comments")
        tipos = request.form.getlist("contactar_por")

        error = ""

        print("pre validacion")
        if validate_aviso(region, comuna, sector, nombre, email, tipo, cantidad, edad, uni_medida, fecha_dispo, fotos):
            # Crear aviso
            aviso_id = db.create_aviso(region, comuna, sector, nombre, email, phone,
                                       tipo, cantidad, edad, uni_medida, fecha_dispo, descripcion)
            
            if aviso_id is None:
                return render_template("agregar.html", error="Error al crear el aviso")

            # Guardar fotos
            for foto in fotos:
                _filename = hashlib.sha256(
                    secure_filename(foto.filename).encode("utf-8")
                ).hexdigest()
                _extension = filetype.guess(foto).extension
                img_filename = f"{_filename}_{str(uuid.uuid4())}.{_extension}"

                foto.save(os.path.join(app.config["UPLOAD_FOLDER"], img_filename))
                db.agregar_foto_a_aviso(aviso_id, img_filename)

            # Guardar contactos
            for i in range(0, len(tipos)):
                db.agregar_contacto(aviso_id, tipos[i], comments[i])

            return redirect(url_for("portada", msg="Aviso agregado correctamente"))
        else:
            return render_template("agregar.html", error="Los datos ingresados no son válidos.")

    return render_template("agregar.html")

@app.route("/listado")
def listar_adopciones():
    avisos = db.get_all_avisos()

    page = request.args.get("page", 1, type=int)
    limit = 5  
    offset = (page - 1) * limit

    avisos, total = db.get_paginated_avisos(offset, limit)

    total_pages = (total + limit - 1) // limit  
    return render_template("listado.html", avisos=avisos, page=page, total_pages=total_pages)

@app.route("/info_listado/<int:aviso_id>")
def info_listado(aviso_id):
    aviso = db.get_aviso_by_id(aviso_id)
    if aviso is None:
        return render_template("informacion_adopcion.html", error="Aviso no encontrado")
    return render_template("informacion_adopcion.html", aviso=aviso)


# --- estadisticas --
@app.route("/estadisticas")
def estadisticas():
    return render_template("estadisticas.html")


@app.route("/get/avisos_por_dia", methods=["GET"])
@cross_origin(origin="127.0.0.1", supports_credentials=True)
def get_avisos_por_dia():
    data_dic = db.get_avisos_por_dia()
    data = []
    for dia in data_dic:
        cantidad = data_dic[dia]
        registro = {
            "dia": dia,
            "cantidad": cantidad
        }
        data.append(registro)
    return jsonify(data)

@app.route("/get/avisos_por_tipo", methods=["GET"])
@cross_origin(origin="127.0.0.1", supports_credentials=True)
def get_avisos_por_tipo():
    data_dict = db.get_avisos_por_tipo()
    data = []
    for tipo in data_dict:
        cantidad = data_dict[tipo]
        registro = {
            "tipo": tipo,
            "cantidad": cantidad
        }
        data.append(registro)

    return jsonify(data)


@app.route("/get/avisos_por_mes", methods=["GET"])
@cross_origin(origin="127.0.0.1", supports_credentials=True)
def get_avisos_por_mes():
    dataPerros = list(range(12))
    dataGatos = list(range(12))
    avisos = db.get_avisos_por_mes()
    for i in range(12):
        dataPerros[i] = avisos[i]["Perros"]
        dataGatos[i] = avisos[i]["Gatos"]

    return jsonify({
        "perros": dataPerros, 
        "gatos": dataGatos
        })


# --- comentarios ---
@app.route("/agregar_comentario/<int:aviso_id>", methods=["POST"])
def agregar_comentario(aviso_id):
    form = request.get_json()
    nombre = form.get("nombre", "").strip()
    texto = form.get("texto", "").strip()

    if not validate_comentario(nombre, texto):
        return jsonify({"status": "error", "message": "Datos inválidos"}), 400

    db.agregar_comentario(aviso_id, nombre, texto)
    return jsonify({"status": "ok", "message": "Comentario agregado correctamente"})

    
@app.route("/comentarios/<int:id>", methods=["GET"])
def get_comentarios(id):
    comentarios = db.get_comentarios_by_aviso(id)
    data = []
    for c in comentarios:
        data.append({
            "nombre": c.nombre,
            "texto": c.texto,
            "fecha": c.fecha.strftime("%Y-%m-%d")
        })
    return jsonify(data)




