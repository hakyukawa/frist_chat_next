import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// カスタムフックの型定義
const useApi = <T, D = unknown>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    requestData?: D,
    headers?: Record<string, string>
) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        setLoading(true);

        // localStorage からトークンを取得
        const token = localStorage.getItem("accessToken");

        try {
            const response = await axios({
                url,
                method,
                data: requestData,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "", // トークンをヘッダーに追加
                    ...headers,
                },
            });

            // 型変換をより安全に行う
            setData(response.data as unknown as T);
            setError(null);
        } catch (err: unknown) {
            // 型安全なエラーハンドリング
            const errorMessage = getErrorMessage(err);
            setError(errorMessage);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [url, method, requestData, headers]);

    // エラーメッセージを取得するヘルパー関数
    const getErrorMessage = (err: unknown): string => {
        if (err instanceof Error) return err.message;

        if (typeof err === "object" && err !== null && "response" in err) {
            const response = (err as Record<string, unknown>).response;
            if (typeof response === "object" && response !== null && "data" in response) {
                const data = response.data as Record<string, unknown>;
                if (typeof data.message === "string") return data.message;
            }
        }

        return "エラーが発生しました";
    };

    useEffect(() => {
        if (method === "GET") {
            fetchData();
        }
    }, [method, fetchData]);

    return { data, error, loading, fetchData };
};

export default useApi;
