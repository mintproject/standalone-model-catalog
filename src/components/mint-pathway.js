var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, html, property, css } from "lit-element";
import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../store";
import { SharedStyles } from "./shared-styles";
import "./mint-variables";
import "./mint-models";
import "./mint-datasets";
import "./mint-parameters";
import "./mint-runs";
import "./mint-results";
import "./mint-visualize";
import { getPathwayVariablesStatus, TASK_NOT_STARTED, getPathwayModelsStatus, getPathwayDatasetsStatus, getPathwayRunsStatus, getPathwayResultsStatus, TASK_DONE, TASK_PARTLY_DONE, getUISelectedSubgoal, getPathwayParametersStatus } from "../util/state_functions";
import { MintPathwayPage } from "./mint-pathway-page";
let MintPathway = class MintPathway extends connect(store)(MintPathwayPage) {
    constructor() {
        super(...arguments);
        this._currentMode = "";
    }
    static get styles() {
        return [
            SharedStyles,
            css `
          
          .arrowbox {
            padding: 0;
            margin: 0;
            padding-left: 13px;
            padding-right: 5.5px;
            display: inline-block;
            position: relative;
            height: 26px;
          }
          .arrowbox:before {
            content: "";
            border-left: 13px solid rgba(0, 0, 0, 0);
            border-top: 14px solid transparent;
            border-bottom: 13px solid transparent;
            border-right: 0;
            position: absolute;
            left: 0px;
          }
          .arrowbox:after {
            content: "";
            border-left: 14px solid transparent;
            border-top: 14px solid rgba(0, 0, 0, 0);
            border-bottom: 14px solid rgba(0, 0, 0, 0);
            border-right: 0;
            position: absolute;
            right: 0px;
            top: 0;
          }
          
          .arrowbox li {
            border: 1px solid #FFFFFF;
            list-style-type: none;
            display: inline-block;
            margin-right: 13px;
            height: 26px;
            line-height: 26px;
            width: 90px;
            background: #f0f0f0;
            font-size: 13px;
            font-weight: bold;
            text-align: center;
            position: relative;
            color: #232323;
            cursor: pointer;
          }
          .arrowbox li::before {
            content: "";
            border-left: 13px solid transparent;
            border-top: 13px solid #f0f0f0;
            border-bottom: 13px solid #f0f0f0;
            border-right: 0;
            position: absolute;
            left: -13px;
          }
          .arrowbox li::after {
            content: "";
            border-left: 13px solid #f0f0f0;
            border-top: 13px solid transparent;
            border-bottom: 13px solid transparent;
            border-right: 0;
            position: absolute;
            right: -13px;
          }

          .arrowbox li:hover {
            background: #e0e0e0;
          }
          .arrowbox li:hover::before {
            border-left-color: transparent;
            border-top-color: #e0e0e0;
            border-bottom-color: #e0e0e0;
          }
          .arrowbox li:hover::after {
            border-left-color: #e0e0e0;
            border-top-color: transparent;
            border-bottom-color: transparent;
          }
          
          .arrowbox li.active {
            background: #0f7acf;
            color: white;
          }
          .arrowbox li.active::before {
            border-left-color: transparent;
            border-top-color: #0f7acf;
            border-bottom-color: #0f7acf;
          }
          .arrowbox li.active::after {
            border-left-color: #0f7acf;
            border-top-color: transparent;
            border-bottom-color: transparent;
          }

          .arrowbox li.done {
            background: #06436c;
            color: white;
          }
          .arrowbox li.done::before {
            border-left-color: transparent;
            border-top-color: #06436c;
            border-bottom-color: #06436c;
          }
          .arrowbox li.done::after {
            border-left-color: #06436c;
            border-top-color: transparent;
            border-bottom-color: transparent;
          }
          .arrowbox li.done:hover {
            background: #06436c;
          }
          .arrowbox li.done:hover::before {
            border-left-color: transparent;
            border-top-color: #06436c;
            border-bottom-color: #06436c;
          }
          .arrowbox li.done:hover::after {
            border-left-color: #06436c;
            border-top-color: transparent;
            border-bottom-color: transparent;
          }

          .arrowbox li.done.active {
            background: #0f7acf;
            color: white;
          }
          .arrowbox li.done.active::before {
            border-left-color: transparent;
            border-top-color: #0f7acf;
            border-bottom-color: #0f7acf;
          }
          .arrowbox li.done.active::after {
            border-left-color: #0f7acf;
            border-top-color: transparent;
            border-bottom-color: transparent;
          }

        /*
          .arrowbox li.partially_done {
            background: #c0daf1;
          }
          .arrowbox li.partially_done::before {
            border-left-color: transparent;
            border-top-color: #c0daf1;
            border-bottom-color: #c0daf1;
          }
          .arrowbox li.partially_done::after {
            border-left-color: #c0daf1;
            border-top-color: transparent;
            border-bottom-color: transparent;
          }
        */

          li {
            color: white;
            font-weight: 100;
          }
          
          @media (max-width: 768px) {
            .arrowbox li {
              font-size: 12px;
              width: 70px;
            }
          }
          @media (max-width: 480px) {
            .arrowbox li {
              font-size: 9px;
              width: 49px;
            }
          }

          .card {
            margin: 0px;
            padding: 10px;
            margin-top: 10px;
            margin-bottom: 10px;
            border: 1px solid #F0F0F0;
            left: 0px;
            right: 0px;
            height: calc(100% - 60px);
            overflow: auto;
            background: #FFFFFF;
        }
        `
        ];
    }
    _renderProgressBar() {
        return html `
            <ul class="arrowbox">
                <li id="variables_breadcrumb" 
                    class="${this._getBreadcrumbClass('variables')}" 
                    @click="${() => { this._selectMode('variables'); }}">Variables</li>
                <li id="models_breadcrumb" 
                    class="${this._getBreadcrumbClass('models')}" 
                    @click="${() => { this._selectMode('models'); }}">Models</li>
                <li id="datasets_breadcrumb" 
                    class="${this._getBreadcrumbClass('datasets')}" 
                    @click="${() => { this._selectMode('datasets'); }}">Datasets</li>
                <li id="parameters_breadcrumb" 
                    class="${this._getBreadcrumbClass('parameters')}" 
                    @click="${() => { this._selectMode('parameters'); }}">Setup</li>
                <li id="runs_breadcrumb" 
                    class="${this._getBreadcrumbClass('runs')}" 
                    @click="${() => { this._selectMode('runs'); }}">Runs</li>
                <li id="results_breadcrumb" 
                    class="${this._getBreadcrumbClass('results')}" 
                    @click="${() => { this._selectMode('results'); }}">Results</li>
                <li id="visualize_breadcrumb" 
                    class="${this._getBreadcrumbClass('visualize')}" 
                    @click="${() => { this._selectMode('visualize'); }}">Visualize</li>
            </ul>
        `;
    }
    _getSectionStatus(section) {
        let status = TASK_NOT_STARTED;
        switch (section) {
            case "variables":
                status = getPathwayVariablesStatus(this.pathway);
                break;
            case "models":
                status = getPathwayModelsStatus(this.pathway);
                break;
            case "datasets":
                status = getPathwayDatasetsStatus(this.pathway);
                break;
            case "parameters":
                status = getPathwayParametersStatus(this.pathway);
                break;
            case "runs":
                status = getPathwayRunsStatus(this.pathway);
                break;
            case "results":
                status = getPathwayResultsStatus(this.pathway);
                break;
            default:
                break;
        }
        return status;
    }
    _getNextMode() {
        let modes = [
            "variables",
            "models",
            "datasets",
            "parameters",
            "runs",
            "results",
            "visualize"
        ];
        for (let i = 0; i < modes.length; i++) {
            let status = this._getSectionStatus(modes[i]);
            if (status != TASK_DONE) {
                return modes[i];
            }
        }
        return "visualize";
    }
    _getBreadcrumbClass(section) {
        let status = this._getSectionStatus(section);
        let cls = "";
        if (this._currentMode == section)
            cls += " active";
        switch (status) {
            case TASK_DONE:
                cls += " done";
                break;
            case TASK_PARTLY_DONE:
                cls += " partially_done";
                break;
            case TASK_NOT_STARTED:
                break;
        }
        return cls;
    }
    _selectMode(mode) {
        if (this._currentMode == mode) {
            return;
        }
        let item = this.shadowRoot.getElementById(mode + "_breadcrumb");
        if (item && item.className == "") {
            item.className = "active";
        }
        if (this._currentMode) {
            let itemold = this.shadowRoot.getElementById(this._currentMode + "_breadcrumb");
            if (itemold && itemold.className == "active") {
                itemold.className = "";
            }
        }
        this._currentMode = mode;
    }
    render() {
        if (!this.pathway) {
            return html ``;
        }
        return html `
            <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              <wl-title level="4">${this.subgoalName}</wl-title>
            </div>
            ${this._renderProgressBar()}

            <div class="card">
                <mint-variables class="page" 
                    .scenario="${this.scenario}"
                    ?active="${this._currentMode == 'variables'}">
                </mint-variables>
                <mint-models class="page" 
                    .scenario="${this.scenario}"
                    ?active="${this._currentMode == 'models'}">
                </mint-models>
                <mint-datasets class="page" 
                    .scenario="${this.scenario}"
                    ?active="${this._currentMode == 'datasets'}">
                </mint-datasets>
                <mint-parameters class="page" 
                    .scenario="${this.scenario}"
                    ?active="${this._currentMode == 'parameters'}">
                </mint-parameters>
                <mint-runs class="page" 
                    .scenario="${this.scenario}"
                    ?active="${this._currentMode == 'runs'}">
                </mint-runs>
                <mint-results class="page" 
                    .scenario="${this.scenario}"
                    ?active="${this._currentMode == 'results'}">
                </mint-results>
                <mint-visualize class="page" 
                    .scenario="${this.scenario}"
                    ?active="${this._currentMode == 'visualize'}">
                </mint-visualize>
            </div>
        `;
    }
    stateChanged(state) {
        if (super.setPathway(state)) {
            // If pathway changed
            console.log("mint-pathway: Pathway changed !");
            this._selectMode(this._getNextMode());
        }
        let subgoal = getUISelectedSubgoal(state);
        if (subgoal)
            this.subgoalName = subgoal.name;
        if (state.ui.selected_pathway_section) {
            //console.log(state.ui.selected_pathway_section);
            this._selectMode(state.ui.selected_pathway_section);
            state.ui.selected_pathway_section = "";
        }
    }
};
__decorate([
    property({ type: String })
], MintPathway.prototype, "subgoalName", void 0);
__decorate([
    property({ type: String })
], MintPathway.prototype, "_currentMode", void 0);
MintPathway = __decorate([
    customElement('mint-pathway')
], MintPathway);
export { MintPathway };
