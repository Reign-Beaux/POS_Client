/**
 * Tipos de roles de usuario.
 */
export type UserRoles = "admin" | "sales" | "purchases" | "inventory";

/**
 * Colores de alerta.
 */
export enum AlertColors {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  SUCCESS = "success",
}
/**
 * Ancho del drawer (cajón lateral).
 */
export const DRAWER_WIDTH = 240;

/**
 * Mensajes de snack (notificación breve).
 */
export enum SnackMessage {
  SUCCESS = "Operación realizada correctamente",
}

/**
 * Mensajes de confirmación para acciones.
 */
export enum ConfirmActionMessage {
  DELETE = "¿Desea eliminar el registro seleccionado?",
}

/**
 * Tasas de impuestos.
 */
export enum Taxes {
  IVA = 0.16,
}
