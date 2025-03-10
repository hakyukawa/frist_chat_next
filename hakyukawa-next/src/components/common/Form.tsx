import { Inter } from "next/font/google";
import React from "react";
import InputForm from "./option/InputForm";
import Status from "./option/Status";
import SubmitButton from "./option/SubmitButton";

interface FormProps { 
    nowState?: string;
    buttonValue?: string;
    label?: string;
    subText?: string;
    inputType?:string;
    inputName?: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData?:string;  
    status?: boolean;
    form?: boolean;
    submitButton?: boolean;
}




function Setting (props:FormProps) {
    return(
            <div>
                    {props.status && props.nowState && <Status nowState={props.nowState} />}
                    {props.form && <InputForm label={props.label} subText= {props.subText} inputName={props.inputName} formData={props.formData} error={props.error} onChange={props.onChange}/>}
                    {props.submitButton && <SubmitButton formData={props.formData} error={props.error} buttonValue={props.buttonValue}/>}
            </div>
    );
}

export default Setting;