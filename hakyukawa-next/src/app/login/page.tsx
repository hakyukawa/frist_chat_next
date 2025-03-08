import React from "react";
import InputField from "@/components/common/InputField";

function Login() {
    return (
        <div className="p-[16px]">
            <h2 className="text-center my-2 text-[16px] font-semibold">ログイン</h2>
            <form method="POST" className=" border-b border-border p-[14px]">
                <InputField
                    label="ユーザーID"
                    type="text"
                    name="userId"
                    placeholder="ユーザIDを入力"
                />

                <InputField
                    label="パスワード"
                    type="password"
                    name="password"
                    placeholder=""
                    forgetPassword
                />

                <input
                    type="submit"
                    value="ログイン"
                    className="w-full h-[50px] p-4 my-[15px] bg-main text-[1.5rem] text-background font-semibold rounded-[40px]"
                />
            </form>
            <small className="text-[1.4rem] flex items-center justify-center mt-4">
                アカウントをお持ちでない方は
                <span className="text-main underline">
                    <a href="">登録</a>
                </span>
            </small>
        </div>
    );
}

export default Login;
