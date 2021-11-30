"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstrategiaAdministrador = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const bearer_token_parser_1 = (0, tslib_1.__importDefault)(require("bearer-token-parser"));
const services_1 = require("../services");
let EstrategiaAdministrador = class EstrategiaAdministrador {
    constructor(servicioAutenticacion) {
        this.servicioAutenticacion = servicioAutenticacion;
        this.name = "administrador";
    }
    async authenticate(request) {
        let token = (0, bearer_token_parser_1.default)(request);
        if (token) {
            let datos = this.servicioAutenticacion.ValidarJWT(token);
            if (datos) {
                let profile = Object.assign({
                    nombre: datos.data.nombre
                });
                if (datos.data.rol != "Administrador") {
                    throw new rest_1.HttpErrors[401]("El rol " + datos.data.rol + " no es válido");
                }
                return profile;
            }
            else {
                throw new rest_1.HttpErrors[401]("El token no es válido");
            }
        }
        else {
            throw new rest_1.HttpErrors[401]("La solicitud no cuenta con un token");
        }
    }
};
EstrategiaAdministrador = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.service)(services_1.servicioAutenticacion)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof services_1.servicioAutenticacion !== "undefined" && services_1.servicioAutenticacion) === "function" ? _a : Object])
], EstrategiaAdministrador);
exports.EstrategiaAdministrador = EstrategiaAdministrador;
//# sourceMappingURL=administrador.Strategy.js.map