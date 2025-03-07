"use client"; 
import React, { useState } from "react";
import Header from "@/components/common/Header";

function InputField(props) {
  return (
    <div className="p-[10px]">
        <div className="flex items-center">
            <label className="text-[14px] font-semibold">{props.label}</label>
            {props.error && <p className="text-red-500 text-xs text-[11px] px-[10px]">{props.error}</p>}
        </div>
        {!props.error && props.subtext &&(
            <p className="text-[11px]">{props.subtext}</p>
        )}
        
      <input
        type={props.type}
        name={props.name}
        pattern={props.pattern}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className={`p-[10px] text-[13px]  font-light border ${props.error ? 'border-red-500' : 'border-main'} w-full rounded-lg`}
      />
      
    </div>
  );
}

function Signup() {
    //テスト用メールアドレス
    const demoMailAddress = ["aiueo@exsample.com","sample@sample.com","test@test.com"];
    //テスト用ユーザーID
    const demoUserNames = ["user01", "user02","user03"];
    // フォームの入力データとエラー状態の管理
    const [formData, setFormData] = useState({
        username: "",
        userId: "",
        mailaddress: "",
        password: "",
        password_confirmation: "",
    });

  const [errors, setErrors] = useState({});

  // 入力内容の変更を反映
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // バリデーションチェック
  const validate = () => {
    const newErrors = {};

    

    // ユーザー名のチェック
    if (!formData.username ) newErrors.username = "記入してください";
    // ユーザーIDのチェック
    if (!formData.userId){
        newErrors.userId = "記入してください";
    }else if(demoUserNames.includes(formData.userId)){
        newErrors.userId = "このIDは既に使用されています"
    }else if(!/^[A-Za-z0-9]+$/.test(formData.userId)){
        newErrors.userId = "半角英数字で入力してください"
    }


    // メールアドレスのチェック
    const domain = formData.mailaddress.split('@')[1]
    if (!formData.mailaddress) {
        newErrors.mailaddress = "記入してください";
    } else if (/[\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\u3000\uFF01-\uFF5E\u3040-\u309F]/.test(formData.mailaddress) || /[\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\u3000\uFF01-\uFF5E\u3040-\u309F]/.test(domain)) { // 全角文字をチェック
        newErrors.mailaddress = "半角英数字で入力してください";
    }else if (!/\S+@\S+\.\S+/.test(formData.mailaddress) || formData.mailaddress.includes(" ")) { // メールアドレスの形式チェック
        newErrors.mailaddress = "メールアドレスを正しくご入力ください";
    }else if(demoMailAddress.includes(formData.mailaddress)){
        newErrors.mailaddress = "このメールアドレスは既に使用されています"
    }
    
    // パスワードのチェック
    if (!formData.password) {
      newErrors.password = "記入してください";
    } else if (formData.password.length < 8) {
      newErrors.password = "パスワードは8文字以上で入力してください";
      newErrors.password_confirmation ="パスワードは8文字以上で入力してください";
    }

    // パスワード確認のチェック
    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "記入してください";
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "パスワードが一致しません";
      newErrors.password = "パスワードが一致しません"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // エラーがなければtrue
  };

  // フォーム送信時
  const handleSubmit = (e) => {
    e.preventDefault();

    // バリデーションを実行
    if (validate()) {
        console.log("フォーム送信");
        alert("登録が完了しました");
    }
  };


  return (
    <div className="p-[16px]">
      <Header backPage backPageLink="/" backPageText="戻る" />
      <form onSubmit={handleSubmit} className="p-[14px] border-b border-subText">
        <p className="text-[18px] font-bold text-center font-semibold">新規アカウント登録</p>
        <InputField
          label="ユーザー名"
          subtext=""
          type="text"
          name="username"
          placeholder="ユーザー名を入力"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />
        <InputField
          label="ユーザーID"
          subtext=""
          type="text"
          name="userId"
          placeholder="ユーザーIDを入力"
          value={formData.userId}
          onChange={handleChange}
          error={errors.userId}
        />
        <InputField
          label="メールアドレス"
          subtext=""
          type="text"
          name="mailaddress"
          placeholder="sample@email.com"
          value={formData.mailaddress}
          onChange={handleChange}
          error={errors.mailaddress}
        />
        <InputField
          label="パスワード"
          subtext="8文字以上の半角英数記号"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <InputField
          label="パスワード(確認用)"
          subtext=""
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


        
        <input
          type="submit"
          value="アカウントを作成"
          className={`bg-border border-none rounded-[40px] w-full p-[10px] text-[15px] ${
            Object.values(formData).every(value =>  value.trim() !== "") && Object.keys(errors).length === 0 ? "bg-main" :
            Object.values(formData).every(value => value.trim() !== "") && Object.keys(errors).length > 0 
            ? "bg-main" : "bg-border"
          }`}
        />
      </form>

      <p className="text-center text-[14px] p-[10px]">
        アカウントをお持ちの方は<span className="text-main underline"><a href="">ログイン</a></span>してください
      </p>
    </div>
  );
}

export default Signup;