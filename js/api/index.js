const BASE_URL = "http://localhost:3000/api";

const request = async(url, option) => {
    try{
        const res = await fetch(url, option);
        if(!res.ok) throw new Error('에러가 발생했습니다.');
        else return res.json();
    }catch(error){
        console.log(error)
    }
}

const requestWithoutJson = async(url, option) => {
    try{
        const res = await fetch(url, option);
        if(!res.ok) throw new Error('에러가 발생했습니다.');
        else return res;
    }catch(error){
        console.log(error);
    }
}

const HTTP_METHOD = {
    POST(bodyData){
        return {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        }
    },
   
    PUT(bodyData){
        return {
            method: 'PUT',
            headers: {
            "Content-Type": "application/json"
            },
            body: bodyData ? JSON.stringify(bodyData) : null
        }
    },

    DELETE(){
        return {
            method: 'DELETE',
            headers: {
            "Content-Type": "application/json"
            }
        }
    }
}

const API = {
    addMenu(category, value) {
        return request(
            `${BASE_URL}/category/${category}/menu`, 
            HTTP_METHOD.POST({name: value})
        );
    },

    getMenu(category) {
        return request(
            `${BASE_URL}/category/${category}/menu` 
        );
    },

    updateMenu(category, menuId, value) {
        return request(
            `${BASE_URL}/category/${category}/menu/${menuId}`, 
            HTTP_METHOD.PUT({name: value})
        );
    },

    completeMenu(category, menuId) {
        return request(`
            ${BASE_URL}/category/${category}/menu/${menuId}/soldout`, 
            HTTP_METHOD.PUT()
        );
    },

    deleteMenu(category, menuId) {
        return requestWithoutJson(`
            ${BASE_URL}/category/${category}/menu/${menuId}`, 
            HTTP_METHOD.DELETE()
        );
    }
}

export default API;