"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/common/InputField";
import axios from "axios";

// レスポンスの型を定義
interface LoginResponse {
    message: string;
    access_token: string;
    refresh_token: string;
    user_id: string;
    error?: string;
}

// エラーレスポンスの型定義
interface ErrorResponse {
    message: string;
}

// Axiosエラー用のインターフェース
interface AxiosErrorType {
    response?: {
        data?: unknown;
    };
}

// Axiosエラー用のカスタム型ガード
function isAxiosError(error: unknown): error is AxiosErrorType {
    return Boolean(
        error &&
            typeof error === "object" &&
            "response" in error &&
            error.response &&
            typeof error.response === "object" &&
            "data" in error.response
    );
}

function Login() {
    const router = useRouter();
    const [user_id, setUser_id] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // フォームのデフォルト送信を防止

        try {
            const response = await axios.post<LoginResponse>("http://localhost:3001/api/v1/login", {
                user_id: user_id,
                password: password,
            });

            // ログイン成功後、アクセストークンをlocalStorageに保存
            if (response.data.access_token) {
                localStorage.setItem("accessToken", response.data.access_token);
                alert(response.data.message);
            }
            router.push("/home"); // ログイン後のページにリダイレクト
        } catch (error: unknown) {
            // カスタム型ガードを使用したエラーチェック
            if (isAxiosError(error) && error.response?.data) {
                const errorData = error.response.data as ErrorResponse;
                setError(errorData.message || "ログイン失敗");
            } else {
                setError("ログイン中にエラーが発生しました");
            }
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-center my-2 text-base font-semibold">ログイン</h2>
            <form onSubmit={handleLogin} className="border-b border-border p-4">
                <InputField
                    label="ユーザーID"
                    type="text"
                    name="userId"
                    placeholder="ユーザIDを入力"
                    onChange={(e) => setUser_id(e.target.value)}
                />
                <InputField
                    label="パスワード"
                    type="password"
                    name="password"
                    placeholder=""
                    forgetPassword
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="submit"
                    value="ログイン"
                    className="w-full h-12 p-4 my-4 bg-main text-background font-semibold rounded-full"
                />
            </form>
            <small className="text-sm flex items-center justify-center mt-4">
                アカウントをお持ちでない方は
                <span className="text-main underline">
                    <a href="/signup">登録</a>
                </span>
            </small>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}

export default Login;
