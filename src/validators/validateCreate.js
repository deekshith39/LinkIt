export default function validateCreate(docData) {
    // Category
    if(!docData.category || !docData.title || !docData.link || !docData.description) {
        return "All the fields are mandatory";
    }

    if(docData.title.length < 5) {
        return "The title must be at least 5 characters."
    }

    if(docData.title.description < 10) {
        return "The description must be at least 10 characters."
    }

    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(docData.link)) {
        return "The URL must be valid"
    }

    return "no errors"
}