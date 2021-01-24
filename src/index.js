import {
    select,
    csv,
    scaleLinear,
    extent,
    axisLeft,
    axisBottom,
    format,
} from 'd3';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

// d.mpg = +d.mpg;
// d.cylinders = +d.cylinders;
// d.displacement = +d.displacement;
// d.horsepower = +d.horsepower;
// d.weight = +d.weight;
// d.acceleration = +d.acceleration;
// d.year = +d.year;

const render = data => {
    const titleText = 'Cars: horsepower vs weight';
    const xValue = d => d.horsepower;
    const xAxisLabel = 'Horsepower';
    const yValue = d => d.weight;
    const yAxisLabel = 'Weight';
    const circleRadius = 5;
    const margin = {top: 80, right: 40, bottom: 70, left: 200};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleLinear()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([0, innerHeight])
        .nice();

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxis = axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(15);

    const yAxis = axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);

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

    g.selectAll('circle').data(data)
        .enter().append('circle')
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', circleRadius);

    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(titleText);
};

csv('auto-mpg.csv').then(data => {
    data.forEach(d => {
        d.mpg = +d.mpg;
        d.cylinders = +d.cylinders;
        d.displacement = +d.displacement;
        d.horsepower = +d.horsepower;
        d.weight = +d.weight;
        d.acceleration = +d.acceleration;
        d.year = +d.year;
    });
    render(data);
});