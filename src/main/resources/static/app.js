'use strict';

angular.module('app', ['ngStomp'])
// use $stomp in your controllers, services, directives,...
  .controller('Ctrl', function ($stomp, $scope, $log, $http) {


    $scope.messages = [
        {"content": "baa"}
    ];

    $scope.send = function () {
        $http.post('/api/message', {
           "content": $scope.toSend,
           "type": "INFO"
       }).then(function (resp) {
        $log.info('sent');
       });
    };

    $scope.broadcast = function () {
        // Send message
        $stomp.send('/app/broadcast', {
            "content": $scope.toSend,
            "type": "INFO"
        },
        {
          priority: 9,
          custom: 42 // Custom Headers
        });
        $scope.toSend = "";
    }

    $stomp.setDebug(function (args) {
      $log.debug(args)
    })

    var handleMessage = function (msg) {
        $scope.$apply(function () {
            $scope.messages.push(msg);
        });
    };

    $stomp.connect('/websocket', {})
      // frame = CONNECTED headers
      .then(function (frame) {
        var subscription = $stomp.subscribe('/topic/messages', function (payload, headers, res) {
            handleMessage(payload);
        }, {
          'headers': 'are awesome'
        });
//
//        // Unsubscribe
//        subscription.unsubscribe()
//
//        // Send message
//        $stomp.send('/dest', {
//          message: 'body'
//        }, {
//          priority: 9,
//          custom: 42 // Custom Headers
//        })
//
//        // Disconnect
//        $stomp.disconnect(function () {
//          $log.info('disconnected')
//        })
      })
  })
;