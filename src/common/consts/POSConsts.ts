/**
 * Tipos de roles de usuario.
 */
export type UserRoles = "admin" | "sales" | "purchases" | "inventory";

/**
 * Controladores del API
 */

export enum APIControllers {
  AREAS = "Areas",
  ARTICLES = "Articles",
  ARTICLES_TYPES = "ArticlesTypes",
  BRANDS = "Brands",
  EMPLOYEES = "Employees",
  INVENTORIES = "Inventories",
  LOGIN = "Login",
  PURCHASE_DETAILS = "PurchaseDetails",  
  PURCHASES = "Purchases", 
  ROLES = "Roles",
  SELECTS = "Selects",
  SUPPLIERS = "Suppliers",
  USERS = "Users",
}

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

/**
 * Estado de la compra.
 */
export enum PurchaseStatus {
  PENDIENTE = 1,
  CONFIRMADO = 2,
  PROGRAMADO = 3,
  RECIBIDO = 4,
}

export const PurchaseStatusTexts: { [key: number]: string } = {
  [PurchaseStatus.PENDIENTE]: 'Pendiente',
  [PurchaseStatus.CONFIRMADO]: 'Confirmado',
  [PurchaseStatus.PROGRAMADO]: 'Programado',
  [PurchaseStatus.RECIBIDO]: 'Recibido',
};