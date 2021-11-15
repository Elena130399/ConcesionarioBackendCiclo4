const { Router } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const PersonaSchema = require("./models/Persona.js");
const app = express();



const router = express.Router();
app.use(express.urlencoded({ extented: true }));
app.use(express.json())

router.get("/", (req, res) => {
    res.send("Hola node JS");
});

//Conexion BD
mongoose.connect("mongodb+srv://BasedeDatosCiclo4:Elenita13@clusterproyecto.f7gvn.mongodb.net/myBasedeDatosProyecto?retryWrites=true&w=majority")

//CRUD Persona

router.get("/persona", (req, res) => {

    let DocumentoIdentificacion = req.query.DocumentoIdentificacion;
    if (DocumentoIdentificacion == "")
        PersonaSchema.find(function (err, datos) {
            if (err) {
                console.log("Error en la consulta de la persona");
            }
            else {
                res.send(datos);
            }
        });

    else {
        PersonaSchema.find({ DocumentoIdentificacion: DocumentoIdentificacion }, function (err, datos) {
            if (err) {
                console.log("Error en la consulta de la persona");
            }
            else {
                res.send(datos);
            }
        });
    }
});
router.post("/persona", (req, res) => {
    let nuevaPersona = new PersonaSchema({
        TipoDocumento: req.body.TipoDocumento,
        DocumentoIdentificacion: req.body.DocumentoIdentificación,
        Nombres: req.body.Nombres,
        Apellidos: req.body.Apellidos,
        Dirección: req.body.Direccion,
        email: req.body.email,
        TeléfonoFijo: req.body.TeléfonoFijo,
        TeléfonoCelular: req.body.TeléfonoCelular,
        url: req.body.url,
        DescripciónPerfil: req.body.DescripciónPerfil
    });
    nuevaPersona.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Persona almacenada correctamente");
        }
    });

});
router.delete("/persona", (req, res) => {
    PersonaSchema.deleteOne({ DocumentoIdentificacion: DocumentoIdentificacion }, function (err) {
        if (err) {
            console.log("Error al eliminar a la persona");
        }
        else {
            res.send("Persona eliminada correctamente");
        }
    });
});
app.use(router);
app.listen(8000, () => {
    console.log("Servidor nodejs, puerto 8000");
});
