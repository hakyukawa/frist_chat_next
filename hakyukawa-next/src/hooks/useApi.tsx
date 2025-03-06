import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// APIリクエスト用カスタムフック
const useApi = <T,>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    requestData?: unknown,
    headers?: Record<string, string>
) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios({
                url,
                method,
                data: requestData,
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
            });
            setData(response.data as T);
            setError(null);
        } catch (err: unknown) {
            if (err && typeof err === "object" && "response" in err) {
                const errorResponse = err as { response?: { data?: { message?: string } } };
                setError(errorResponse.response?.data?.message || "エラーが発生しました");
            } else {
                setError("エラーが発生しました");
            }
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [url, method, requestData, headers]);

    useEffect(() => {
        if (method === "GET") {
            fetchData();
        }
    }, [method, fetchData]);

    return { data, error, loading, fetchData };
};

export default useApi;
