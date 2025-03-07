"use client"; 
import React, {useState} from "react";
import Header from "@/components/common/Header";
import Setting from "@/components/common/setting";

function UserIdConfig () {
    //テスト用ユーザーID
    const nowuserid = "hakyukawa-test";
    const demouserid = ["user01","user02","user03"];
    
    //入力・エラー状態管理
    const [formData,setFormData] = useState({
        newUserId: ""
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

        if(!formData.newUserId){
            newErrors.newUserId = "記入してください";
        }else if(nowuserid.includes(formData.newUserId)){
            newErrors.newUserId ="現在と同じユーザーIDは使用できません!";
        }else if (demouserid.includes(formData.newUserId)){
            newErrors.newUserId = "このユーザーIDは既に使用されています"
        }else if(!/^[0-9A-Za-z._-]+$/.test(formData.newUserId)){
            newErrors.newUserId ="半角英数字、アンダーバー（_）、ピリオド（.）、ハイフン（-）のみ使用できます"
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
        }
    };
    
    return(
        <div>  
            <Header backPage backPageLink ="/" backPageText="ユーザーIDを変更" />
            <Setting 
                nowuserid = {nowuserid}
                title = "ユーザーID"
                name = "newUserId"
                value = {formData.newUserId}
                onchange = {handleChange}
                error={errors.newUserId}
                submitvalue = "変更"
                formdata = {formData}
                errors = {errors}
                onsubmit={handleSubmit}
            />
        </div>
    );
}

export default UserIdConfig;