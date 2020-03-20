import React from 'react';
import Page, {DocsToDo, DocsToDoInline, InlineCodeHighlighter, LightDarkBlock, SyntaxHighlighter} from "../../../../Page";
import {WorldWindMap, MapControls, PresentationMap, ReactLeafletMap} from "@gisatcz/ptr-maps";
import {connects, Link} from "@gisatcz/ptr-state";
import ComponentPropsTable, {Prop, Section} from "../../../../ComponentPropsTable/ComponentPropsTable";

const Map = connects.Map(PresentationMap);

const view = {
	center: {lat: 50, lon: 15},
	boxRange: 2000000
};

const presentational_backgroundLayer = {
	key: 'background-osm',
	type: 'wmts',
	options: {
		url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
	}
};

// Connected background
const connectedBackgroundLayer = {
	layerTemplateKey: 'd54f7782-976b-4fb2-9066-5f1ca4f3b703',
	metadataModifiers: {
		applicationKey: 'docs'
	}
};

// WMS layer
const presentational_cuzk = {
	key: 'cuzk_ortofoto',
	name: 'CUZK Ortofoto',
	type: 'wms',
	options: {
		url: 'http://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx?',
		params: {
			layers: 'GR_ORTFOTORGB'
		}
	}
};

// WMS layer from BE - from 206
const connected_wms = {
	key: 'layer-geoinv',
	layerTemplateKey: '097d3fed-e6da-4f08-833e-839c88513b8b',
	metadataModifiers: {
		applicationKey: 'docs'
	}
};

const presentationalLayers = [presentational_cuzk];
const connectedLayers = [connected_wms];


class MapDoc extends React.PureComponent {

	constructor(props) {
		super(props);

		props.addMap(
			{
				key: 'docs-connected-map',
				data: {
					view: {
						center: {lat: 50, lon: 14},
						boxRange: 2000000
					},
					backgroundLayer: {
						layerTemplateKey: 'd54f7782-976b-4fb2-9066-5f1ca4f3b703',
					},
					layers: [{
						key: 'layer-cz',
						layerTemplateKey: 'b5afa739-7828-4ed0-8844-306a5470e7e0'
					}]
				}
			}
		);
	}

	render() {
		return (
			<Page title="Map">
				<DocsToDo>Add description</DocsToDo>

				<h2>Props</h2>
				<ComponentPropsTable>
					<Prop name="mapComponent" required>Presentational component to render the final map</Prop>
					<Section name="Controlled">
						<Prop name="stateMapKey" required type="string">Valid key of a map in map store</Prop>
					</Section>
					<Section name="Uncontrolled">
						<Prop name="mapKey" type="string"/>
						<Prop name="view" required type="map view"><Link to="/architecture/systemDataTypes/mapView">Presentation view</Link></Prop>
						<Prop name="layers" type="layers"><Link to="/architecture/systemDataTypes/layers">Layers</Link></Prop>
						<Prop name="backgroundLayer" type="background layer">
							<Link to="/architecture/systemDataTypes/layers#backgroundLayer">Background layer</Link>
						</Prop>
						<Prop name="onViewChange" type="function">Function called when a view change is initiated inside the Presentation component</Prop>
						<Prop name="onClick" type="function">Function called on click</Prop>
						<Prop name="wrapperClasses" type="string">Class names for wrapper component</Prop>
					</Section>
					<DocsToDoInline>Add missing props</DocsToDoInline>
				</ComponentPropsTable>

				<h2>Uncontrolled unconnected</h2>
				<p>Presentational components only.</p>

				<div style={{marginTop: 10, height: 400}}>
					<PresentationMap
						mapComponent={WorldWindMap}
						backgroundLayer={presentational_backgroundLayer}
						layers={presentationalLayers}
						view={view}
					>
						<MapControls/>
					</PresentationMap>
				</div>
					<SyntaxHighlighter language="jsx">{`import {WorldWindMap, MapControls, PresentationMap} from "@gisatcz/ptr-maps";

<PresentationMap
	mapComponent={WorldWindMap}
	backgroundLayer={{
		key: 'background-osm',
		type: 'wmts',
		options: {
			url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
		}
	}}
	layers={[{
		key: 'cuzk_ortofoto',
		name: 'CUZK Ortofoto',
		type: 'wms',
		options: {
			url: 'http://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx?',
			params: {
				layers: 'GR_ORTFOTORGB'
			}
		}
	}]}
	view={{
		center: {lat: 50, lon: 15},
		boxRange: 2000000
	}}
>
	<MapControls/>
</PresentationMap>
`}
					</SyntaxHighlighter>





				<h2>Uncontrolled</h2>
				<p>Layers are served from 192.168.2.206. Check your configuration if there are no layers in the map below.</p>
				<div style={{marginTop: 10, height: 400}}>
					<Map
						mapKey="uncontrolled-map"
						view={view}
						mapComponent={WorldWindMap}
						backgroundLayer={connectedBackgroundLayer}
						layers={connectedLayers}
					>
						<MapControls/>
					</Map>
				</div>
				<SyntaxHighlighter language="jsx">{`import {WorldWindMap, MapControls, Map} from "@gisatcz/ptr-maps";

<Map
	mapComponent={WorldWindMap}
	backgroundLayer={{
		key: 'layer-geoinv',
		layerTemplateKey: '097d3fed-e6da-4f08-833e-839c88513b8b',
		metadataModifiers: {
			applicationKey: 'docs'
		}
	}}
	layers={[{
		key: 'layer-geoinv',
		layerTemplateKey: '097d3fed-e6da-4f08-833e-839c88513b8b',
		metadataModifiers: {
			applicationKey: 'docs'
		}
	]}
	view={{
		center: {lat: 50, lon: 15},
		boxRange: 2000000
	}}
>
	<MapControls/>
</Map>
`}
				</SyntaxHighlighter>





				<h2>Connected to store</h2>
				<p>Layers are served from 192.168.2.206. Check your configuration if there are no layers in the map below.</p>
				<div style={{marginTop: 10, height: 400}}>
					<Map
						mapComponent={WorldWindMap}
						stateMapKey="docs-connected-map"
					>
						<MapControls/>
					</Map>
				</div>
				<SyntaxHighlighter language="jsx">{`import {ReactLeafletMap, MapControls, Map} from "@gisatcz/ptr-maps";

// Map with key 'docs-connected-map' should already be in the store
<Map
	mapComponent={ReactLeafletMap}
	stateMapKey="docs-connected-map"
>
	<MapControls levelsBased zoomOnly/>
</Map>
`}
				</SyntaxHighlighter>
			</Page>
		);
	}
}

export default MapDoc;