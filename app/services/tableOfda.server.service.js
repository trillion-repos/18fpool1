'use strict'

var queryService = require("./queryOfda.server.service");
var config = require('./../../config/config');
var logger = require('./../utils/logger.js')(module);
require('./../utils/utils');

module.exports.tableRpf = function (params, callback){
	var response = {};
	var cols = [];
	var datasets = [{name:'drug', displayName:"Drugs"},{name:'device', displayName:"Devices"},{name:'food', displayName:"Foods"}];
	var completeQueries = 0;
	var startYear = params.year ? params.year : (new Date().getFullYear() - 10);
	var endYear = params.year ? new Number(params.year) + 1 : new Number(new Date().getFullYear()) + 1;
	var it =0;
	var tableData = [];
	var dataset;
	var datasetDisplayName;
	
	datasets.forEach(function(d){
		if(d.displayName === params.dataset){
			dataset = d.name;
			datasetDisplayName = d.displayName;
		}
	});

		var query = {
			    queryId: 1,
			    noun:dataset,
			    endpoint:'enforcement',
			    params:{
			      search:'('+params.field.toLowerCase() +':"'+params.value.toLowerCase()+'")+AND+(report_date:['+startYear+'-01-01+TO+'+endYear+'-01-01])',
			      limit:100, //if set to 0, it will default to 1 results
			      skip:0
			    }
			  };

		logger.debug(query);

		queryService.getData(query,function(error,data, query){
			completeQueries++;

			if(error){
				logger.error("ERROR: ", JSON.stringify(error), JSON.stringify(query));
			}

			if(data){
				data = JSON.parse(data);
			}else{
				data = {};
			}

			if(!data.results){
				logger.info("No Results for: " + JSON.stringify(query));
				data.results = [];
			}

			logger.info("RAW DATA COUNT: ", data.results.length);
			//logger.debug("RAW DATA: ", JSON.stringify(data));

			if(data.results.length){
				var column = {};

			}

			data.results.forEach(function(result){

				var d = {};
					for(var header in result){
						if(header.startsWith("@") || result[header] === "openfda")
							continue;

						if(it === 0){ // set headers
							var column = {};
							column['title'] = header.replaceAll("_", " ").capitalize(true);
							column['field'] = header;
							column['filter'] = {};
							column.filter[column['field'] ] = 'text';
							cols.push(column);
						}
						d[header] = result[header];
					}
					tableData.push(d);
					it++;
			});


			logger.debug(dataset, JSON.stringify(tableData));
			logger.debug(JSON.stringify(cols));

			response.title = "Recalls for " + datasetDisplayName;
			response.table = tableData;
			response.columns = cols;

			callback(null, response);
			
		});
	
};
