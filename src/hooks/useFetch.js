import { useEffect, useState } from "react";

export function useFetch(url=""){
    const [loadings, setLoadings] = useState(true);
    const [datas, setDatas] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        async function fetchTodos(){
            try {
                const response = await fetch(url);
                if(!response.ok){
                   throw new Error(`Impossible to fetch todos: ${response.status} `);
                }
                if(!ignore){
                    const todos = await response.json();
                    setLoadings(false);
                    setDatas(todos);
                }
            } catch (error) {
                setLoadings(false);
                setErrors(error.message);
            }
        }
        let ignore = false;
        if(!url) return;
        setLoadings(true);
        setErrors(null);
        fetchTodos();
        return () => ignore = true;
    },[url]);

    return {loadings, datas, errors};

}