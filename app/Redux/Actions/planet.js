

function fetchApiCall (method,bodyData,url,HeaderOptions,successCallback,errorCallback){
    const options = {
        ...HeaderOptions,
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };
    if(method !== 'GET'){
        options.body =JSON.stringify(bodyData);
    }

    return fetch(url, options)
        .then(response => {
            if(response.status == 200) {
                response.json().then(json => {
                    if(json) {
                        successCallback(json);
                    } else {
                        errorCallback({error:'error while fetching post in category '});
                    }
                });
            } else {
                return Promise.reject('something went wrong!')
            }
        }).catch(err => {
            errorCallback(err);
        });
}

export function getPlanetsData(searchUrl,successCallback,errorCallback){
    return(dispatch,state)=>{
        fetchApiCall('GET',{},searchUrl,{},successCallback,errorCallback)
    }
}