let data = [
        { x: -1893456000, y: 92228531 },
        { x: -1577923200, y: 106021568 },
        { x: -1262304000, y: 123202660 },
        { x: -946771200, y: 132165129 },
        { x: -631152000, y: 151325798 },
        { x: -315619200, y: 179323175 },
        { x: 0, y: 203211926 },
        { x: 315532800, y: 226545805 },
        { x: 631152000, y: 248709873 },
        { x: 946684800, y: 281421906 },
        { x: 1262304000, y: 308745538 }];

let graph = new Rickshaw.Graph({
        element: document.querySelector("#chart"),
        width: document.width,
        height: 250,
        renderer: 'line',
        series: [{
                color: 'steelblue',
                data: data
        }]
});

let hoverDetail = new Rickshaw.Graph.HoverDetail({
        graph: graph
});




let axes = new Rickshaw.Graph.Axis.Time({ graph: graph });

graph.render();

window.addEventListener('resize', () => { graph.render() });
