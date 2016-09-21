/** Duplicate every character */
export class DuplicateAllCharsRule {
        public transform(text: string): string {
        const textArr = text.split("");

        let duplicatesArr: string[] = [];
        for (let i = 0; i < textArr.length; i++) {
            duplicatesArr.push(text[i]);
            duplicatesArr.push(text[i]);
        }
        
        return duplicatesArr.join("");
    }

    public toString(): string {
        return "Duplicate every character";
    }
}