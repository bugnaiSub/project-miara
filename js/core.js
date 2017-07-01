var guroApp = angular.module('guroApp', ['ngRoute']);

guroApp.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : '../pages/dashboard.html',
		controller	: 'mainController'
	})
	.when('/lesson-plan', {
		templateUrl : '../pages/lesson-plan.html',
		controller  : 'lessonPlanController'
	})
	.when('/class-record', {
		templateUrl : '../pages/class-record.html',
		controller  : 'classRecordController'
	})
	.when('/class-activity', {
		templateUrl : '../pages/class_activity.html',
		controller  : 'classActivityController'
	});
});

guroApp.controller('mainController', function($scope) {

});

guroApp.controller('lessonPlanController', function($scope) {
	$scope.editMode = false;
	$scope.message = 'Your lesson plan';
	$scope.lessonPlans = angular.copy(lessonPlans);

	$scope.toggleEdit = function() {
		$scope.editFlag = !$scope.editFlag;
	}

	$scope.saveLesson = function() {
		var lesson = {
			'mainTopic': $scope.mainTopic,
			'subTopic' : $scope.subTopic,
			'details' : $scope.details,
			'methodology' : $scope.methodology
		}

		if ($scope.editMode === true) {
			// TODO: persist via http call
			lesson.id = $scope.lessonId;
			$scope.lessonPlans[getLessonPlanIndex($scope.lessonId)] = lesson;
		} else {
			// TODO: persist via http call and retrieve id
			lesson.id = $scope.lessonPlans[$scope.lessonPlans.length - 1].id + 1;
			$scope.lessonPlans.unshift(lesson);
		}

		$scope.clearForm();
		$('#lessonPlanModal').modal('hide');
	}

	$scope.clearForm = function() {
		$scope.editMode = false;
		$scope.lessonId = null;
		$scope.mainTopic = '';
		$scope.subTopic = '';
		$scope.details = '';
		$scope.methodology = '';
	}

	$scope.editLesson = function(idx) {
		var lessonPlan = $scope.lessonPlans[idx];
		$scope.mainTopic = lessonPlan.mainTopic;
		$scope.subTopic = lessonPlan.subTopic;
		$scope.details = lessonPlan.details;
		$scope.methodology = lessonPlan.methodology;
		$scope.lessonId = lessonPlan.id;
		$scope.editMode = true;
		$('#lessonPlanModal').modal('show');
	}

	$scope.confirmDeleteLesson = function(idx) {
		$scope.lessonId = $scope.lessonPlans[idx].id;
		$('#deleteLessonPlanModal').modal('show');
	}

	$scope.deleteLesson = function(idx) {
		$scope.lessonPlans.splice(idx, 1);
		$('#deleteLessonPlanModal').modal('hide');
	}

	function getLessonPlanIndex(lessonId) {
		for (var i=0; i < $scope.lessonPlans.length; i++) {
			if ($scope.lessonPlans[i].id == lessonId) {
				return i;
			}
		}
	}
});

guroApp.controller('classRecordController', function($scope) {
	$scope.students = angular.copy(students);
	$scope.classes = angular.copy(classes);
	$scope.message = 'Class Record';
});

guroApp.controller('classActivityController', function($scope) {
	$scope.message = 'Class Activity';
});