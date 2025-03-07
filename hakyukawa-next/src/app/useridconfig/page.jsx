"use client"; 
import React, {useState} from "react";
import Header from "@/components/common/Header";

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
            <div className="p-[16px]">
                <form onSubmit={handleSubmit} action="" method="POST">
                    <div className="py-[10px]">
                        <p className="text-[14px] text-subText font-semibold">現在</p>
                        <p className="text-[18px] text-subText font-light">{`${nowuserid}`}</p>
                    </div>
                    <div className="py-[10px]">
                        <p className="text-[14px] text-subText font-semibold">新しいユーザーID</p>
                        <input type="text" name="newUserId" value={formData.newUserId} onChange={handleChange} error={errors.newUserId} className={`w-full text-[20px] font-light border-b-2 ${errors.newUserId ? 'border-red-500' : 'border-main'} `}/>
                        {errors.newUserId &&<p className="text-red-500 text-xs text-[11px] py-[10px]">{errors.newUserId}</p>}
                    </div>
                    <div className="p-[15px]">
                        <input 
                            type="submit"
                            value="変更"
                            className={`bg-border border-none rounded-[40px] w-full p-[10px] text-[15px] ${
                                Object.values(formData).every(value =>  value.trim() !== "") && Object.keys(errors).length === 0 ? "bg-main" :
                                Object.values(formData).every(value =>  value.trim() !== "") && Object.keys(errors).length > 0 
                                ? "bg-main" : "bg-border"
                            }`}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserIdConfig;