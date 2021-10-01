const validateSignUp = (name, email, password) => {
    //Name Errors
    if (!name) {
        return "A username is required.";
    }

    //Email Errors
    if (!email) {
        return "Your email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        return "Your email is invalid.";
    }

    //Password Errors
    if (!password) {
        return "A password is required.";
    } else if (password.length < 6) {
        return "Your password must be at least 6 characters.";
    }

    return "no errors"
}
 
export default validateSignUp;