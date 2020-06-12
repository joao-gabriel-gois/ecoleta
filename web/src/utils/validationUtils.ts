interface ValidationError {
    validation: {
        keys: string[],
    },
    message: string
}

export function filteringValidationArray(fieldName: string, validationErrors: ValidationError) {
    return validationErrors.validation.keys.filter(field => field === fieldName)[0];
}

export function getCurrentValidationMessage(fieldName: string, message: string, validationErrors: ValidationError) {
    const messageArray = message.split('. ');
    const currentIndex = validationErrors.validation.keys.indexOf(fieldName);

    return messageArray[currentIndex];
}
