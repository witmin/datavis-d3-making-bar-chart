import {
    select,
    csv,
    max,
    scaleLinear,
    scaleTime,
    extent,
    axisLeft,
    axisBottom,
    area,
    format,
} from 'd3';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
    const titleText = 'World Population Area Chart 2015';
    const xValue = d => d.year;
    const xAxisLabel = 'Year';
    const yValue = d => d.population;
    const yAxisLabel = 'Population';
    const margin = {top: 80, right: 40, bottom: 70, left: 165};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = scaleLinear()
        .domain([0, max(data, yValue)])
        .range([innerHeight, 0]);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxis = axisBottom(xScale)
        .ticks(6)
        .tickSize(-innerHeight)
        .tickPadding(15);

    const yAxisTickFormat = number =>
        format('.1s')(number)
            .replace('G', 'B');

    const yAxis = axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10)
        .tickFormat(yAxisTickFormat);

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();

    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('x', -innerHeight / 2)
        .attr('y', -65)
        .attr('fill', 'black')
        .attr('text-anchor', 'middle')
        .attr('transform', `rotate(-90)`)
        .text(yAxisLabel);


    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);

    xAxisG.select('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 60)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);

    const areaGenerator = area()
        .x(d => xScale(xValue(d)))
        .y0(innerHeight)
        .y1(d => yScale(yValue(d)));

    g.append('path')
        .attr('class','line-path')
        .attr('d', areaGenerator(data));

    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(titleText);
};

csv('world-population-by-year-2015.csv').then(data => {
    data.forEach(d => {
        d.year = new Date(d.year);
        d.population = +d.population;
    });
    render(data);
});