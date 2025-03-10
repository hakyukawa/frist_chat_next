"use client"; 
import React, {useState} from "react";
import Header from "@/components/common/Header";
import Status from "@/components/common/option/Status";
import SubmitButton from "@/components/common/SubmitButton";
import InputForm from "@/components/common/option/InputForm";


function MailaddressConfig () {

    const now_mail = "hakyukawa@hakyukawa.com";
    const demomail = ["aiueo@exsample.com", "sample@sample.com", "test@test.com"];

    //入力・エラー状態管理
        const [formData,setFormData] = useState({
            new_mail: "",
        });
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
    
            const domain = formData.new_mail.split("@")[1];
        if (!formData.new_mail) newErrors.new_mail = "記入してください";
        else if (
            /[\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\u3000\uFF01-\uFF5E\u3040-\u309F]/.test(
                formData.new_mail
            ) ||
            /[\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\u3000\uFF01-\uFF5E\u3040-\u309F]/.test(domain)
        ) {
            newErrors.new_mail = "半角英数字で入力してください";
        } else if (!/\S+@\S+\.\S+/.test(formData.new_mail) || formData.new_mail.includes(" ")) {
            newErrors.new_mail = "メールアドレスを正しくご入力ください";
        } else if(now_mail.includes(formData.new_mail)){
            newErrors.new_mail = "現在と同じメールアドレスは使用できません。"
        }else if (demomail.includes(formData.new_mail)) {
            newErrors.new_mail = "このメールアドレスは既に使用されています";
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
                console.log("変更に失敗しました");
            }
        };

    return  (
        <div>
            <Header backPage backPageLink ="/" backPageText="メールアドレスを変更" />
            <form onSubmit={handleSubmit} action="" method="POST" className="p-[16px]" >
                <Status
                    nowState={now_mail}
                />
                <InputForm 
                    label={"新しいメールアドレス"}
                    inputName ="new_mail"
                    formData =  {formData.new_mail}
                    error = {errors.new_mail}
                    onChange = {handleChange}
                />
                <SubmitButton 
                    buttonValue="認証メールアドレスを送信"
                />  
            </form>
        </div>
        
    );
}

export default MailaddressConfig;



