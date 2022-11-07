import { useNavigate } from "react-router-dom";

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth-slice";
import { useHttpClient } from "../shared/hooks/http-hook";
import { CONTENT_TYPE_JSON, LOGIN_USER } from "../shared/util/request-config";

import Input from "../shared/FormElements/Input";
import CustomButton from "../shared/components/UIElements/Buttons/CustomButton";
import Card from "../shared/components/UIElements/Card";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";

import classes from "./LoginForm.module.css";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler] = useForm(
    {
        email: {
            value: "",
            isValid: false,
        },
        password: {
            value: "",
            isValid: false,
        },
        },
        false
    );

    const formSubmmitHandler = (e) => {
        e.preventDefault();

        const data = JSON.stringify({
            email    : formState.inputs.email.value,
            password : formState.inputs.password.value
        });
        const request = {
            ...LOGIN_USER,
            headers: CONTENT_TYPE_JSON,
            data
        };
        sendRequest(request).then((response) => {
            const payload = {
                token  : response.data.token,
                userId : response.data.userId
            }
            dispatch(login(payload));
            navigate('/');
        });

    };

    return (
        <Card className={classes.login}>
            <h1>Login to your account!</h1>
            <form className="form-start" id="login-form" onSubmit={formSubmmitHandler}>
                <Input
                    id          ="email"
                    label       ="Email"
                    element     ="input"
                    type        ="text"
                    placeholder ="example@mail.com"
                    validators  ={[VALIDATOR_EMAIL()]}
                    errorText   ="Please type a valid email."
                    onInput={inputHandler}
                />
                <Input
                    id          ="password"
                    label       ="Password"
                    element     ="input"
                    type        ="password"
                    placeholder ="password"
                    validators  ={[VALIDATOR_MINLENGTH(8)]}
                    errorText   ="Please type a valid password."
                    onInput={inputHandler}
                />
                <Input
                    id          ="rememberme"
                    label       ="Remember me"
                    element     ="input"
                    type        ="checkbox"
                    validators  ={[]}
                    onInput={inputHandler}
                />
                {isLoading ? 
                <LoadingSpinner/>
                :
                <CustomButton
                    type="submit"
                    form="login-form"
                    disabled={!formState.isValid}
                >
                Login
                </CustomButton>}
            </form>
        </Card>
    );
};

export default LoginForm;

