import { useForm } from "../shared/hooks/form-hook";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../shared/util/validators";

import CustomButton from "../shared/components/UIElements/Buttons/CustomButton";
import Card from "../shared/components/UIElements/Card";
import Input from "../shared/FormElements/Input";

const NewItem = () => {

    const [formState, inputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            briefDesc: {
                value: "",
                isValid: false,
            },
            price: {
                value: 0.00,
                isValid: false,
            },
            discount: {
                value: 0,
                isValid: false,
            },
            stock: {
                value: 0,
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
        },
            false
        );

    const formSubmmitHandler = (e) => {
        e.preventDefault();
        console.log(formState);
    };

    return(
        <Card>
            <form className="form-start" id="new-item-form" onSubmit={formSubmmitHandler}>
                <Input
                    id          ="title"
                    label       ="Title"
                    element     ="input"
                    type        ="text"
                    placeholder ="product title"
                    validators  ={[VALIDATOR_REQUIRE()]}
                    errorText   ="Please type a valid title."
                    onInput={inputHandler}
                />
                <Input
                    id          ="briefDesc"
                    label       ="Brief Description:"
                    element     ="input"
                    type        ="text"
                    placeholder ="a brief description"
                    validators  ={[VALIDATOR_MINLENGTH(100)]}
                    errorText   ="Please type a valid description."
                    onInput={inputHandler}
                />
                <Input
                    id          ="price"
                    label       ="Price"
                    element     ="input"
                    type        ="number"
                    placeholder ="$"
                    validators  ={[VALIDATOR_REQUIRE()]}
                    errorText   ="Please type a valid price."
                    onInput={inputHandler}
                />
                <Input
                    id          ="discount"
                    label       ="Discount"
                    element     ="input"
                    type        ="number"
                    placeholder ="0.0 - 1.0"
                    validators  ={[VALIDATOR_REQUIRE()]}
                    errorText   ="Please type a valid discount."
                    onInput={inputHandler}
                />
                <Input
                    id          ="stock"
                    label       ="Stock"
                    element     ="input"
                    type        ="number"
                    validators  ={[VALIDATOR_REQUIRE()]}
                    errorText   ="Please type a valid stock."
                    onInput={inputHandler}
                />
                <Input
                    id          ="description"
                    label       ="Description"
                    element     ="input"
                    type        ="text"
                    placeholder ="full description"
                    validators  ={[VALIDATOR_REQUIRE()]}
                    errorText   ="Please type a valid description."
                    onInput={inputHandler}
                />
                <CustomButton 
                    type="submit"
                    form="new-item-form"
                    disabled={!formState.isValid}
                >
                Submit!
                </CustomButton>
            </form>
        </Card>
    );
};

export default NewItem;