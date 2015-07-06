'use strict';

/* Services */

openFDA.factory('SharedDataSrvc', ['FetchOpenFDASrvc',
function(FetchOpenFDASrvc) {
	 var foundData = false;
	 var tableData;
	 var dataset = 'drug';
     
     function getFoundData(){
    	 return foundData;
     }
     
     function getTableData(){
    	 return tableData;
     }
     
     function setTableData(data){
    	 tableData = data;
     }
     
     function getSelectedDataset(){
    	 return dataset;
     }
     
     function setSelectedDataset(d){
    	 dataset = d; 
     }
     
     function fetchData (params, callback){
    	 		
 		FetchOpenFDASrvc.get(params, function success(response) {
 					
 					
 					if(!response){
 						console.warn("No data found for graph="+$routeParams);
 						callback(null, []);
 					}
 					

 					//console.log("Response Success:" + JSON.stringify(response));
 					
 					callback(null, response);
 					
 					},
 				function error(errorResponse) {
 					console.log("Error:" + JSON.stringify(errorResponse));	
 					callback(errorResponse);
 					//$scope.error.push(errorResponse.data);
 					});
 	}

    
    return {
    	fetchData: fetchData,
    	getFoundData : getFoundData,
    	getTableData : getTableData,
    	setTableData : setTableData,
    	getSelectedDataset : getSelectedDataset,
    	setSelectedDataset : setSelectedDataset
    }

}]);



