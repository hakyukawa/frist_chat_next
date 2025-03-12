"use client"; 
import React, {useState} from "react";
import Header from "@/components/common/Header";
import PasswordForm from "@/components/common/option/passwordForm";
import SubmitButton from "@/components/common/SubmitButton";

function PasswordConfig (){
     //入力・エラー状態管理
    const [formData,setFormData] = useState({
        password: "",
        password_confirmation: "",
    })
    const [errors,setErrors] = useState({});

    //入力内容の変更を反映
    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    //バリデーション
    const validate = () => {
        const newErrors = {};

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
    const handleSubmit = (e) => {
        e.preventDefault();
        // バリデーションを実行
        if (validate()) {
            console.log("フォーム送信");
            alert("登録が完了しました");
        }else{
            alert("エラー");
        }
    };

    return(
        <div>
            <Header backPage backPageLink ="/configMenu" backPageText="パスワードを変更"  />
            <form onSubmit={handleSubmit} action="" method="POST" className="p-[16px]">
                <PasswordForm
                    label="パスワード"
                    inputName="password"
                    formData ={formData.password}
                    error={errors.password}
                    onChange = {handleChange}
                />
                <PasswordForm
                    label="パスワード(確認用)"
                    inputName="password_confirmation"
                    formData ={formData.password_confirmation}
                    error={errors.password_confirmation}
                    onChange = {handleChange}
                />
                <SubmitButton 
                    buttonValue="変更"
                />
            </form>
        </div>
    );
}

export default PasswordConfig;