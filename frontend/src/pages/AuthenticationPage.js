import Page from "../shared/components/UIElements/Page";
import Grid from "../shared/components/List/Grid";
import LoginForm from "../authentication/LoginForm";
import RegisterForm from "../authentication/RegisterForm";

import classes from './AuthenticationPage.module.css';

const AuthenticationPage = () => {
    return (
        <Page>
            <Grid gridClass={classes.grid}>
                <LoginForm/>
                <RegisterForm/>
            </Grid>
        </Page>
    );
};

export default AuthenticationPage;