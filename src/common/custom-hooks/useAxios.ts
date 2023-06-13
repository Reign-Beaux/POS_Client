import { POSReducer } from "@/redux";
import { SessionSlice } from "@/redux/slices";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AlertColors, SnackMessage } from "../consts";
import { LoginDTO, SelectDTO } from "../dtos";
import { POSTransactionResult } from "../models";
import useSnackbar from "./useSnackbar";

const useAxios = (controller: string = "") => {
  const { API_URL } = useSelector((store: POSReducer) => store.config);
  const { showSnackbar } = useSnackbar();
  const [abortController, setAbortController] = useState<AbortController>(new AbortController());
  const buildUrl = (endpoint: string, id: number): string => {
    let url = `${API_URL}/${controller}/`;
    url += endpoint.length > 0 ? `${endpoint}/` : "";
    url += `${id === 0 ? "" : id}`;
    return url;
  };

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
