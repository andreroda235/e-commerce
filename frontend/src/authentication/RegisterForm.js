import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../shared/util/validators";
import { useForm } from "../shared/hooks/form-hook";

import Input from "../shared/FormElements/Input";
import CustomButton from "../shared/components/UIElements/Buttons/CustomButton";
import Card from "../shared/components/UIElements/Card";

import classes from './RegisterForm.module.css';

const RegisterForm = () => {

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
            address: {
                value   : "",
                isValid : false
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
        localStorage.setItem('isLoggedIn', true);
        console.log('registered!');
        console.log(formState);
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
                {/*maybe add a google addressd thing here*/}
                <Input
                    id          ="address"
                    label       ="Address"
                    element     ="input"
                    type        ="text"
                    placeholder ="street, street code, postal code, city"
                    validators  ={[VALIDATOR_REQUIRE()]}
                    errorText   ="Please type a valid address."
                    onInput={inputHandler}
                />
                <CustomButton
                    type="submit"
                    disabled={!formState.isValid}
                >
                Register
                </CustomButton>
            </form>
        </Card>
    );
};

export default RegisterForm;