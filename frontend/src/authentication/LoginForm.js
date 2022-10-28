import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth-slice";

import Input from "../shared/FormElements/Input";
import CustomButton from "../shared/components/UIElements/Buttons/CustomButton";
import Card from "../shared/components/UIElements/Card";

import classes from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        dispatch(login());
        navigate('/');

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
                <CustomButton
                    type="submit"
                    form="login-form"
                    disabled={!formState.isValid}
                >
                Login
                </CustomButton>
            </form>
        </Card>
    );
};

export default LoginForm;

