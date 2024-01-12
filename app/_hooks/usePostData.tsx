import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

interface UsePostDataProps<TData> {
  onError?: (error: AxiosError) => void;
  onSuccess?: (data: AxiosResponse) => void;
}

interface UserPostDataResult<TData> {
  postData: (url: string, data: FieldValues) => Promise<TData>;
  loading: boolean;
  error: AxiosError | null;
}

const usePostData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const postData = async (url: string, data: FieldValues) => {
    try {
      setLoading(true);
      const response = await axios.post(url, data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error };
};
