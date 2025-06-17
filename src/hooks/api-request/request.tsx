import { useState } from "react";
import useReactQuery from ".";
import { toggleNProgress } from "@/utils/helper-support";
import { ErrorToast } from "@/utils/toast-notification";
import ApiResponseType from "@/type/api-response-type";

const useApiRequest = (setError?: any) => {

    const { postQuery, getQueryInstance} = useReactQuery();

    const [requestErrors, setRequestErrors] = useState<any>(null);
    const [requestLoading, setRequestLoading] = useState<boolean>(false);
    const [isErrorRequest, setIsErrorRequest] = useState<boolean>(false);
    const [isSuccessRequest, setIsSuccessRequest] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string|null>(null);

    const [getData, setGetData] = useState<ApiResponseType|null|any>(null);

    const Get = async (endpoint?: string | null) => {
        if (!endpoint) return;
        try {
            setRequestLoading(true);
            toggleNProgress(true);
            setIsErrorRequest(false);
            setIsSuccessRequest(false);
            setErrorMessage(null);

            const { data } = await getQueryInstance(endpoint);

            if (data) {
                if (data.status !== '200') {
                    ErrorToast(data.message);
                    setIsErrorRequest(true);
                }
                if (data.status === '200') {
                    setIsSuccessRequest(true);
                }
                setGetData(data?.data);
            }
        } catch (error: any) {
            ErrorToast("Something went wrong!");
            setIsErrorRequest(true);
            setErrorMessage(error?.message || "Unknown error");
        } finally {
            toggleNProgress(false);
            setRequestLoading(false);
        }
    }

    const ReturnGet = async (endpoint?: string|null) => { // staleTime removed
        if (!endpoint) return;
        toggleNProgress(true);
        const {data, status, message} = await getQueryInstance(endpoint);
        toggleNProgress(false);
        if (status !== '200') {
            ErrorToast(message)
            return null
        }
        //status == '200' && setIsSuccessRequest(true)
        return data
    }


    const Post = async ({
        endpoint,
        payload,
        refreshEndpoint,
    }: { endpoint: string; payload?: any; refreshEndpoint?: string|string[] }) => {
        try {
            setRequestLoading(true);
            setRequestErrors(null);
            toggleNProgress(true);
            setIsErrorRequest(false)
            setErrorMessage(null)
            setIsSuccessRequest(false)
            
            // Wait for mutation to resolve
            const response = await postQuery.mutateAsync({ endpoint, payload, refreshEndpoint });

            toggleNProgress(false);
            setRequestLoading(false);

            if (!response) {
                return false;
            }

            if (Number(response.status) === 200) {
                setIsSuccessRequest(true);
                return response.data;
            }

            ErrorToast(response.message || "An error occurred");

            setIsErrorRequest(true)

            setErrorMessage(response.message)

            if (response.status === "payloadValidationError" && response.data) {
                setRequestErrors(response.data);
                
                if (setError) {
                    Object.entries(response.data).forEach(([field, messages]) => {
                        setError(field as any, { type: "manual", message: (messages as string[]).join(", ") });
                    });
                }

                return false;
            }
        } catch { // error removed
            ErrorToast("Something went wrong!");
            return false;
        } finally {
            toggleNProgress(false);
            setRequestLoading(false);
        }
    };


    return {
        Get,
        Post,
        ReturnGet,
        requestLoading,
        requestErrors,
        errorMessage,

        //get
        getData,
        isErrorRequest,
        isSuccessRequest,
    }
}

export default useApiRequest