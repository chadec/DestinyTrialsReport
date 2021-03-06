'use strict';

function setUser(currentAccount, name, platform) {
  return currentAccount.getAccount(name, platform)
    .then(function (player) {
      return [player];
    });
}

function getFromParams(currentAccount, $route) {
  if (angular.isDefined($route.current.params.playerName)) {
    var platform = $route.current.params.platform === 'xbox' ? 1 : 2;
    return setUser(currentAccount, $route.current.params.playerName, platform);
  }
}

function getAllFromParams($http, $route) {
  if (angular.isDefined($route.current.params.playerOne)) {
    var platform = $route.current.params.platform === 'xbox' ? 1 : 2;
    var params = $route.current.params;
    return $http({
      method: 'GET',
      url: 'http://api.destinytrialsreport.com/getAccounts/' + platform + '/' + params.playerOne + '/' + params.playerTwo + '/' + params.playerThree
    }).then(function (players) {
      return [players.data];
    });
  }
}

function checkStatus($http) {
  return $http({
    method: 'GET',
    url: 'http://api.destinytrialsreport.com/GlobalAlerts'
  }).then(function (result) {
    if(result.data.length > 0){
      return result.data[0].AlertHtml;
    }
  });
}

angular
  .module('trialsReportApp', [
    'ngAnimate', 'ngCookies',
    'ngResource', 'ngRoute',
    'ngSanitize', 'ngTouch',
    'ui.bootstrap', 'angular-loading-bar',
    'angulartics', 'angulartics.google.analytics',
    'LocalStorageModule', 'toastr',
    'angularHelpOverlay', 'angular.filter',
    'picardy.fontawesome', 'timer'
  ]).config(window.$QDecorator)
  .factory('requestUrl', function () {
    return {
      url: '/bungie/'
    };
  })
  .config(function ($routeProvider, $httpProvider, $compileProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          fireTeam: checkStatus
        }
      })
      .when('/:platform/:playerName', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          fireTeam: getFromParams
        }
      })
      .when('/:platform/:playerOne/:playerTwo/:playerThree', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          fireTeam: getAllFromParams
        }
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $httpProvider.useApplyAsync(true);
    $compileProvider.debugInfoEnabled(false);
  }).service('locationChanger', ['$location', '$route', '$rootScope', function ($location, $route, $rootScope) {

    this.skipReload = function () {
      var lastRoute = $route.current;
      $rootScope.$on('$locationChangeSuccess', function () {
        if (angular.isUndefined($route.current.params.playerName)){
          $route.current = lastRoute;
        }
      });
      return this;
    };

    this.withoutRefresh = function (url, doesReplace) {
      if(doesReplace){
        $location.path(url).replace();
      }
      else {
        $location.path(url || '/');
      }
    };
  }]);
