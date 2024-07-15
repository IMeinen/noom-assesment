import axios from "axios";
import {
  MonthlySleepLogAverages,
  PostSleepLogPayload,
  SleepData
} from "types/sleepInfoCard.types";
import { useMutation } from "react-query";

const token = JSON.parse(localStorage.getItem("token") || "{}");

export const getSleepLogByDate = async (date: string): Promise<SleepData> => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/api/sleep-log?date=${date}`,
    {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  );
  return response.data;
};

export const postSleepLog = async (
  sleepLog: PostSleepLogPayload
): Promise<SleepData> => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/api/sleep-log`,
    sleepLog,
    {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
  return response.data;
};

export const useCreateSleepLog = () => {
  return useMutation(postSleepLog);
};

export const getMonthlySleepLogAverages = async (
  date: string
): Promise<MonthlySleepLogAverages> => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_BASE_URL}/api/sleep-log/monthly?date=${date}`,
    {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  );
  return response.data;
};
