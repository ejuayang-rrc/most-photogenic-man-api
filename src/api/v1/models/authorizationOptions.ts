/**
 * An interface representing Authorization roles.
 */
export interface AuthorizationOptions {
    /** A list of roles to assign to a user */
    hasRole: Array<"mod" | "user" | "admin">;

    /** To allow a user to manage thyself */
    allowSameUser?: boolean;
}
