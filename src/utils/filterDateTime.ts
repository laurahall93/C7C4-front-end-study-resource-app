export function filterDateTime(dateTime: string): string {
    const stringWithoutT = dateTime.replace("T", " ");
    return stringWithoutT.slice(0, 16);
}
