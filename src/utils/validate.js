// 过滤特殊字符
// export暴露函数使得能够被访问

export function stripscript(s) {
    let pattern = new RegExp("[`~!@#$^&*()=|{ }':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
    let rs = "";
    for (let i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

// 验证邮箱

export function validateEmail(s) {
    let regTest = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
    if (!regTest.test(s))
        return true;
    else return false;
}

// 验证密码

export function validatePassword(s) {
    let passTest = /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{5,20}/;
    if (!passTest.test(s))
        return true;
    else return false;
}


// 验证验证码

export function validateCode(s) {
    let codeTest = /^[a-z0-9]{6}$/;
    if (!codeTest.test(s))
        return true;
    else return false;
}
