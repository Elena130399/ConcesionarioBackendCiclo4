import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {Request} from '@loopback/rest/dist/types';
import {UserProfile} from '@loopback/security';
import parseBearerToken, { BearerParser } from "bearer-token-parser";
import {AutenticacionService} from "../services";


export class EstrategiaAsesor implements AuthenticationStrategy {
  name: string = "asesor";
  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) {

  }
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = BearerParser(request);
    if (token) {
      let datos = this.servicioAutenticacion.ValidarJWT(token);
      if (datos) {
        let profile: UserProfile = Object.assign({
          nombre: datos.data.nombre
        });
        if (datos.data.rol != "Asesor") {
          throw new HttpErrors[401]("El rol " + datos.data.rol + " no es válido");
        }
        return profile;
      } else {
        throw new HttpErrors[401]("El token no es válido");
      }

    } else {
      throw new HttpErrors[401]("La solicitud no cuenta con un token");
    }
  }
}