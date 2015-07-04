openFDA.controller('GraphCtrl', [
		'$scope', 'SharedDataSrvc',
		function($scope, SharedDataSrvc ) {
			
	SharedDataSrvc.fetchData('graphVolManCounts');
	
	$scope.compareSelected = false;
	
	
	var response = [{label:"Drugs", color:{ 
	      fillColor: 'rgba(151,187,205,0.8)',
	      strokeColor: 'rgba(151,187,205,1)',
	      highlightFill : 'rgba(151,187,205,1)',
	      highlightStroke: 'rgba(151,187,205,0.8)'
	} 
								
						, data:[75, 15, 10]}, 
	                   {label:"Devices", color: 
	                   { 
	             	      fillColor: 'rgba(247,70,74,0.8)',
	             	      strokeColor: 'rgba(247,70,74,1)',
	             	      highlightFill : 'rgba(247,70,74,1)',
	             	      highlightStroke: 'rgba(247,70,74,0.8)'
	             	} 
	                	   
	                	   
	               , data:[50,20,30]}, 
	                   {label:"Foods", color: { 
		             	      fillColor: 'rgba(253,180,92,0.8)',
		             	      strokeColor: 'rgba(253,180,92,1)',
		             	      highlightFill : 'rgba(253,180,92,1)',
		             	      highlightStroke: 'rgba(253,180,92,0.8)'
		             	} 
	                	   
	                	 , data:[60,35,5]}
	                   ];	
	
    $scope.labels = ["Voluntary", "Mandated", "Unknown"];
    $scope.options = {barValueSpacing : 15};
    var allData = [];
    $scope.allSeries = [];
    var allColors = [];
    response.forEach(function(d){
    	allData.push(d.data);
    	$scope.allSeries.push(d.label); 
    	allColors.push(d.color);
    });
    
    $scope.setchartType = function(type){
    	$scope.chartType = type;
    	$scope.compareSelected = false;
    	
    	if($scope.chartType === 'Bar'){

    		$scope.data = new Array(allData[$scope.allSeries.indexOf($scope.selectedDataset)]);
    		$scope.series = new Array($scope.selectedDataset);
    		$scope.colors = new Array(allColors[$scope.allSeries.indexOf($scope.selectedDataset)]);
    	}
    	else{
    		$scope.data = allData[$scope.allSeries.indexOf($scope.selectedDataset)];    	
    		$scope.colors = allColors;
    	}
    };
    
    
    

    $scope.onClick = function (points, evt) {
      console.log(points, evt);      
    };
    
    $scope.compareDatasets = function(){
    	$scope.compareSelected = !$scope.compareSelected;
    	if($scope.compareSelected){
    		$scope.data = allData;
    		$scope.series = $scope.allSeries;
    		$scope.colors = allColors;

    	}else{
    		$scope.setchartType($scope.chartType);
		}
    };
    
    $scope.setDataset = function(dataset){
    	$scope.selectedDataset = dataset;
    	$scope.graphTitle = $scope.selectedDataset + " Recalls Voluntary Vs Mandated";
    	$scope.setchartType('Bar');
    };
    
    $scope.setDataset ('Drugs');

			

} ]);