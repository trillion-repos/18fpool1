openFDA.controller('GraphCtrl', [
		'$scope', 'SharedDataSrvc',
		function($scope, SharedDataSrvc ) {
		
		
	$scope.options = {barValueSpacing : 15};
    var allData = [];
    var response = [];
    var allColors = [];
    var title = "";
    $scope.dataFields = ['Classification', 'Status', 'Voluntary Mandated'];
    
    
    
    $scope.load = function (queryType){
        allData = [];
        response = [];
        $scope.allSeries = [];
        allColors = [];
    	$scope.selectedDataField = queryType;
    	queryType = queryType.toLowerCase().replace(" ", "_");
    	
		SharedDataSrvc.fetchData('graphVolManCounts', queryType, function(error, r){
			if(error){
				console.error(JSON.stringify(error));
				return;
			}
			console.log("Success Response: ", JSON.stringify(r.graph));
			response = r.graph;
			$scope.labels = [];
			r.labels.forEach(function(label){
				if(queryType !== 'classification'){
					$scope.labels =  r.labels;
					return;
				}
				else
					$scope.labels.push("Class " + label);
			});
			title = r.title;
			
			response.forEach(function(d){
		    	allData.push(d.data);
		    	$scope.allSeries.push(d.series); 
		    	allColors.push(d.color);
		    });
			
			$scope.setDataset (r.graph[0].series);
			
		});
		
		
		$scope.compareSelected = false;
	
    }
	
    $scope.load($scope.dataFields[0]);
	
	/*response = [{series:"Drugs", color:{ 
	      fillColor: 'rgba(151,187,205,0.8)',
	      strokeColor: 'rgba(151,187,205,1)',
	      highlightFill : 'rgba(151,187,205,1)',
	      highlightStroke: 'rgba(151,187,205,0.8)'
	} 
								
						, data:[75, 15, 10]}, 
	                   {series:"Devices", color: 
	                   { 
	             	      fillColor: 'rgba(247,70,74,0.8)',
	             	      strokeColor: 'rgba(247,70,74,1)',
	             	      highlightFill : 'rgba(247,70,74,1)',
	             	      highlightStroke: 'rgba(247,70,74,0.8)'
	             	} 
	                	   
	                	   
	               , data:[50,20,30]}, 
	                   {series:"Foods", color: { 
		             	      fillColor: 'rgba(253,180,92,0.8)',
		             	      strokeColor: 'rgba(253,180,92,1)',
		             	      highlightFill : 'rgba(253,180,92,1)',
		             	      highlightStroke: 'rgba(253,180,92,0.8)'
		             	} 
	                	   
	                	 , data:[60,35,5]}
	                   ];*/	
	
    
    
    
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
    		$scope.graphTitle = title;
    	}else{
    		$scope.graphTitle = $scope.selectedDataset + " " + title;
    		$scope.setchartType($scope.chartType);
		}
    };
    
    $scope.setDataset = function(dataset){
    	$scope.selectedDataset = dataset;
    	$scope.graphTitle = $scope.selectedDataset + " " + title;
    	$scope.setchartType($scope.chartType  || 'Bar');
    };
    
    

			

} ]);