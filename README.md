# Basic Charts with D3.js
This repository included series of basic chart creation with D3.js. 

The tutorial video is on FreeCodeCamp.org made by Curran Kelleher: https://www.youtube.com/watch?v=_8V5o2UHG0E

This repository used [rollup.js](https://rollupjs.org/) as the JavaScript module bundler.

## Screenshot of Chart from Branches
### Branch: main
![Basic Bar Chart](screenshots/main.png)

### Branch: customizing-axes-of-bar-chart
![Basic Bar Chart with axes customized](screenshots/customizing-axes-of-bar-chart.png)

### Branch: area-chart
![Area Chart](screenshots/area-chart.png)

### Branch: area-chart-world-population
![Area Chart for World Population](screenshots/area-chart-world-population.png)

### Branch: line-chart
![Line Chart](screenshots/line-chart.png)

### Branch: scatter-plot
![Scatter Plot](screenshots/scatter-plot.png)

## View the outcome
Open `public/index.html` in modern browser such as Chrome or Firefox directly. 

## Further development
To further develop the project by updating JavaScript, can run

```javascript

npm run bulid

```

or **watch** changes and auto compile:
```javascript
npm run watch
```

### Note for rollup.config.js settings
The output file format must be 'iife' to make advanced function work. 