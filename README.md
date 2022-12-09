### Data Source

- https://gist.github.com/JaneShaosyx/717a90505abe201d67d15d10606e8de7
- https://gist.github.com/JaneShaosyx/8ab77d5f02ca0bbbccd0defd8f528cff
- Produced by SFU CMPT 732 Final Project



### Project Structure

```
.
├── App.js
├── actions
│   ├── getCluster.js
│   ├── getStatesInfo.js
│   └── getUSA.js
├── api
│   └── index.js
├── components
│   ├── LineChart
│   │   ├── LineChart.js
│   │   └── styles.css
│   ├── USAPoint
│   │   ├── USAPoint.js
│   │   └── styles.css
│   ├── USAPointPredict
│   │   ├── USAPointPredict.js
│   │   └── styles.css
│   └── USAState
│       ├── USAStateBase.js
│       └── styles.css
├── constants
│   ├── StateHash.js
│   └── predictData.js
├── index.css
└── index.js
```



### Graph

- First graph is for the result of the survey.
- Second graph is to display all the stations with color stands for the cluster they belongs to.
- Third graph is the geographical representation of data.
- Forth graph is the chronological representation of data.



### Interaction

- You can get the relavant data on top of the graph when you move your mouse on the points (for graph 1 and 2) or squares (for graph 3).
- You can change displayed data through submit form (for graph 1) or just drop-down selectors (for graph 2,3,4).



### Note

> Because we just collect the data for 50 states, some choices in the state drop-down selector do not have data.(it has around 60 states and areas)

