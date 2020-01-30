const mongoose = require('mongoose'); //importar mongoose
const uniqueValidator = require('mongoose-beautiful-unique-validation'); //importar libreria para validacion de campos

//json con roles permitidos para el usuario
let rolesValidos = {
    values: ['ADMIN_ROLE', "USER_ROLE"],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema; //crear esquema
//esquema que se guardara como documento en la bd
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    goole: {
        type: Boolean,
        default: false
    }
});
//crear json de los datos del usuario borrando la contraseña
usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;

}

//usando uniquevalidator
usuarioSchema.plugin(uniqueValidator);
//exportar esquema
module.exports = mongoose.model('Usuario', usuarioSchema);