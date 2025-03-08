import React from "react";
import styles from "@/styles/componentStyles/login/Login.css";
import InputField from "@/components/common/InputField";

function Login() {
    return (
        <div className="p-[16px]">
            <h2 className="text-center my-2 text-[16px] font-semibold">ログイン</h2>
            <form method="POST" className="border-b border-border p-[14px]">
                <div>
                    <InputField
                        label="ユーザーID"
                        type="text"
                        name="userId"
                        placeholder="ユーザIDを入力"
                    />
                    <InputField label="パスワード" type="password" name="password" placeholder="" />
                    <small className="text-main py-4 text-[1.2rem] text-right">
                        <a href="">パスワードをお忘れの方</a>
                    </small>
                </div>
                <input
                    type="submit"
                    value="ログイン"
                    className="w-full p-4 mt-8 bg-main text-[1.5rem] text-white rounded-[40px]"
                ></input>
            </form>
            <small className="center text-[1.4rem]">
                アカウントをお持ちでない方は
                <span className="text-main">
                    <a href="">登録</a>
                </span>
            </small>
        </div>
    );
}

export default Login;
