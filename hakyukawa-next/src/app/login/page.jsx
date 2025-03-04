import React  from "react";
import styles from "@/styles/componentStyles/login/Login.css";

function InputField (props) {
    return(
        <div className="form">
            <label>{props.label}</label>
            <input type={props.type} name= {props.name}  className="textbox" placeholder={props.placeholder}></input>
        </div>
    );
}


function Login () {
    return(
        <div className= "loginwrap">
            <h2 id="title">ログイン</h2>
            <form action="POST">
                <div id="loginform">
                    <InputField label = "ユーザーID" type = "text" name = "userId" placeholder = "ユーザIDを入力"/>
                    <InputField label = "パスワード" type = "password" name = "password" placeholder = "" />
                    <small id="forgetpassword">パスワードをお忘れの方</small>
                </div>
                <input type="submit" value="ログイン" id="login"></input>
            </form>
            <small id="signUp">アカウントをお持ちでない方は登録</small>
        </div>
    );
}

export default Login;