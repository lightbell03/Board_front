import axios from 'axios';

export const serverAxios = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    timeout: 18000000
});

export const GetAxios = async ({url, param}) => {
    try {
        const res = await serverAxios({
            method: 'get',
            url: url,
            params: param
        });
        return res.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }

}

export const PostAxios = async ({url, param, data}) => {
    try {
        const res = await serverAxios({
            url: url,
            method: 'post',
            params: param,
            data: data
        });
        if(res.data === "duplicate member"){
            throw 'duplicate member';
        }
        return res.data;
    }
    catch (error) {
        console.log(error);
        if(error.response.status === 500){
            window.location.href="http://localhost:3000/bad";
        }
        else{
            throw error.response.status;
        }
    }
}

export const PutAxios = async ({url, param, data}) => {
    try {
        const res = await serverAxios({
            url: url,
            method: 'put',
            params: param,
            data: data
        });
        return res.data;
    }
    catch(error){
        throw error;
    }
}

export const DeleteAxios = async ({url}) => {
    try {
        await serverAxios({
            url: url,
            method: 'delete'
        });
    }
    catch(error) {
        throw error;
    }
}