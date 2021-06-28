import axios, {AxiosResponse} from 'axios';

export const postRequest = <S> (
    data: S,
    handling: (response: AxiosResponse) => void,
    errorHandling: (reason: unknown) => void,
    url: string
) => {
    axios
        .post(url, data)
        .then(response => {
            handling(response)
        })
        .catch(reason => {
            errorHandling(reason)
        })
};

export const getRequest = async (
    handling: (response: AxiosResponse) => void,
    errorHandling: (reason: unknown) => void,
    url: string
) => {
    axios
        .get(url)
        .then(response => {
            handling(response)
        })
        .catch(reason => {
            errorHandling(reason)
        })
};