module.exports = function(RED) {
  "use strict";
  /*import dependencies*/
  var IPCamera = require('ipcam-controller');
  var camera = new IPCamera();

  function ipcamPtz(config) {
    camera.createCamera(config.name,config.type,config);
    RED.nodes.createNode(this,config);
    var node = this;
    this.on('input', function(msg) {
      var action = config.action;
      switch (action) {
        case 'left':
        camera.moveLeftFor(config.duration).then(function(){
          node.send(msg);
        });
        break;
        default:
        break;
      }
    });
  }

  RED.nodes.registerType("ipcam-ptz",ipcamPtz);

}
