openFDA.controller('GraphCtrl', [
		'$scope',
		function($scope ) {
	
	$scope.compareSelected = false;
	
	
	var response = [{label:"Drugs", color: "#97BBCD", data:[75, 15, 10]}, 
	                   {label:"Devices", color: "#F7464A", data:[50,20,30]}, 
	                   {label:"Foods", color: "#FDB45C", data:[60,35,5]}
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