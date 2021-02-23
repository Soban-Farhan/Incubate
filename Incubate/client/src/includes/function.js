const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export const setSessionCookie = (session) => {
    window.sessionStorage.removeItem('session');
    window.sessionStorage.setItem('session', session);
};
  
export const getSessionCookie = () => {
    const sessionCookie = window.sessionStorage.getItem('session');

    if (sessionCookie === undefined) {
      return null;
    } else {
      return JSON.parse(sessionCookie);
    }
};

export const removeSessionCookie = () => {
    window.sessionStorage.removeItem('session');
};

export default postData;