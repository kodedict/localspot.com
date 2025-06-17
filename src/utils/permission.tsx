import { AuthUser } from "@/store/_auth_"

const Auth = AuthUser();

const can_role = (roles: string[]) => {
    return roles.includes(Auth.role);
}

const can_permission = (permissions: string[]) => {
    //return Auth.permissions.every((permission: string) => permissions.includes(permission))
    return permissions.some((permission: string) => Auth.permissions.includes(permission))
}

export {
    can_role,
    can_permission,
}