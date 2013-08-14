// controller for the boostrap dialog
function AlertDialogController($scope, dialog, message){
    $scope.message = message;
    
    $scope.close = function(){
        dialog.close();
    };
}