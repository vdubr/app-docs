import React from 'react';
import {Link} from "react-router-dom";
import {withNamespaces} from '@gisatcz/ptr-locales';
import {LineChart} from '@gisatcz/ptr-charts';

import sample_serie_4 from "../../../../mockData/sample_serie_4";
import sample_serie_30 from "../../../../mockData/sample_serie_30";
import sample_serie_500 from "../../../../mockData/sample_serie_500";

import {HoverHandler} from "@gisatcz/ptr-core";
import Page, {
	InlineCodeHighlighter,
	LightDarkBlock,
	SyntaxHighlighter
} from "../../../../Page";
import ResizableContainer from "../../../../ResizableContainer/ResizableContainer";
import ComponentPropsTable, {Prop, PropOption} from "../../../../ComponentPropsTable/ComponentPropsTable";

class LineChartDoc extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Page title="Line chart">
				<div className="ptr-docs-visualizations-intro-example">
					<HoverHandler>
						<LineChart
							key="line-chart-doc-typical-usage-2"
							maxWidth={50}

							xScaleType="time"

							data={sample_serie_4}
							keySourcePath="key"
							nameSourcePath="data.name"
							serieDataSourcePath="data.data"
							xSourcePath="period" // in context of serie
							ySourcePath="someStrangeValue" // in context of serie

							xOptions={{
								inputValueFormat: 'YYYY',
								axisValueFormat: 'YYYY',
								popupValueFormat: 'YYYY',
								name: 'Time'
							}}

							sorting={[["period", "asc"]]} // not required, but recommended
						/>
					</HoverHandler>
				</div>

				<p>A line chart is a type of chart which displays information as a series of data points connected by straight line segments. Use this type of chart to <b>show progress</b> of one attribute/indicator in the time, or to show progress of multiple comparable attributes/indicators for one area.</p>

				<h2 id="props">Props</h2>
				<p>Bellow are listed specific props for line chart. Other props are common to all cartesian charts (<Link to="/components/visualizations/CartesianCharts">see Cartesian charts documentation</Link>).</p>
				<ComponentPropsTable>
					<Prop name="aggregationThreshold" type="number" defaultValue={50}>f there is more lines than threshold, lines will be aggregated to average, min and max.</Prop>
					<Prop name="forceMode" type="string">Set the mode independently of number of lines. Possible values: 'gray' or 'aggregated'</Prop>
					<Prop name="grayingThreshold" type="number" defaultValue={10}>If there are more lines than threshold, lines will be gray.</Prop>
					<Prop name="pointNameSourcePath" type="string">Path to name for point in source data.</Prop>
					<Prop name="pointOptions" type="object">
						<PropOption name="showOnHover" type="boolean">Show line points on hover. Only if withPoints is set to true.</PropOption>
					</Prop>
					<Prop name="withPoints" type="boolean" defaultValue={false}>If true, lines will be rendered with points.</Prop>
				</ComponentPropsTable>
				<h2 id="dataStructure">Input data structure</h2>
				<p>Input data for line chart has to be a collection, where each object must contain at least key and collection of attribute data objects. The attribute data object must contain at least two key-value pairs, one as source for axis x and second as source for axis y.</p>
				<SyntaxHighlighter language="javascript">
					{'const data = [\n' +
					'\t{\n' +
					'\t\tkey: "230bd221-5384-4c09-bfa3-069eacbcfff8",   //use \'key\' as keySourcePath\n' +
					'\t\tdata: {\n' +
					'\t\t\tname: "Missouri",   //use \'data.name\' as nameSourcePath\n' +
					'\t\t\tcolor: "#ff0000",   //use \'data.color\' as colorSourcePath\n' +
					'\t\t\tdata: [{   //use \'data.data\' as serieDataSourcePath\n' +
					'\t\t\t\tperiod: 2006,   //use \'period\' as xSourcePath\n' +
					'\t\t\t\tsomeStrangeValue: 1532   //use \'someStrangeValue\' as ySourcePath\n' +
					'\t\t\t}, {\n' +
					'\t\t\t\tperiod: 1991,\n' +
					'\t\t\t\tsomeStrangeValue": null\n' +
					'\t\t\t}, ...]\n' +
					'\t\t}\n' +
					'\t}, {\n' +
					'\t\tkey: "91c6851e-c5ef-4165-9b15-8cd987a92904",\n' +
					'\t\tdata: {...}\n'	+
					'\t},\n' +
					'\t...\n' +
					']'}
				</SyntaxHighlighter>

				<h2 id="basicSettings">Basic necessary settings</h2>
				<SyntaxHighlighter language="jsx">
					{'// Sorting is not required, but recommended. \n' +
					'// Use HoverHandler to see popups when move cursor over line or point. \n' +
					'<HoverHandler>\n' +
					'\t<LineChart \n' +
					'\t\tkey="test1"\n' +
					'\t\t\n' +
					'\t\tdata={data}\n' +
					'\t\tkeySourcePath="key"\n' +
					'\t\tnameSourcePath="data.name"\n' +
					'\t\tserieDataSourcePath="data.data"\n' +
					'\t\txSourcePath="period"\n' +
					'\t\tySourcePath="someStrangeValue"\n' +
					'\n' +
					'\t\tsorting={[["period", "asc"]]}\n' +
					'\t/>\n' +
					'</HoverHandler>'}
				</SyntaxHighlighter>

				<LightDarkBlock forceRows>
					<HoverHandler>
						<ResizableContainer>
							<LineChart
								key="test1"

								data={sample_serie_4}
								keySourcePath="key"
								nameSourcePath="data.name"
								serieDataSourcePath="data.data"
								xSourcePath="period" // in context of serie
								ySourcePath="someStrangeValue" // in context of serie

								sorting={[["period", "asc"]]} // not required, but recommended
							/>
						</ResizableContainer>
					</HoverHandler>
				</LightDarkBlock>

				<h2 id="withoutPoints">Lines without points</h2>
				<p>For simple use cases, it is possible to show line chart without points by setting <InlineCodeHighlighter>withPoints</InlineCodeHighlighter> prop to false. Be aware that you will lose information about values in popups in this case.</p>

				<SyntaxHighlighter language="jsx">
					{'<HoverHandler>\n' +
					'\t<LineChart \n' +
					'\t\tkey="without-points"\n' +
					'\t\t\n' +
					'\t\tdata={data}\n' +
					'\t\tkeySourcePath="key"\n' +
					'\t\tnameSourcePath="data.name"\n' +
					'\t\tserieDataSourcePath="data.data"\n' +
					'\t\txSourcePath="period"\n' +
					'\t\tySourcePath="someStrangeValue"\n' +
					'\n' +
					'\t\tsorting={[["period", "asc"]]}\n' +
					'\n' +
					'\t\twithPoints={false}\n' +
					'\t/>\n' +
					'</HoverHandler>'}
				</SyntaxHighlighter>

				<LightDarkBlock forceRows>
					<HoverHandler>
						<ResizableContainer>
							<LineChart
								key="without-points"

								data={sample_serie_4}
								keySourcePath="key"
								nameSourcePath="data.name"
								serieDataSourcePath="data.data"
								xSourcePath="period" // in context of serie
								ySourcePath="someStrangeValue" // in context of serie

								sorting={[["period", "asc"]]} // not required, but recommended

								withPoints={false}
							/>
						</ResizableContainer>
					</HoverHandler>
				</LightDarkBlock>

				<h2 id="graying">Graying and aggregation</h2>
				<p>As you can see in the examples above, every line in the chart has its own color, so the chart is easy to read. However, the more lines are in the chart, the worse is the readability. Graying mode helps solve these cases.</p>
				<p>By default, <InlineCodeHighlighter>grayingThreshold</InlineCodeHighlighter> is set to 10, so if there are more than 10 lines (and less than aggregation threshold at the same time), all lines will have gray color and no points. In the example below, data with 30 items is used.</p>

				<LightDarkBlock forceRows>
					<HoverHandler>
						<ResizableContainer>
							<LineChart
								key="without-points"

								data={sample_serie_30}
								keySourcePath="key"
								nameSourcePath="data.name"
								serieDataSourcePath="data.data"
								xSourcePath="period" // in context of serie
								ySourcePath="someStrangeValue" // in context of serie

								sorting={[["period", "asc"]]} // not required, but recommended
							/>
						</ResizableContainer>
					</HoverHandler>
				</LightDarkBlock>

				<p>Number of items in input data could be dynamic in real-world use cases and so setting of grayingThreshold would not be enough. In this case is useful the <InlineCodeHighlighter>forceMode</InlineCodeHighlighter> property. If we set its value to "gray", the lines will be always gray. In the example below, data with 4 items is used.</p>

				<SyntaxHighlighter language="jsx">
					{'<HoverHandler>\n' +
					'\t<LineChart \n' +
					'\t\tkey="graying-threshold"\n' +
					'\t\t\n' +
					'\t\tdata={data}\n' +
					'\t\tkeySourcePath="key"\n' +
					'\t\tnameSourcePath="data.name"\n' +
					'\t\tserieDataSourcePath="data.data"\n' +
					'\t\txSourcePath="period"\n' +
					'\t\tySourcePath="someStrangeValue"\n' +
					'\n' +
					'\t\tsorting={[["period","asc"]]}\n' +
					'\n' +
					'\t\tforceMode="gray"\n' +
					'\t/>\n' +
					'</HoverHandler>'}
				</SyntaxHighlighter>

				<LightDarkBlock forceRows>
					<HoverHandler>
						<ResizableContainer>
							<LineChart
								key="without-points"

								data={sample_serie_4}
								keySourcePath="key"
								nameSourcePath="data.name"
								serieDataSourcePath="data.data"
								xSourcePath="period" // in context of serie
								ySourcePath="someStrangeValue" // in context of serie

								sorting={[["period", "asc"]]} // not required, but recommended

								forceMode="gray"
							/>
						</ResizableContainer>
					</HoverHandler>
				</LightDarkBlock>

				<p>At the end of the day, even the chart with gray lines only will be confusing for big number of lines and we have to aggregate lines to average values and buffer. By default, <InlineCodeHighlighter>aggregationThreshold</InlineCodeHighlighter> is set to 50, but again we can change the value or use <InlineCodeHighlighter>forceMode</InlineCodeHighlighter> property. </p>

				<SyntaxHighlighter language="jsx">
					{'// Data with 500 items. \n' +
					'<HoverHandler>\n' +
					'\t<LineChart \n' +
					'\t\tkey="aggregation-threshold"\n' +
					'\t\t\n' +
					'\t\tdata={data}\n' +
					'\t\tkeySourcePath="key"\n' +
					'\t\tnameSourcePath="data.name"\n' +
					'\t\tserieDataSourcePath="data.data"\n' +
					'\t\txSourcePath="period"\n' +
					'\t\tySourcePath="someStrangeValue"\n' +
					'\n' +
					'\t\tsorting={[["period", "asc"]]}\n' +
					'\t/>\n' +
					'</HoverHandler>'}
				</SyntaxHighlighter>

				<LightDarkBlock forceRows>
					<HoverHandler>
						<ResizableContainer>
							<LineChart
								key="aggregation-threshold"

								data={sample_serie_500}
								keySourcePath="key"
								nameSourcePath="data.name"
								serieDataSourcePath="data.data"
								xSourcePath="period" // in context of serie
								ySourcePath="someStrangeValue" // in context of serie

								sorting={[["period", "asc"]]} // not required, but recommended
							/>
						</ResizableContainer>
					</HoverHandler>
				</LightDarkBlock>

				<SyntaxHighlighter language="jsx">
					{'// Data with 4 items forced to aggregation. \n' +
					'<HoverHandler>\n' +
					'\t<LineChart \n' +
					'\t\tkey="aggregation-forced"\n' +
					'\t\t\n' +
					'\t\tdata={data}\n' +
					'\t\tkeySourcePath="key"\n' +
					'\t\tnameSourcePath="data.name"\n' +
					'\t\tserieDataSourcePath="data.data"\n' +
					'\t\txSourcePath="period"\n' +
					'\t\tySourcePath="someStrangeValue"\n' +
					'\n' +
					'\t\tsorting={[["period","asc"]]}\n' +
					'\n' +
					'\t\tforceMode="aggregated"\n' +
					'\t/>\n' +
					'</HoverHandler>'}
				</SyntaxHighlighter>

				<LightDarkBlock forceRows>
					<HoverHandler>
						<ResizableContainer>
							<LineChart
								key="without-points"

								data={sample_serie_4}
								keySourcePath="key"
								nameSourcePath="data.name"
								serieDataSourcePath="data.data"
								xSourcePath="period" // in context of serie
								ySourcePath="someStrangeValue" // in context of serie

								sorting={[["period", "asc"]]} // not required, but recommended

								forceMode="aggregated"
							/>
						</ResizableContainer>
					</HoverHandler>
				</LightDarkBlock>
			</Page>
		);
	}
}

export default withNamespaces()(LineChartDoc);