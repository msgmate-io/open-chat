import { navigate as navigateVike } from 'vike/client/router';

export function navigateSearch(search, resetAll = true, pathName = null) {
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
    var newRelativePathQuery = (pathName ? pathName : window.location.pathname) + '?' + searchParams.toString();
    navigateVike(newRelativePathQuery);
}
