import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";


export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    //In case the user makes a request and immediately page before the request completes.
    //this prevents the error of trying to update a component that is no
    //longer on the screen
    const activeHttpRequest = useRef([]);

    const sendRequest = useCallback(async (requestConfig) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequest.current.push(httpAbortCtrl);

        let request =  {
                ...requestConfig,
                signal: httpAbortCtrl.signal
            }

        try {
            const response = await axios(request);
            activeHttpRequest.current = activeHttpRequest.current.filter(
                reqCtrl => reqCtrl !== httpAbortCtrl
            );
            setIsLoading(false);
            return response;
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
            setIsLoading(false)
            throw error;
        }
    }, []);

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        //gets executed when the component unmounts
        return () => {
            activeHttpRequest.current.forEach(
                abortCtrl => (abortCtrl.abort())
            );
        };
    }, []);

    return {
        isLoading,
        error,
        sendRequest,
        clearError
    };
};