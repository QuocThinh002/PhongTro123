

function convertVietnameseSlug(inputString) {
    return inputString
        .normalize('NFD')      // Decompose diacritics (e.g., ă -> a)
        .replace(/[\u0300-\u036f]/g, "") // Remove all diacritics
        .toLowerCase()           // Convert to lowercase
        .trim()                 // Remove leading and trailing spaces
        .replace(/\s+/g, '-')    // Replace multiple spaces with a single hyphen
        .replace(/-+/g, '-');    // Replace multiple hyphens with a single hyphen
}

export default convertVietnameseSlug;