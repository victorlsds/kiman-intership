import axios from 'axios';
import NotificationApi from 'components/common/notification-api';

// export const ROOT_URL = window.env.ENV_API_URL;

export function ROOT_URL(){
    return window.env.ENV_API_URL;
}

export function postResource(resource, body, config, newInstance) {
    return getAxiosInstance(newInstance).post(ROOT_URL() + resource, body, config).then(response => {
        return response;
    });
}

export function putResource(resource, body, config, newInstance) {
    return getAxiosInstance(newInstance).put(ROOT_URL() + resource, body, config).then(response => {
        return response;
    });
}

export function getResource(resource, config, newInstance) {
    return getAxiosInstance(newInstance).get(ROOT_URL() + resource, config).then(response => {
        return response;
    });
}

export function deleteResource(resource, config, newInstance) {
    return getAxiosInstance(newInstance).delete(ROOT_URL() + resource, config).then(response => {
        return response;
    });
}

function getAxiosInstance(newInstance) {
    let axiosInstance = axios;
    if (newInstance) {
        axiosInstance = axios.create();
    }
    return axiosInstance;
}

export function removeAllNotifications() {
    NotificationApi.destroy();
}

export function removeAllParams() {
    window.localStorage.clear();
}

export function saveParam(key, param) {
    window.localStorage.setItem(key, param);
}

export function getParam(key) {
    return window.localStorage.getItem(key);
}

export function serializeObjectToParam(obj, first){
    var str = first ? "?" : "";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + obj[key];
    }
    return str;
}

export function getPdfConfig() {
    return {
        responseType: 'blob',
        headers: {
            Accept: "application/pdf" 
        }
    };
}

export function getXlsConfig() {
    return {
        responseType: 'blob',
        headers: {
            Accept: "application/vnd.ms-excel" 
        }
    };
}

export function getXlsxConfig() {
    return {
        responseType: 'blob',
        headers: {
            Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
        }
    };
}

export function getFilename(response){
    var contentDisposition = response.headers["content-disposition"];
    return contentDisposition.substring(contentDisposition.indexOf("filename=")+9, contentDisposition.length);
}

export function downloadfile(data, filename){
    const url = window.URL.createObjectURL(data, data.type);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
}
