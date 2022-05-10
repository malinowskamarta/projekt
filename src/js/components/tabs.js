import JsTabs from 'js-tabs'
import { createElement } from '../helpers/document.helper';
import { getUserPicture, searchUsers, getCollectionPicture, searchCollections, searchPhotos } from '../services/unsplash';

export function initializeTabs(elm, tabFuncs) { 
    const myTabs = new JsTabs({
        elm
    });

    myTabs.init();

    if (tabFuncs) {
        for (const func of tabFuncs) {
            func();
        }
    }
}

export function initializePhotosTab() {
    const searchInput = document.querySelector('#photos-tab input');
    const colorSelect = document.querySelector('#photos-tab select');
    const selectButton = document.querySelector('#photos-tab button');
    const results = document.querySelector('#photos-tab .photos-tab__results');

    selectButton.addEventListener('click', () => {
        searchPhotos(searchInput.value, colorSelect.value)
        .then((photos) => {
            results.innerHTML = '';

            for (const photo of photos.results) {
                const img = createElement('img', {
                    src: photo.urls.thumb
                });

                results.appendChild(img);
            }
        });
    });
}

export function initializeCollectionsTab() {
    const searchInput = document.querySelector('#collections-tab input');
    const autocompleteResults = document.querySelector('#collections-tab .autocomplete__results');
    const results = document.querySelector('#collections-tab .photos-tab__results');

    let debounceTimeout; 

    searchInput.addEventListener('keyup', () => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        debounceTimeout = setTimeout(() => {
            searchCollections(searchInput.value)
            .then((collections) => {
                autocompleteResults.innerHTML = '';

                for (const collection of collections.results) {
                    const rowDiv = createRow(collection);

                    rowDiv.addEventListener('click', () => {
                        handleAutocompleteSelect(collection.id);
                    });

                    autocompleteResults.appendChild(rowDiv);
                }

                console.log(collections);
            });
        }, 200);
    });

    function handleAutocompleteSelect(collectionId) {
        getCollectionPicture(collectionId)
        .then((pictures) => {
            console.log(pictures);
        });
    }

    function createRow(colection) {
        const rowDiv = createElement('div', {
            class: 'autocomplete__result-row'
        });

        const titleSpan = createElement('span', {
            class: 'autocomplete__result-title'
        });

        titleSpan.innerText = colection.title;

        const img = createElement('img', {
            class: 'autocomplete__result-thumb',
            src: colection.cover_photo.urls.thumb
        });

        rowDiv.appendChild(titleSpan);
        rowDiv.appendChild(img);

        return rowDiv;
    }
}

export function initializeUsersTab() {
    const searchInput = document.querySelector('#users-tab input');
    const autocompleteResults = document.querySelector('#users-tab .autocomplete__results');
    const results = document.querySelector('#users-tab .photos-tab__results');

    let debounceTimeout; 

    searchInput.addEventListener('keyup', () => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        debounceTimeout = setTimeout(() => {
            searchUsers(searchInput.value)
            .then((users) => {
                autocompleteResults.innerHTML = '';

                for (const user of users.results) {
                    const rowDiv = createRow(user);

                    rowDiv.addEventListener('click', () => {
                        handleAutocompleteSelect(user.id);
                    });

                    autocompleteResults.appendChild(rowDiv);
                }

                console.log(users);
            });
        }, 200);
    });

function handleAutocompleteSelect(userId) {
    getUserPicture(userId)
    .then((pictures) => {
        console.log(pictures);
    });
}

function createRow(user) {
    const rowDiv = createElement('div', {
        class: 'autocomplete__result-row'
    });

    const titleSpan = createElement('span', {
        class: 'autocomplete__result-title'
    });

    titleSpan.innerText = user.title;

    const img = createElement('img', {
        class: 'autocomplete__result-thumb',
        src: user.profile_image.urls.thumb
    });

    rowDiv.appendChild(titleSpan);
    rowDiv.appendChild(img);

    return rowDiv;
}
}