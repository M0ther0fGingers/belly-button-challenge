// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log(data);

    // get the metadata field
    let mdata = data.metadata
    console.log(mdata);
  
    // Filter the metadata for the object with the desired sample number
    let sample_id = mdata.filter(x => x.id == sample);
    // Select the first sample in the list
    let result = sample_id[0]

    // Use d3 to select the panel with id of `#sample-metadata`
    let demo_table = d3.select("#sample-metadata");
      
    // Use `.html("") to clear any existing metadata
    demo_table.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
      for (key in result) {
        demo_table.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
      }
})};

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let sample_data = data.samples

    // Filter the samples for the object with the desired sample number
    let sample_id = sample_data.filter(x => x.id == sample);
    let result = sample_id[0]

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids
    let otu_labels = result.otu_labels
    let sample_values = result.sample_values

    // Build a Bubble Chart
    let bubble_trace = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {size:sample_values, color: otu_ids, colorscale: "Earth"},
     }
    ]
    let bubble_layout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Number of Bacteria"}
    }
    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubble_trace, bubble_layout)

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.map(x => `OTU ${x} `);

    // Build a Bar Chart
    let bar_trace = [{
      x: sample_values.slice(0,10).reverse(),
      y: yticks.slice(0,10).reverse(),
      text: otu_labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    }];

    let bar_layout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {title: "Number of Bacteria"}
    };
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart
    Plotly.newPlot("bar", bar_trace, bar_layout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let options = data.names; 
    console.log(options);
    // Use d3 to select the dropdown with id of `#selDataset`
    let selector = d3.select("#selDataset")

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < options.length; i++){
      // loop through list and add HTML options that contian sample id
      selector
        .append("option")
        .text(options[i])
        .property("value", options[i]);
        
      };

    // Get the first sample from the list
    let firstItem = options[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstItem);
    buildMetadata(firstItem);
      
      }
    );
  };

// Function for event listener
function optionChanged(newSample) {
  console.log(newSample);
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();