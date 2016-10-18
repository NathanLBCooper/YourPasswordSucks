import * as _ from "lodash";

export class AnalysisWork {
    constructor(public passwords: string[],
    public passwordDictionary: string[],
    public ruleSet: string[]) {}
}

interface TypedAnalysisWork<T1,T2,T3> {
    passwords: T1[],
    passwordDictionary: T2[],
    ruleSet: T3[]
}

export function SplitWork(work: AnalysisWork, chunkSize: number): AnalysisWork[] {
    return SplitWorkInner<string,string,string>(work, MakeAnalysisWork, chunkSize);
}

function MakeAnalysisWork(password: string[], passwordDictionary: string[], ruleSet: string[]) {
    return new AnalysisWork(password, passwordDictionary, ruleSet);
}

/** All of the generics in this file are to ensure I don't mix up my string[]'s
*/

function SplitWorkInner<T1,T2,T3>(work: TypedAnalysisWork<T1,T2,T3>, 
    makeWork: (pwd:T1[], pwdDict:T2[], rules:T3[]) => TypedAnalysisWork<T1,T2,T3>,
    chunkSize: number): TypedAnalysisWork<T1,T2,T3>[] {
    const onPassword = SplitOn(work.passwords, [work.passwordDictionary, work.ruleSet], chunkSize);
    let workSplit: TypedAnalysisWork<T1,T2,T3>[] = [];

    // Chunk on password
    for (let onPasswordChunk of onPassword) {
        const onRuleSet = SplitOn(onPasswordChunk[2], [onPasswordChunk[0], onPasswordChunk[1]], chunkSize);

        // Chunks on rules
        for (let onRuleChunk of onRuleSet) {
            const onPasswordDictionarySet = SplitOn(onRuleChunk[2], [onRuleChunk[1], onRuleChunk[0]], chunkSize);

            // Chunk on password dictionary
            for (let onPasswordDictionaryChunk of onPasswordDictionarySet){
                workSplit.push(makeWork(
                    onPasswordDictionaryChunk[1], onPasswordDictionaryChunk[0], onPasswordDictionaryChunk[2]
                ));
            }
        }
    }

    return workSplit;
}

export function SplitOn<T1,T2,T3>(splitters: T1[], otherDimensions: [T2[],T3[]], chunkSize: number): [T1[],T2[],T3[]][] {
    let chunks:  [T1[],T2[],T3[]][] = [];

    const problemSizePerSplitter = otherDimensions[0].length * otherDimensions[1].length;
    const splitterPerIdealChunk = chunkSize / problemSizePerSplitter;
    const splitterPerChunk = splitterPerIdealChunk > 1 ? Math.floor(splitterPerIdealChunk) : 1;

    if (!(splitterPerChunk < splitters.length)){
        // Work is small enough already. Not strictly required, as slice(arr,0,beyond_range) has same effect.
        return [[splitters, otherDimensions[0], otherDimensions[1]]];
    }

    // Split problem into ideal (or undersized) chunks, with an minimum of 1 splitter per chunk.
    for(let i = 0; i < splitters.length; i += splitterPerChunk){
        chunks.push(
            [_.slice(splitters, i, i + splitterPerChunk),otherDimensions[0], otherDimensions[1]]
            );
    }

    return chunks;
} 
