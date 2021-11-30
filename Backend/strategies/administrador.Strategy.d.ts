/// <reference types="express" />
import { AuthenticationStrategy } from '@loopback/authentication';
import { Request } from '@loopback/rest/dist/types';
import { UserProfile } from '@loopback/security';
import { servicioAutenticacion } from '../services';
export declare class EstrategiaAdministrador implements AuthenticationStrategy {
    servicioAutenticacion: servicioAutenticacion;
    name: string;
    constructor(servicioAutenticacion: servicioAutenticacion);
    authenticate(request: Request): Promise<UserProfile | undefined>;
}
