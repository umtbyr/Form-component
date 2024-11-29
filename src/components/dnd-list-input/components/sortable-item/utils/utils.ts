import { ParamType } from "../../../../../features";

export const replaceSquareBrackets = (
    text: string = "",
    params: ParamType[] = []
) => {
    let index = 0;
    const result = text.replace(/\[\]/g, () => {
        return params[index++]?.param.toString() ?? "[]";
    });
    return result;
};
