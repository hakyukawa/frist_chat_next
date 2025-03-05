import React from "react";
import Header from "@/components/common/Header";

function InputField (props)  {
    return(
        <div className="p-10px">
            <label>{props.label}</label>
            <p>{props.subtext}</p>
            <input type={props.type} name= {props.name}   placeholder={props.placeholder} className="border border-main w-full "></input>
        </div>
    );
}

function Signup () {

    return(
        <div className="p-4"> 
            <Header backPage backPageLink="/" backPageText="戻る"/> 
            <form method="POST" className="p-[30px]">
                <p className="text-8xl">新規アカウント登録</p>
                <InputField label = "ユーザー名" subtext = "" type = "text" name = "username" placeholder = "ユーザー名を入力" className = "" />
                <InputField label = "ユーザーID" subtext = "" type = "text" name = "userId" placeholder = "ユーザーIDを入力" />
                <InputField label = "メールアドレス" subtext = "" type ="email" name = "mailaddress" placeholder = "sample@email.com" />
                <InputField lebel = "パスワード" subtext="8文字以上の半角英数記号" type = "password" name = "password" placeholder = "" />
                <InputField label = "パスワード(確認用)" subtext="" type ="password" name = "password_confirmation" placeholder ="" />
                <p><span><a href="">利用規約・プライバシーポリシー</a></span>に同意の上</p>
                <input type="submit" value="アカウント作成" className="bg-main border-none rounded-lg w-full"></input>
            </form>
            <p>アカウントをお持ちの方は<span><a href="">ログイン</a></span>してください</p>
        </div>
    );
}


export default Signup;