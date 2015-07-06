'use strict'

var queryService = require("./queryOfda.server.service");
var config = require('./../../config/config');

module.exports.graphVolManCounts = function (params, callback){
	var allowedLabels = [];
	var title = ""
	switch (params.field.toLowerCase()) {
	case 'status': 
		allowedLabels = ['ongoing', 'terminated', 'completed'];
		title = "Recalls Status";
		break;
	case 'voluntary_mandated':
		allowedLabels = ['voluntary', 'mandated'];
		title = "Recalls Voluntary Vs Mandated";
		break;
	case 'classification':
		allowedLabels = ['i', 'ii', 'iii'];
		title = "Recalls Classification";
		break;
	default:
		break;
	}
	
	var response = {};
	var graphEntries = [];
	var datasets = [{name:'food', displayName:"Foods", 
		color:{fillColor: 'rgba(151,187,205,0.8)', strokeColor: 'rgba(151,187,205,1)', highlightFill : 'rgba(151,187,205,1)', highlightStroke: 'rgba(151,187,205,0.8)'}},
		{name:'device', displayName:"Devices",
		color:{fillColor: 'rgba(247,70,74,0.8)', strokeColor: 'rgba(247,70,74,1)',highlightFill : 'rgba(247,70,74,1)', highlightStroke: 'rgba(247,70,74,0.8)'} },
		{name:'drug', displayName:"Drugs",
		color:{fillColor: 'rgba(253,180,92,0.8)',strokeColor: 'rgba(253,180,92,1)', highlightFill : 'rgba(253,180,92,1)', highlightStroke: 'rgba(253,180,92,0.8)'
     	}}];
	var completeQueries = 0;
	var labels = [];
	
	var startYear = params.year ? params.year : (new Date().getFullYear() - 10);
	var endYear = params.year ? new Number(params.year) + 1 : new Number(new Date().getFullYear()) + 1;

	datasets.forEach(function(dataset){
		var query = {
			    queryId: 1,
			    noun:dataset.name,
			    endpoint:'enforcement',
			    params:{
			      search:'(report_date:['+startYear+'-01-01+TO+'+endYear+'-01-01])',
			      count:params.field.toLowerCase(),
			      limit:1000, //if set to 0, it will default to 100 results
			      skip:0
			    }
			  };

//				console.log(query);

		queryService.getData(query,function(error,data, query){
			completeQueries++;

			if(error){
				console.error("ERROR: ", JSON.stringify(error), JSON.stringify(query));
			}

			if(data){
				data = JSON.parse(data);
			}else{
				data = {};
			}

			if(!data.results){
				console.log("No Results for: " + JSON.stringify(query));
				data.results = [];
			}
			//console.log("SIZE:" + data.results.length);
			console.log("RAW DATA: ", data);			
			var counts = [];
			var temp = {};
			data.results.forEach(function(result){			
				allowedLabels.forEach(function(label){
					
					if(result.term === label)
						temp[label] = result.count;
					
				});
			});
			
			allowedLabels.forEach(function(label){
				if(temp[label])
					counts.push(temp[label]);
				else
					counts.push(0);
			});
			
			var graphObj = {};
			graphObj.series = dataset.displayName;
			graphObj.color = dataset.color;
			graphObj.data = counts;
				
			graphEntries.push(graphObj); 

			if (completeQueries == datasets.length){
				var response = {};
				response.labels = allowedLabels;
				response.graph = graphEntries; 
				response.title = title;

				console.log('GRAPH RESPONSE: ' + JSON.stringify(response));
				callback(null, response);
			}


		});


	});


};
