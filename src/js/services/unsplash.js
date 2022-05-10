import { settings } from '../../config/settings';

export function searchPhotos (query, color) {
    let queryString = `?client_id=${settings.clientId}&query=${query}&per_page=${settings.perPage}`;

    if (color) {
        queryString += `&color=${color}`
    }

    return fetch(`${settings.baseApiUrl}search/photos${queryString}`)
        .then((rsp) => rsp.json());
}

export function searchCollections(query) {
    let queryString = `?client_id=${settings.clientId}&query=${query}&per_page=${settings.perPage}`;
    
    return fetch(`${settings.baseApiUrl}search/collections${queryString}`)
        .then((rsp) => rsp.json());
}

export function getCollectionPicture(collectionId) {
    let queryString = `?client_id=${settings.clientId}`;

    return fetch(`${settings.baseApiUrl}collections/${collectionId}/photos${queryString}`)
        .then((rsp) => rsp.json());
}

export function searchUsers(query) {
    let queryString = `?client_id=${settings.clientId}&query=${query}&per_page=${settings.perPage}`;
    
    return fetch(`${settings.baseApiUrl}search/users${queryString}`)
        .then((rsp) => rsp.json());
}

export function getUserPicture(userId) {
    let queryString = `?client_id=${settings.clientId}`;

    return fetch(`${settings.baseApiUrl}username/${userId}/photos${queryString}`)
        .then((rsp) => rsp.json());
}