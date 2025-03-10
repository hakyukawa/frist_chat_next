import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Define the AxiosError type with more specific types instead of any
type AxiosError = {
    response?: {
        data: unknown;
        status: number;
        statusText: string;
    };
    request?: unknown;
    message: string;
};

// Modify the hook to ensure proper type handling without using any
const useApi = <T, D = unknown>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    requestData?: D,
    extraHeaders?: Record<string, string>
) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorDetails, setErrorDetails] = useState<unknown | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        setErrorDetails(null);

        const token = localStorage.getItem("accessToken");

        try {
            const response = await axios({
                url,
                method,
                data: requestData,
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    ...extraHeaders,
                },
            });

            // Fixed the type conversion issue here
            setData(response.data as unknown as T);
        } catch (err: unknown) {
            console.error("APIエラー:", err);

            // Cast error to our defined AxiosError type
            const errorMessage = getErrorMessage(err as AxiosError);
            setError(errorMessage);
            setErrorDetails(err);
        } finally {
            setLoading(false);
        }
    }, [url, method, requestData, extraHeaders]);

    const getErrorMessage = (err: AxiosError): string => {
        if (err.response) {
            console.error("サーバーレスポンス:", err.response.data);
            return `サーバーエラー: ${err.response.status} - ${err.response.statusText}`;
        } else if (err.request) {
            return "リクエストは送信されたが、応答がありません";
        } else {
            return `リクエストエラー: ${err.message}`;
        }
    };

    useEffect(() => {
        if (method === "GET") {
            fetchData();
        }
    }, [method, fetchData]);

    return { data, error, loading, fetchData, errorDetails };
};

export default useApi;
