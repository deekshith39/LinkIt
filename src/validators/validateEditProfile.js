const validateEditProfile = (name, email, newPassword) => {
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

    if (newPassword) {
        if (newPassword.length < 6) {
            return "Your password must be at least 6 characters.";
        }
    }

    return "no errors"
}

export default validateEditProfile;