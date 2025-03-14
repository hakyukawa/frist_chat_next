"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Axios のエラーハンドリングのための型定義
type AxiosError = {
    response?: {
        data: unknown; // レスポンスのデータ（型は不明）
        status: number; // HTTP ステータスコード
        statusText: string; // HTTP ステータスのテキスト
    };
    request?: unknown; // リクエストオブジェクト（未定義の場合もある）
    message: string; // エラーメッセージ
};

// API を呼び出すためのカスタムフック
// `T` は取得するデータの型
// `D` はリクエストデータの型（デフォルトは `unknown`）
const useApi = <T, D = unknown>(
    url: string, // API のエンドポイント
    method: "GET" | "POST" | "PUT" | "DELETE", // HTTP メソッド
    requestData?: D, // リクエスト時に送るデータ（省略可）
    extraHeaders?: Record<string, string> // 追加の HTTP ヘッダー（省略可）
) => {
    // API から取得したデータ
    const [data, setData] = useState<T | null>(null);
    // エラーメッセージ
    const [error, setError] = useState<string | null>(null);
    // ローディング状態
    const [loading, setLoading] = useState<boolean>(false);
    // 詳細なエラー情報
    const [errorDetails, setErrorDetails] = useState<unknown | null>(null);

    // API を非同期で呼び出す関数
    const fetchData = useCallback(
        async (requestData?: D) => {
            // requestData を引数として受け取る
            setLoading(true);
            setError(null);
            setErrorDetails(null);

            const token = localStorage.getItem("accessToken");

            try {
                const response = await axios({
                    url,
                    method,
                    data: requestData, // requestData を送信する
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                        ...extraHeaders,
                    },
                });

                setData(response.data as unknown as T);
            } catch (err: unknown) {
                console.error("APIエラー:", err);
                const errorMessage = getErrorMessage(err as AxiosError);
                setError(errorMessage);
                setErrorDetails(err);
            } finally {
                setLoading(false);
            }
        },
        [url, method, extraHeaders]
    );

    // エラーメッセージを生成する関数
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

    // コンポーネントがマウントされたときに `GET` リクエストを自動で実行
    useEffect(() => {
        if (method === "GET") {
            fetchData();
        }
    }, [method, fetchData]);

    // フックの返り値（API の結果やエラー情報など）
    return { data, error, loading, fetchData, errorDetails };
};

export default useApi;
