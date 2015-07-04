'use strict';

/* Services */

openFDA.factory('SharedDataSrvc', ['FetchOpenFDASrvc',
function(FetchOpenFDASrvc) {
	 var graphData;
	 var view;
	 var foundData = false;
	 var tableData;
	 var currentYear;
	 var mapData;
	 var fillKey;
	 var currentState;
	 var dataset = 'drug';

	 
     function getGraphData() {
        return graphData;
    }
     
     function getView(){
    	 return view;
     }
     
     function setView(v){
    	 console.log("Set View: " + v);
    	 view = v;
     }
     
     function getFoundData(){
    	 return foundData;
     }
     
     function getTableData(){
    	 return tableData;
     }
     
     function removeTableData(){
    	 tableData = {};
     }
     
     function getYear(){
    	 return currentYear;
     }
     
     function getFillKey(){
    	 return fillKey;
     }
     
     function getState(){
    	 return currentState;
     }
     
     function clearGraph(){
    	 foundData = false;
    	 graphData = {};
     }
     
     function getSelectedDataset(){
    	 return dataset;
     }
     
     function setSelectedDataset(d){
    	 dataset = d; 
     }
     
     function fetchData (qId){		
 		
 		
 		FetchOpenFDASrvc.get({qId: qId}, function success(response) {
 					
 					
 					if(!response){
 						console.warn("No data found for graph=" + qId);
 						return;
 					}
 					

 					//console.log("Response Success:" + JSON.stringify(response));
 					
 					if(response.graph){
	 					graphData = {};					
	 					graphData.data = response.graphData;
	 					graphData.title = response.graphTitle;
	 					graphData.labels = response.graphLabels;
	 					}
 					
 					if(response.table){
 						tableData = {};
 						tableData.title = response.tableTitle;
 						tableData.columns = response.columns;
 						tableData.data = response.table;

 					}
 					
 					},
 				function error(errorResponse) {
 					console.log("Error:" + JSON.stringify(errorResponse));				
 					//$scope.error.push(errorResponse.data);
 					});
 	}

    
    return {
    	fetchData: fetchData,
    	getGraphData : getGraphData,
    	getView: getView,
    	setView: setView,
    	getFoundData : getFoundData,
    	getTableData : getTableData,
    	getYear : getYear,
    	removeTableData : removeTableData,
    	getFillKey : getFillKey,
    	getState : getState,
    	clearGraph : clearGraph,
    	getSelectedDataset : getSelectedDataset,
    	setSelectedDataset : setSelectedDataset
    }

}]);



