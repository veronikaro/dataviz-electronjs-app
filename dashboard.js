require("flexmonster");

const pivotReport = {
  dataSource: {
    type: "csv",
    filename: "./data/cwurData.csv",
  },
  slice: {
    reportFilters: [
      {
        uniqueName: "country",
      },
    ],
    rows: [
      {
        uniqueName: "institution",
      },
    ],
    columns: [
      {
        uniqueName: "[Measures]",
      },
    ],
    measures: [
      {
        uniqueName: "world_rank",
        aggregation: "average",
      },
      {
        uniqueName: "citations",
        aggregation: "sum",
      },
      {
        uniqueName: "influence",
        aggregation: "average",
      },
      {
        uniqueName: "publications",
        aggregation: "sum",
      },
      {
        uniqueName: "score",
        aggregation: "average",
      },
    ],
    sorting: {
      column: {
        type: "asc",
        tuple: [],
        measure: {
          uniqueName: "world_rank",
          aggregation: "average",
        },
      },
    },
  },
  options: {
    grid: {
      type: "classic",
    },
  },
  conditions: [
    {
      formula: "#value > 300",
      measure: "publications",
      format: {
        backgroundColor: "#00a45a",
        color: "#FFFFFF",
        fontFamily: "Arial",
        fontSize: "12px",
      },
    },
  ],
  formats: [
    {
      name: "",
      decimalPlaces: 2,
    },
  ],
};

const pivot = new Flexmonster({
  componentFolder: "https://cdn.flexmonster.com/",
  container: "pivot-container",
  toolbar: true,
  report: pivotReport,
});

const pivotChartsReport = {
  dataSource: {
    type: "csv",
    filename: "./data/cwurData.csv",
  },
  slice: {
    rows: [
      {
        uniqueName: "institution",
        filter: {
          measure: {
            uniqueName: "publications",
            aggregation: "sum",
          },
          query: {
            top: 5,
          },
        },
      },
    ],
    columns: [
      {
        uniqueName: "[Measures]",
      },
    ],
    measures: [
      {
        uniqueName: "world_rank",
        aggregation: "average",
      },
      {
        uniqueName: "citations",
        aggregation: "sum",
      },
      {
        uniqueName: "influence",
        aggregation: "average",
      },
      {
        uniqueName: "publications",
        aggregation: "sum",
      },
      {
        uniqueName: "score",
        aggregation: "average",
      },
    ],
  },
  options: {
    viewType: "charts",
    grid: {
      type: "classic",
    },
    chart: {
      type: "pie",
      activeMeasure: {
        uniqueName: "publications",
        aggregation: "sum",
      },
    },
  },
  formats: [
    {
      name: "",
      decimalPlaces: 2,
    },
  ],
};

// Leave only exporting functionality for the pivot charts instance

function customizeToolbar(toolbar) {
  var tabs = toolbar.getTabs();
  // override tabs
  toolbar.getTabs = function () {
    // delete the first tab
    tabs.forEach(function (tab, index) {
      if (tab.title != "Export" && tab.title != "Save") {
        delete tabs[index];
      }
    });
    return tabs;
  };
}

const pivot_charts = new Flexmonster({
  componentFolder: "https://cdn.flexmonster.com/",
  container: "pivot-charts-container",
  toolbar: true,
  height: 600,
  report: pivotChartsReport,
  beforetoolbarcreated: customizeToolbar,
});
