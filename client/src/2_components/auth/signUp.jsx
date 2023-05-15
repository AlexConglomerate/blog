import React, {useEffect} from 'react';
import FormInput from "../../1_ui/formInput";
import FormButton from "../../1_ui/formButton";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import authService from "../../servises/auth.service";
import localStorageService, {setTokens} from "../../servises/localStorage.service";
import {toast} from "react-toastify";
import {getUserInfo} from "../../store/user";
import {useDispatch} from "react-redux";

function SignUp() {
    const {register, handleSubmit, formState: {errors, isValid}, reset, setValue} = useForm({mode: "onBlur"})
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignUp = async (values) => {
        try {
            const data = await authService.register(values) // Делаем регистрацию в FireBase. Получаем нужные токены.
            localStorageService.setTokens(data) // записываем полученные токены в localStorage
            dispatch(getUserInfo())
            reset() // очистка формы после отправки
            navigate('/blog', {replace: false})
        } catch (error) {
            if (error?.response?.data?.error?.message === 'EMAIL_EXIST') toast.error('Email exist')
        }
    }

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    return (
        <div className={'flex flex-col mx-auto my-9 w-96 border-2 p-7 m-5 rounded-3xl '}>
            <form onSubmit={handleSubmit(handleSignUp)}>
                <FormInput errors={errors} register={register}
                           label={'Name'} keyName={'name'}
                           rules={{
                               required: "Required field",
                           }}
                />

                <FormInput
                    errors={errors} register={register}
                    label={'Email'} keyName={'email'}
                    rules={{
                        required: "Required field",
                        pattern: {value: EMAIL_REGEXP, message: 'Invalid mail address'}
                    }}
                />

                <FormInput
                    errors={errors} register={register} type={'password'}
                    label={'Password'} keyName={'password'}
                    rules={{
                        required: "Required field",
                        minLength: {value: 6, message: 'Minimum length 6 characters'},
                    }}
                />

                <FormButton disabled={!isValid} name={'Create an account'}/>
            </form>


        </div>
    );
}

export default SignUp;