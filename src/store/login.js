
import { Login } from "@/api/login"

const login = {
    state: {
    },
    mutation: {
    },
    actions: {
        login(content, requestData) {
            return new Promise((resolve, reject) => {
                Login(requestData).then((response) => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    },
    modules: {
    }
}
export default login;