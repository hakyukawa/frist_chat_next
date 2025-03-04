import React  from "react";

function InputField (props) {
    return(
        <div>
            <label>{props.label}</label>
            <input type={props.type} name= {props.name}  className="textbox" placeholder={props.placeholder}></input>
        </div>
    );
}


function Login () {
    return(
        <div>
            <h2 className="text-center">ログイン</h2>
            <form action="POST">
                <div id="loginform">
                    <InputField label = "ユーザーID" type = "text" name = "userId" placeholder = "ユーザIDを入力"/>
                    <InputField label = "パスワード" type = "password" name = "password" placeholder = "" />
                    <small>パスワードをお忘れの方</small>
                </div>
                <input type="submit" value="ログイン"></input>
            </form>
            <small>アカウントをお持ちでない方は登録</small>
        </div>
    );
}

