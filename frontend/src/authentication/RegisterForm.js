import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import { useHttpClient } from "../shared/hooks/http-hook";
import { login } from "../redux/auth-slice";
import { CONTENT_TYPE_JSON, requestConfig, SIGNUP_USER } from "../shared/util/request-config";

import Input from "../shared/FormElements/Input";
import CustomButton from "../shared/components/UIElements/Buttons/CustomButton";
import Card from "../shared/components/UIElements/Card";

import classes from './RegisterForm.module.css';
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";

const RegisterForm = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formState, inputHandler] = useForm(
        {
            firstName: {
                value   : "",
                isValid : false,
            },
            lastName: {
                value   : "",
                isValid : false,
            },
            email: {
                value   : "",
                isValid : false,
            },
            password: {
                value   : "",
                isValid : false,
            },
            /* image : {
                value   : null,
                isValid : false
            } */
        },
        false
    );

    const formSubmmitHandler = (e) => {
        e.preventDefault();

        const payload = {
            firstName : formState.inputs.firstName.value,
            lastName  : formState.inputs.lastName.value,
            email     : formState.inputs.email.value,
            password  : formState.inputs.password.value
        };
        const request = {
            ...SIGNUP_USER,
            ...CONTENT_TYPE_JSON,
            payload
        };
        sendRequest(request).then((response) => {
            console.log(response);
            const payload = {
                token: response.data.token,
                userId: response.data.userId
            }
            dispatch(login(payload));
            navigate('/');
        });
    };

    return (
        <Card className={classes.register}>
            <h1>New here? Sign up!</h1>
            <form id="register-form" onSubmit={formSubmmitHandler}>
                <Input
                    id          ="firstName"
                    label       ="First Name"
                    element     ="input"
                    type        ="text"
                    placeholder ="first name"
                    validators  ={[VALIDATOR_REQUIRE()]}
                    errorText   ="Please type a valid name."
                    onInput={inputHandler}
                />
                <Input
                    id          ="lastName"
                    label       ="Last Name"
                    element     ="input"
                    type        ="text"
                    placeholder ="last name"
                    validators  ={[VALIDATOR_REQUIRE()]}
                    errorText   ="Please type a valid name."
                    onInput={inputHandler}
                />
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
                    errorText   ="Password must be at least 8 characters long."
                    onInput={inputHandler}
                />
                {isLoading ? 
                <LoadingSpinner/>
                :
                <CustomButton
                    type="submit"
                    disabled={!formState.isValid}
                >
                Register
                </CustomButton>}
            </form>
        </Card>
    );
};

export default RegisterForm;