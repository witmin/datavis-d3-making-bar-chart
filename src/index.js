import {
    select,
    csv,
    scaleLinear,
    max,
    scalePoint,
    axisLeft,
    axisBottom,
    format,
} from 'd3';

const titleText = 'Top 10 Most Populous Countries';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
    const xValue = d => d['population'];
    const yValue = d => d.country;
    const margin = {top: 50, right: 40, bottom: 70, left: 200};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth])
        .nice();

    const yScale = scalePoint()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.1);


    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxisTickFormat = number =>
        format('.3s')(number)
            .replace('G', 'B');

    const xAxis = axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight);

    const yAxis = axisLeft(yScale)
        .tickSize(-innerWidth);

    g.append('g')
        .call(yAxis)
        .selectAll('.domain')
        .remove();

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);

    xAxisG.select('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 50)
        .attr('x', innerWidth/2)
        .attr('fill', 'black')
        .text('Population');

    g.selectAll('circle').data(data)
        .enter().append('circle')
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', 8);

    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(titleText);
};

csv('data.csv').then(data => {
    data.forEach(d => {
        d.population = +d.population * 1000;
    });
    render(data);
});