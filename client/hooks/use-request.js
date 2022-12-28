import axios from "axios";
import { useState } from "react";


const UseRequest = (url, method, body) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try{
        const response = await axios[method](url, body)
        return response.data;
    }catch (err) {
        setErrors(
            // TODO: fill here
        )
    }  
    }

    return {doRequest, errors};
}

export default UseRequest;