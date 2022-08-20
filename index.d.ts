declare type Data = Record<string, any>;
declare type TypeConstructor = StringConstructor | NumberConstructor | BooleanConstructor | ArrayConstructor | ObjectConstructor;
interface Validator {
    [propName: string]: TypeConstructor;
}
declare type resultType = Data | Data[];
declare class Transform {
    private readonly result;
    private readonly dataInterface;
    private readonly rawData;
    private readonly defaultData;
    constructor(dataInterface: Validator, rawData: resultType, defaultData?: Data);
    validator(rawData: Data, result: Data): void;
    arrayValidator(): void;
    getData(): resultType;
}

export { Transform as default };
