"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstrategiaAsesor = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const bearer_token_parser_1 = require("bearer-token-parser");
const services_1 = require("../services");
let EstrategiaAsesor = class EstrategiaAsesor {
    constructor(servicioAutenticacion) {
        this.servicioAutenticacion = servicioAutenticacion;
        this.name = "asesor";
    }
    async authenticate(request) {
        let token = (0, bearer_token_parser_1.BearerParser)(request);
        if (token) {
            let datos = this.servicioAutenticacion.ValidarJWT(token);
            if (datos) {
                let profile = Object.assign({
                    nombre: datos.data.nombre
                });
                if (datos.data.rol != "Asesor") {
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
EstrategiaAsesor = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.service)(services_1.AutenticacionService)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof services_1.AutenticacionService !== "undefined" && services_1.AutenticacionService) === "function" ? _a : Object])
], EstrategiaAsesor);
exports.EstrategiaAsesor = EstrategiaAsesor;
//# sourceMappingURL=asesor.Strategy.js.map