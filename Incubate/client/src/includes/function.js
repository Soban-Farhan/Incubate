import * as Cookies from "js-cookie";

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
    Cookies.remove("session");
    Cookies.set("session", session, { expires: 14 });
};
  
export const getSessionCookie = () => {
    const sessionCookie = Cookies.get("session");
  
    if (sessionCookie === undefined) {
      return {};
    } else {
      return JSON.parse(sessionCookie);
    }
};

export const removeSessionCookie = () => {
    Cookies.remove("session");
};

export default postData;