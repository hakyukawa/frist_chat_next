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
    const fetchData = useCallback(async () => {
        setLoading(true); // ローディング開始
        setError(null); // エラー状態をクリア
        setErrorDetails(null); // エラー詳細もクリア

        // ローカルストレージからアクセストークンを取得
        const token = localStorage.getItem("accessToken");

        try {
            // API リクエストを送信
            const response = await axios({
                url,
                method,
                data: requestData,
                headers: {
                    "Content-Type": "application/json", // JSON 形式を指定
                    ...(token ? { Authorization: `Bearer ${token}` } : {}), // 認証トークンがあれば追加
                    ...extraHeaders, // 追加のヘッダーを適用
                },
            });

            // 取得したデータを状態に保存
            setData(response.data as unknown as T);
        } catch (err: unknown) {
            console.error("APIエラー:", err);

            // エラーメッセージを取得し、状態に保存
            const errorMessage = getErrorMessage(err as AxiosError);
            setError(errorMessage);
            setErrorDetails(err);
        } finally {
            setLoading(false); // ローディング終了
        }
    }, [url, method, requestData, extraHeaders]);

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
