export const placaFormater = (element: string) => {
    let input = element.toUpperCase();
    input = input.replace(/[^A-Z0-9]/g, '');
    if (input.length > 7) {
        input = input.slice(0, 7);
    }
    return input;
};