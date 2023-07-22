import { useAppSelector } from "@/redux";
import { SessionSlice } from "@/redux/slices";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { AlertColors, SnackMessage } from "../consts";
import { LoginDTO, SelectDTO } from "../dtos";
import { POSTransactionResult } from "../models";
import useSnackbar from "./useSnackbar";

/**
 * Custom hook para realizar peticiones HTTP utilizando la biblioteca Axios.
 *
 * @param controller Nombre del controlador de la API (opcional).
 */
const useAxios = (controller: string = "") => {
  const { API_URL } = useAppSelector((store) => store.config);
  const { showSnackbar } = useSnackbar();
  const [abortController, setAbortController] = useState<AbortController>(new AbortController());

  /**
   * Construye la URL completa para una solicitud HTTP utilizando el controlador y el endpoint proporcionados.
   *
   * @param endpoint El endpoint de la API.
   * @param id ID del registro (opcional).
   * @returns URL completa para la solicitud.
   */
  const buildUrl = (endpoint: string, id: number): string => {
    let url = `${API_URL}/${controller}/`;
    url += endpoint.length > 0 ? `${endpoint}/` : "";
    url += `${id === 0 ? "" : id}`;
    return url;
  };

  /**
   * Realiza una solicitud HTTP GET para obtener todos los registros del endpoint especificado.
   *
   * @param endpoint Endpoint de la API (opcional).
   * @returns Promesa que se resuelve en un arreglo de registros.
   */
  const getAll = async <T>(endpoint: string = ""): Promise<T[]> => {
    try {
      const url = `${API_URL}/${controller}/${endpoint}`;
      const response: AxiosResponse<T[]> = await axios.get(url);
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data ?? error.message;
      showSnackbar(message, AlertColors.ERROR);
      return [] as T[];
    }
  };

  /**
   * Realiza una solicitud HTTP GET para obtener un registro por su ID y endpoint especificados.
   *
   * @param id ID del registro.
   * @param endpoint Endpoint de la API (opcional).
   * @returns Promesa que se resuelve en el registro solicitado.
   */
  const getById = async <T>(id: number, endpoint: string = ""): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axios.get(buildUrl(endpoint, id), {
        signal: abortController.signal,
      });
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data ?? error.message;
      showSnackbar(message, AlertColors.ERROR);
      return {} as T;
    }
  };

  /**
   * Realiza una solicitud HTTP POST para crear un nuevo registro en el endpoint especificado.
   *
   * @param payload Datos del registro a crear.
   * @param endpoint Endpoint de la API (opcional).
   * @returns Promesa que se resuelve en el resultado de la transacción.
   */
  const post = async <T>(payload: T, endpoint: string = ""): Promise<POSTransactionResult> => {
    try {
      const response: AxiosResponse<POSTransactionResult> = await axios.post(
        buildUrl(endpoint, 0),
        payload
      );
      showSnackbar(SnackMessage.SUCCESS, AlertColors.SUCCESS);
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data ?? error.message;
      showSnackbar(message, AlertColors.ERROR);
      return { success: false, message: error } as POSTransactionResult;
    }
  };

  /**
   * Realiza una solicitud HTTP PUT para actualizar un registro existente en el endpoint especificado.
   *
   * @param payload Nuevos datos del registro.
   * @param endpoint Endpoint de la API (opcional).
   * @returns Promesa que se resuelve en el resultado de la transacción.
   */
  const update = async <T>(payload: T, endpoint: string = ""): Promise<POSTransactionResult> => {
    try {
      const response: AxiosResponse<POSTransactionResult> = await axios.put(
        buildUrl(endpoint, 0),
        payload
      );
      showSnackbar(SnackMessage.SUCCESS, AlertColors.SUCCESS);
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data ?? error.message;
      showSnackbar(message, AlertColors.ERROR);
      return { success: false, message: error } as POSTransactionResult;
    }
  };

  /**
   * Realiza una solicitud HTTP DELETE para eliminar un registro en el endpoint especificado.
   *
   * @param id ID del registro a eliminar.
   * @param endpoint Endpoint de la API (opcional).
   * @returns Promesa que se resuelve en el resultado de la transacción.
   */
  const remove = async (id: number, endpoint: string = ""): Promise<POSTransactionResult> => {
    try {
      const response: AxiosResponse<POSTransactionResult> = await axios.delete(
        buildUrl(endpoint, id)
      );
      showSnackbar(SnackMessage.SUCCESS, AlertColors.SUCCESS);
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data ?? error.message;
      showSnackbar(message, AlertColors.ERROR);
      return { success: false, message: error } as POSTransactionResult;
    }
  };

  /**
   * Realiza una solicitud HTTP POST para iniciar sesión con las credenciales proporcionadas.
   *
   * @param payload Datos de inicio de sesión.
   * @returns Promesa que se resuelve en el estado de sesión.
   */
  const login = async (payload: LoginDTO): Promise<SessionSlice> => {
    try {
      const response: AxiosResponse<SessionSlice> = await axios.post(`${API_URL}/Login`, payload);
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data ?? error.message;
      showSnackbar(message, AlertColors.ERROR);
      return {} as SessionSlice;
    }
  };

  /**
   * Obtiene una lista de elementos de tipo SelectDTO del endpoint y ID especificados.
   *
   * @param endpoint Endpoint de la API.
   * @param id ID del Registro (opcional).
   * @returns Promesa que se resuelve en un arreglo de elementos SelectDTO.
   */
  const selects = async (endpoint: string, id: number = 0): Promise<SelectDTO[]> => {
    try {
      let url = `${API_URL}/Selects/${endpoint}`;
      if (id > 0) url += `/${id}`;
      const response: AxiosResponse<SelectDTO[]> = await axios.get(url);
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data ?? error.message;
      showSnackbar(message, AlertColors.ERROR);
      return {} as SelectDTO[];
    }
  };

  useEffect(() => {
    return () => abortController.abort();
  }, []);

  return {
    getAll,
    getById,
    post,
    update,
    remove,
    login,
    selects,
  };
};

export default useAxios;
