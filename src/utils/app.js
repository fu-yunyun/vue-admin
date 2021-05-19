import cookie from "js-cookie"

const cookie_Admin_token = "Admin_token";
const cookie_username = "username";

export function getToKen() {
    return cookie.get(cookie_Admin_token);
}
export function setToKen(Admin_token) {
    cookie.set(cookie_Admin_token, Admin_token);
}
export function removeToKen() {
    cookie.remove(cookie_Admin_token);
}
export function setUserName(username) {
    cookie.set(cookie_username, username);
}
export function getUserName() {
    return cookie.get(cookie_username);
}
export function removeUserName() {
    cookie.remove(cookie_username)
}