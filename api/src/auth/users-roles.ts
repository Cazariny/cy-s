import { RolesBuilder } from "nest-access-control";

export enum UserRoles{
    Admin ='Admin',
    Lector = 'Lector'
}

export const roles: RolesBuilder = new RolesBuilder();

roles.grant(UserRoles.Lector)
    .readAny(['posts'])
    .grant(UserRoles.Admin)
    .extend(UserRoles.Lector)
    .updateAny(['posts'])
    .createAny(['posts'])
    .deleteAny(['posts'])