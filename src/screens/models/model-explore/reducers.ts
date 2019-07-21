import { Reducer } from "redux";
import { RootAction } from "../../../app/store";
import { EXPLORER_FETCH, EXPLORER_SELECT, EXPLORER_VERSIONS, EXPLORER_IO, EXPLORER_VAR_UNIT } from './actions'

export interface FetchedModel {
    uri: string,
    label: string,

    doc?: string,
    desc?: string,
    logo?: string,
    keywords?: string, //FIXME can by an array if slit()
    assumptions?: string,
    versions?: string[],
    categories?: string[],
    screenshots?: string[],
    authors?: string[],
    referenceP?: string,
    contactP?: string,
    publisher?: string,
    type?: string,
    sampleVisualization?: string,
    io?: IODetail[]
}

export interface IODetail {
    uri: string,    //io
    kind: string,   //prop (model:hasInput or mode:hasOutput)
    format?: string,//format
    dim?: string,   //dim
    desc?: string,  //ioDescription
    type: string,   //type (URI)
    label: string,  //ioLabel
    units?: string, //units
    vp?: string,
    sv?: string,
    rl?: string,

    variables: VariableDetail[];
    //this is for the UI... :-(
    active: boolean;
}

export interface VariableDetail {
    uri: string;
    label: string;
    unit?: string;
    desc?: string;
    longName?: string;
    shortName?: string;
    sn?: string;
    rl?: string;
}

export interface VersionDetail {
    config?: ConfigDetail
}

interface ConfigDetail {
    calibration?: any,
}

export type UriModels = Map<string, FetchedModel>;
type UriIO = Map<string, IODetail[]>;
type UriVersion = Map<string, VersionDetail[]>;
type UriVariable = Map<string, VariableDetail[]>;

export interface ExplorerState {
    models: UriModels,
    io: UriIO, 
    version: UriVersion,
    variables: UriVariable,
    selected: string
}

const INITIAL_STATE: ExplorerState = { 
    models: {} as UriModels,
    io: {} as UriIO,
    version: {} as UriVersion,
    variables: {} as UriVariable,
    selected: ''
};

const explorer: Reducer<ExplorerState, RootAction> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EXPLORER_FETCH:
            state.models = action.models;
            break;
        case EXPLORER_SELECT:
            state.selected = action.key;
            break;
        case EXPLORER_VERSIONS:
            state.version[action.uri] = action.details;
            break;
        case EXPLORER_VAR_UNIT:
            state.variables[action.uri] = action.details;
            break;
        case EXPLORER_IO:
            let ios : IODetail[] = [];
            action.details.forEach( io => {
                ios.push( io as IODetail );
            })
            state.io[action.uri] = ios;
            break;
    }
    return {
      ...state
    }
};

export default explorer;
