import type {
    ComplexDescriptionMeta,
    DeprecationMeta, ErrorMeta,
    NameMeta, PackageMeta, ParameterMeta, SearchableMeta,
    SignatureMeta, SourceMeta, SubroutineReturnMeta, VariableMeta
} from "$lib/types/types";

export interface JsonParametersMeta {
    parameters: JsonNode[]
}

export type ClassMeta = NameMeta & SignatureMeta & JsonParametersMeta & ComplexDescriptionMeta & SearchableMeta & {
    isAbstract: boolean
    classVariables: JsonNode[]
}
export type ModuleMeta = NameMeta & SourceMeta & ComplexDescriptionMeta & SearchableMeta & {
    globalVariables: JsonNode[]
}
export type SubroutineMeta = NameMeta & SignatureMeta & JsonParametersMeta & ComplexDescriptionMeta & SearchableMeta & {
    raises: JsonNode[]
    returns: JsonNode[]
    isGenerator: boolean
    isAsync: boolean
    isAbstract: boolean
    isLambda: boolean
    isContextManager: boolean
}

export type AllJsonMeta = ClassMeta | DeprecationMeta | ErrorMeta | ModuleMeta | PackageMeta | ParameterMeta | SubroutineMeta | SubroutineReturnMeta | VariableMeta

export type JsonNode = {
    component: string,
    meta: AllJsonMeta,
    children: Record<string, JsonNode[]>
}
