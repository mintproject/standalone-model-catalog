
import { html, customElement, css, property } from 'lit-element';
import { PageViewElement } from '../../components/page-view-element';

import { SharedStyles } from '../../styles/shared-styles';
import { store, RootState } from '../../app/store';
import { connect } from 'pwa-helpers/connect-mixin';
import { goToPage } from '../../app/actions';
import { queryRegions } from './actions';
import { RegionsEditor } from './regions-editor';
import { RegionList } from './reducers';

import './regions-editor';

@customElement('regions-hydrology')
export class RegionsHydrology extends PageViewElement {
    static get styles() {
        return [
            SharedStyles,
            css `
            `
        ];
    }

    protected render() {
        return html`
            <div style="display:flex; width:100%; height: 100%">

                <regions-editor active style="flex-grow:1"
                    regionType="Hydrology" 
                    parentRegionId="${this._regionid}"
                ></regions-editor>

                <div style="width: 40%; padding: 5px; padding-top: 55px">
                    <p>
                        This page is in progress, it will allow you to run tools to identify hydrological regions of interest. 
                        Below are some example hydrological regions identified for South Sudan:
                        <ul>
                        <li><a href="https://raw.githubusercontent.com/mintproject/EthiopiaDemo/master/PIHMRiverBasin/2017.png"
                            >South Sudan River Basins (PIHM)</a>. The three river basins that were our focus in 2018.</li>
                        <li><a href="https://raw.githubusercontent.com/mintproject/EthiopiaDemo/master/PIHMRiverBasin/POI.png"
                            >South Sudan River Basins - POI</a>. The three river basins that were our focus in 2018 (overlayed with points of interest).</li>
                        <li><a href="https://raw.githubusercontent.com/mintproject/EthiopiaDemo/master/ImproveQuality/Ethiopia_relief_boundary.png"
                            >Ethiopia relief boundary</a>. 
                            <a href="http://mint.isi.edu/dev/data/Ethiopia_relief_subbasins_big.png">Ethiopia relief subbasins (94MB)</a>
                        </li>
                        <li><a href="http://mint.isi.edu/dev/data/Blue_Nile_Tribs_relief_and_boundaries_big.png"
                            >Blue Nile Tributaries relief and boundaries (76MB)</a></li>
                        <li><a href="https://raw.githubusercontent.com/mintproject/EthiopiaDemo/master/ImproveQuality/Guder_relief_rivers_boundary.png"
                            >Guder relief rivers boundary</a></li>
                        <li><a href="https://raw.githubusercontent.com/mintproject/EthiopiaDemo/master/ImproveQuality/Jamma_relief_river_boundary.png"
                            >Jamma relief river boundary</a></li>
                        <li><a href="https://raw.githubusercontent.com/mintproject/EthiopiaDemo/master/ImproveQuality/Muger_relief_rivers_boundary.png"
                            >Muger relief rivers boundary</a></li>
                        <li><a href="https://raw.githubusercontent.com/mintproject/EthiopiaDemo/master/ImproveQuality/Dashilo_relief_river_boundary.png"
                            >Dashilo relief river boundary</a></li>
                        </ul>            
                    </p>
                </div>
            </div>
        `;
    }
}
