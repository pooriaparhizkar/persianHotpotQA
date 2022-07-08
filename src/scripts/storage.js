// local storage interface
export const authToken = {
    key: 'HOTPOT_AUTH_TOKEN',
    get: function () {
        const data = localStorage.getItem(authToken.key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    },
    set: (value) => {
        localStorage.setItem(authToken.key, JSON.stringify(value));
    },
    remove: () => {
        localStorage.removeItem(authToken.key);
    },
};
