import { navigate as navigateVike } from 'vike/client/router';

export function navigateSearch(pathName, search = {}, resetAll = true) {
    let searchParams = new URLSearchParams(window.location.search);
    if (resetAll) {
        searchParams.forEach((_, key) => {
            searchParams.delete(key);
        });
        searchParams = new URLSearchParams();
    }
    Object.keys(search).forEach(key => {
        if (search[key] == null) {
            if (key in search) {
                searchParams.delete(key);
            }
            delete search[key];
        } else {
            searchParams.set(key, search[key])
        }
    });
    let searchString = searchParams.toString();
    console.log("searchString", searchString);
    var newRelativePathQuery = (pathName ? pathName : window.location.pathname) + (searchString === '' ? '' : '?' + searchString);
    navigateVike(newRelativePathQuery);
}
