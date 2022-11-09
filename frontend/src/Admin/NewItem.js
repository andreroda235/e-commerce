import { useForm } from "../shared/hooks/form-hook";
import { VALIDATOR_MAXLENGTH, VALIDATOR_REQUIRE } from "../shared/util/validators";
import { AUTHORIZATION_BEARER, CONTENT_TYPE_JSON, CREATE_ITEM } from "../shared/util/request-config";
import { useHttpClient } from "../shared/hooks/http-hook";

import CustomButton from "../shared/components/UIElements/Buttons/CustomButton";
import Card from "../shared/components/UIElements/Card";
import Input from "../shared/FormElements/Input";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";

import classes from './NewItem.module.css';
import { useSelector } from "react-redux";

const NewItem = () => {

    const auth = useSelector(state => state.auth);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
            category: {
                value: "",
                isValid: false,
            },
            subCategory: {
                value: "",
                isValid: false,
            },
        
        },
            false
        );

    const formSubmmitHandler = (e) => {
        e.preventDefault();

        const data = JSON.stringify({
            title       : formState.inputs.title.value,
            briefDesc   : formState.inputs.briefDesc.value,
            price       : formState.inputs.price.value,
            discount    : formState.inputs.discount.value,
            stock       : formState.inputs.stock.value,
            description : formState.inputs.description.value,
            category    : formState.inputs.category.value,
            subCategory : formState.inputs.subCategory.value,
        });
        const request = {
            ...CREATE_ITEM,
            headers: {
                ...CONTENT_TYPE_JSON,
                ...AUTHORIZATION_BEARER(auth.token)
            },
            data
        };
        sendRequest(request).then((response) => {
            console.log(response.data.item);
        });
    };

    return(
        <Card className={classes['new-item']}>
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
                    validators  ={[VALIDATOR_MAXLENGTH(100), VALIDATOR_REQUIRE()]}
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
                    type        ="text"
                    rows        ={10}
                    placeholder ="full description"
                    validators  ={[VALIDATOR_REQUIRE()]}
                    errorText   ="Please type a valid description."
                    onInput={inputHandler}
                />
                <Input
                    id          ="category"
                    label       ="Category"
                    element     ="input"
                    type        ="text"
                    placeholder ="category"
                    validators  ={[VALIDATOR_REQUIRE()]}
                    errorText   ="Please type a valid category."
                    onInput={inputHandler}
                />
                <Input
                    id          ="subCategory"
                    label       ="Sub-Category"
                    element     ="input"
                    type        ="text"
                    placeholder ="sub-category"
                    validators  ={[VALIDATOR_REQUIRE()]}
                    errorText   ="Please type a valid sub-category."
                    onInput={inputHandler}
                />
                {isLoading ? 
                <LoadingSpinner/>
                :
                <CustomButton
                    type="submit"
                    form="new-item-form"
                    disabled={!formState.isValid}
                >
                Login
                </CustomButton>}
            </form>
        </Card>
    );
};

export default NewItem;