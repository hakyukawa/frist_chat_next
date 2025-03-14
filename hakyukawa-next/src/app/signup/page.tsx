"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import useApi from "@/hooks/useApi";
import InputField from "@/components/common/InputField";
import SubmitButton from "@/components/common/SubmitButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FormData {
    user_id: string;
    user_name: string;
    mail: string;
    password: string;
    password_confirmation: string;
}

interface Error {
    user_name?: string;
    user_id?: string;
    mail?: string;
    password?: string;
    password_confirmation?: string;
}

function Signup() {
    const demomail = ["aiueo@exsample.com", "sample@sample.com", "test@test.com"];
    const demouser_names = ["user01", "user02", "user03"];
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        user_id: "",
        user_name: "",
        mail: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState<Error>({});

    // useApiフックの利用
    const { data, error, loading, fetchData } = useApi<{ message: string }>(
        "http://localhost:3001/api/v1/signup",
        "POST"
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const newErrors: Error = {};
        if (!formData.user_name) newErrors.user_name = "記入してください";
        if (!formData.user_id) newErrors.user_id = "記入してください";
        else if (demouser_names.includes(formData.user_id))
            newErrors.user_id = "このIDは既に使用されています";
        else if (!/^[A-Za-z0-9]+$/.test(formData.user_id))
            newErrors.user_id = "半角英数字で入力してください";

        const domain = formData.mail.split("@")[1];
        if (!formData.mail) newErrors.mail = "記入してください";
        else if (
            /[\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\u3000\uFF01-\uFF5E\u3040-\u309F]/.test(
                formData.mail
            ) ||
            /[\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\u3000\uFF01-\uFF5E\u3040-\u309F]/.test(domain)
        ) {
            newErrors.mail = "半角英数字で入力してください";
        } else if (!/\S+@\S+\.\S+/.test(formData.mail) || formData.mail.includes(" ")) {
            newErrors.mail = "メールアドレスを正しくご入力ください";
        } else if (demomail.includes(formData.mail)) {
            newErrors.mail = "このメールアドレスは既に使用されています";
        }

        if (!formData.password) newErrors.password = "記入してください";
        else if (formData.password.length < 8) {
            newErrors.password = "パスワードは8文字以上で入力してください";
            newErrors.password_confirmation = "パスワードは8文字以上で入力してください";
        }

        if (!formData.password_confirmation) newErrors.password_confirmation = "記入してください";
        else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = "パスワードが一致しません";
            newErrors.password = "パスワードが一致しません";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            await fetchData(formData); // useApi の fetchData にデータを渡す
            if (data) {
                router.push("/login");
            }
        }
    };

    useEffect(() => {
        if (data) {
            alert("登録が完了しました");
        }
        if (error) {
            alert(`エラー: ${error}`);
        }
    }, [data, error]);

    return (
        <div className="p-[16px]">
            <Header backPage backPageLink="/login" backPageText="戻る" />
            <div className="flex items-center justify-center m-6">
                <Image src="/img/logo.svg" alt="ロゴ画像" width={300} height={200} />
            </div>
            <form onSubmit={handleSubmit} className="p-[14px] border-b border-subText">
                <p className="text-[18px] font-bold text-center font-semibold">
                    新規アカウント登録
                </p>
                <InputField
                    label="ユーザー名"
                    type="text"
                    name="user_name"
                    placeholder="ユーザー名を入力"
                    value={formData.user_name}
                    onChange={handleChange}
                    error={errors.user_name}
                />
                <InputField
                    label="ユーザーID"
                    type="text"
                    name="user_id"
                    placeholder="ユーザーIDを入力"
                    value={formData.user_id}
                    onChange={handleChange}
                    error={errors.user_id}
                />
                <InputField
                    label="メールアドレス"
                    type="text"
                    name="mail"
                    placeholder="sample@email.com"
                    value={formData.mail}
                    onChange={handleChange}
                    error={errors.mail}
                />
                <InputField
                    label="パスワード"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <InputField
                    label="パスワード(確認用)"
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    error={errors.password_confirmation}
                />
                <p className="text-center p-[10px] text-[14px]">
                    <span className="text-main underline">
                        <a href="">利用規約・プライバシーポリシー</a>
                    </span>
                    に同意の上
                </p>
                <SubmitButton buttonValue={loading ? "送信中..." : "アカウントを作成"} />
            </form>
            <p className="text-center text-[14px] p-[10px]">
                アカウントをお持ちの方は
                <span className="text-main underline">
                    <a href="/login">ログイン</a>
                </span>
                してください
            </p>
        </div>
    );
}

export default Signup;
