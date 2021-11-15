const mongoose=require("mongoose");
let PersonaSchema=new mongoose.Schema({
    TipoDocumento: String,
    DocumentoIdentificación: Number,
    Nombres: String,
    Apellidos: String,
    Dirección: String,
    email: String,
    TeléfonoFijo: Number,
    TeléfonoCelular: Number,
    url: String,
    DescripciónPerfil: String
});
module.exports=mongoose.model("persona", PersonaSchema,"Tareas");