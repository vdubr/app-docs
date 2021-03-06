import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from '@gisatcz/ptr-state';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import Helmet from "react-helmet";
import createStore,{history} from './state/Store';
import {Action} from '@gisatcz/ptr-state';


import config from "./config";

import '@gisatcz/ptr-core/lib/styles/reset.css';
import '@gisatcz/ptr-core/lib/styles/base.scss';
import './styles/index.scss';


import Docs, {Directory, Page, Anchor} from "./components/Docs";

import Index from "./components/pages/index";
import Design from "./components/pages/design";
import Typography from "./components/pages/design/Typography";
import Buttons from "./components/pages/components/atoms/ButtonsDoc";
import CartesianCharts from "./components/pages/components/visualizations/cartesianCharts/CartesianCharts";
import ColumnChartDoc from "./components/pages/components/visualizations/cartesianCharts/ColumnChartDoc";
import LineChartDoc from "./components/pages/components/visualizations/cartesianCharts/LineChartDoc";
import ScatterChartDoc from "./components/pages/components/visualizations/cartesianCharts/ScatterChartDoc";
import AsterChartDoc from "./components/pages/components/visualizations/AsterChartDoc";
import SankesChartDoc from "./components/pages/components/visualizations/SankeyChartDoc";
import FormsDoc from "./components/pages/components/atoms/FormsDoc";
import ItemSelectDoc from "./components/pages/components/atoms/ItemSelectDoc";
import MapDoc from "./components/pages/components/maps/MapDoc";
import MapSetDoc from "./components/pages/components/maps/MapSetDoc";
import HoverHandlerDoc from "./components/pages/components/commonFeatures/HoverHandlerDoc";
import LayersDoc from "./components/pages/architecture/systemDataTypes/LayersDoc";
import MapViewDoc from "./components/pages/architecture/systemDataTypes/MapViewDoc";
import StyleDoc from "./components/pages/architecture/commonDataTypes/StyleDoc";
import ReactLeafletMapDoc from "./components/pages/components/maps/ReactLeafletMapDoc";
import WorldWindMapDoc from "./components/pages/components/maps/WorldWindMapDoc";
import LeafletVectorLayer from "./components/pages/components/maps/ReactLeafletMapDoc/LeafletVectorLayer";
import LeafletDiagramLayer from "./components/pages/components/maps/ReactLeafletMapDoc/LeafletDiagramLayer";
import WorldWindVectorLayer from "./components/pages/components/maps/WorldWindMapDoc/WorldWindVectorLayer";
import LeafletIndexedVectorLayer from "./components/pages/components/maps/ReactLeafletMapDoc/LeafletIndexedVectorLayer";
import MapPresentational from "./components/pages/components/maps/MapPresentational";
import MapControls from "./components/pages/components/maps/MapControls";
import MapViewLimitsDoc from "./components/pages/architecture/systemDataTypes/MapViewLimits";
import MapWrapperDoc from "./components/pages/components/maps/MapWrapperDoc";

const {store} = createStore();

store.dispatch(Action.app.updateLocalConfiguration(config));
store.dispatch(Action.app.setKey('docs'));
// Store.dispatch(Action.app.setBaseUrl(baseUrl)); //TODO get base URL


// Load Current User
store.dispatch(Action.users.apiLoadCurrentUser());

// Set local configuration
store.dispatch(Action.app.updateLocalConfiguration(config));



ReactDOM.render(
    <Provider store={store}>
        <Helmet
            titleTemplate="%s | Panther docs"
            defaultTitle="Panther docs"
        />
        <ConnectedRouter history={history}>
            <Docs component={Index}>
                <Directory label="Architecture" path="architecture">
                    <Page label="Applications" path="applications"/>
                    <Directory label="Store data types" path="storeDataTypes">
                        <Directory label="Common data types" path="common">
                            <Page label="Style" path="style" component={StyleDoc}>
                                <Anchor label="Without style" path="without-style"/>
                                <Anchor label="Fill styling" path="fill"/>
                                <Anchor label="Outline styling" path="outline"/>
                                <Anchor label="Hovered & selected" path="hovered-selected"/>
                                <Anchor label="Attribute values" path="values"/>
                                <Anchor label="Intervals" path="intervals"/>
                                <Anchor label="Scales" path="scales"/>
                                <Anchor label="Transformations" path="transformations"/>
                                <Anchor label="Symbols" path="symbols"/>
                                <Anchor label="Diagrams" path="diagrams"/>
                            </Page>
                        </Directory>
                        <Page label="Specific data types" path="specific"/>
                    </Directory>
                    <Directory label="System data types" path="systemDataTypes">
                        <Page label="Layers" path="layers" component={LayersDoc}/>
                        <Page label="Map view" path="mapView" component={MapViewDoc}/>
                        <Page label="Map view limits" path="mapViewLimits" component={MapViewLimitsDoc}/>
                    </Directory>
                </Directory>
                <Directory label="Design" path="design" component={Design}>
                    <Page label="Typography" path="typography" component={Typography} />
                    <Page label="Colours" path="colours"/>
                </Directory>
                <Directory label="Components" path="components">
                    <Directory label="Maps" path="maps">
                        <Page label="Map" path="map" component={MapDoc}/>
                        <Page label="Map set" path="mapSet" component={MapSetDoc}/>
                        <Page label="Map wrapper" path="mapWrapper" component={MapWrapperDoc}/>
                        <Directory label="Presentational" path="presentational" component={MapPresentational}>
                            <Directory label="WebWorldWind" path="webWorldWind" component={WorldWindMapDoc}>
                                <Page label="Vector layer" path="vectorLayer" component={WorldWindVectorLayer}/>
                            </Directory>
                            <Directory label="ReactLeafletMap" path="reactLeaflet" component={ReactLeafletMapDoc}>
                                <Page label="Vector layer" path="vectorLayer" component={LeafletVectorLayer}>
                                    <Anchor label="Props" path="props"/>
                                    <Anchor label="Polygons" path="polygons"/>
                                    <Anchor label="Points" path="points"/>
                                    <Anchor label="Lines" path="lines"/>
                                    <Anchor label="Mixed" path="mixed"/>
                                </Page>
                                <Page label="Diagram layer" path="diagramLayer" component={LeafletDiagramLayer}/>
                                <Page label="Indexed Vector layer" path="indexedVectorLayer" component={LeafletIndexedVectorLayer}/>
                            </Directory>
                        </Directory>
                        <Directory label="Controls" path="controls">
                            <Page label="Map controls" path="mapControls" component={MapControls}/>
                        </Directory>
                    </Directory>
                    <Directory label="Visualizations" path="visualizations">
                        <Directory label="Cartesian charts" path="cartesianCharts" component={CartesianCharts}>
                            <Page label="Line chart" path="lineChart" component={LineChartDoc}>
                                <Anchor label="Props" path="props"/>
                                <Anchor label="Data structure" path="dataStructure"/>
                                <Anchor label="Basic settings" path="basicSettings"/>
                                <Anchor label="Lines without points" path="withoutPoints"/>
                                <Anchor label="Graying and aggregation" path="graying"/>
                            </Page>
                            <Page label="Column chart" path="columnChart" component={ColumnChartDoc}>
                                <Anchor label="Props" path="props"/>
                                <Anchor label="Data structure" path="dataStructure"/>
                                <Anchor label="Basic settings" path="basicSettings"/>
                                <Anchor label="Serial data handling" path="serialData"/>
                                <Anchor label="Custom bar colors" path="barColors"/>
                                <Anchor label="Aggregation" path="aggregation"/>
                                <Anchor label="Diverging" path="diverging"/>
                                <Anchor label="Stacked" path="stacked"/>
                            </Page>
                            <Page label="Scatter chart" path="scatterChart" component={ScatterChartDoc}>
                                <Anchor label="Props" path="props"/>
                                <Anchor label="Data structure" path="dataStructure"/>
                                <Anchor label="Basic settings" path="basicSettings"/>
                                <Anchor label="Point radius" path="pointRadius"/>
                                <Anchor label="Serial data handling" path="serialData"/>
                                <Anchor label="Custom symbols" path="symbols"/>
                            </Page>
                        </Directory>
                        <Page label="Aster chart" path="asterChart" component={AsterChartDoc}>
                            <Anchor label="Props" path="props"/>
                            <Anchor label="Data structure" path="dataStructure"/>
                            <Anchor label="Basic settings" path="basicSettings"/>
                            <Anchor label="Relative values" path="relativeValues"/>
                            <Anchor label="Dimensions" path="dimensions"/>
                            <Anchor label="Forced min & max" path="forceMinMax"/>
                            <Anchor label="Grid" path="grid"/>
                            <Anchor label="Radials & legend" path="radials"/>
                            <Anchor label="Custom hover value" path="customHover"/>
                        </Page>
                        <Page label="Sankey chart" path="sankesChart" component={SankesChartDoc}>
                            {/* <Anchor label="Props" path="props"/>
								<Anchor label="Data structure" path="dataStructure"/>
								<Anchor label="Basic settings" path="basicSettings"/>
								<Anchor label="Relative values" path="relativeValues"/>
								<Anchor label="Dimensions" path="dimensions"/>
								<Anchor label="Forced min & max" path="forceMinMax"/>
								<Anchor label="Grid" path="grid"/>
								<Anchor label="Radials & legend" path="radials"/>
								<Anchor label="Custom hover value" path="customHover"/> */}
                        </Page>
                    </Directory>
                    <Directory label="Atoms" path="atoms">
                        <Page label="Buttons" path="buttons" component={Buttons}>
                            <Anchor label="Props" path="props"/>
                            <Anchor label="Levels" path="levels"/>
                            <Anchor label="Sizes" path="sizes"/>
                        </Page>
                        <Page label="Forms" path="forms" component={FormsDoc}/>
                        <Page label="ItemSelect" path="itemSelect" component={ItemSelectDoc}/>
                        <Page label="Icon" path="icon"/>
                        <Page label="Loader" path="loader"/>
                        <Page label="EditableText" path="editableText"/>
                        <Page label="Utilities ???" path="utilities"/>{/* center, fadeIn, expandRowButton, etc. */}
                    </Directory>
                    <Directory label="Interface elements" path="interfaceElements">
                        <Page label="Panther select" path="pantherSelect">
                            <Anchor label="Usage" path="usage"/>
                            <Anchor label="Extending" path="extending"/>
                        </Page>
                        <Page label="Adjustable columns" path="adjustableColumns" />
                        <Page label="ScreenAnimator" path="screenAnimator" />
                    </Directory>
                    <Directory label="Controls" path="controls">
                        <Directory label="Timeline" path="timeline">
                            <Page label="Map Timeline" path="mapTimeline"/>
                        </Directory>
                        <Page label="Areas" path="areas" />
                        <Page label="Layers" path="layers" />
                        <Page label="User & login overlay" path="user"/>
                        <Page label="Share ???" path="share"/>
                    </Directory>
                    <Directory label="Common features" path="commonFeatures">
                        <Page label="AppContainer" path="appContainer"/>
                        <Page label="HoverHandler" path="hoverHandler" component={HoverHandlerDoc}/>
                        <Page label="WindowsContainer" path="windowsContainer"/>
                    </Directory>
                </Directory>
                <Directory label="Code" path="code">
                    <Page label="Using data in applications ??" path="usingData" />
                    <Page label="API" path="api" />
                </Directory>
                <Page label="Panther 2" path="panther2" />
            </Docs>
        </ConnectedRouter>
    </Provider>,document.getElementById('ptr')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
