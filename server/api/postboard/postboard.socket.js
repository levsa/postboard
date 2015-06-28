/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Postboard = require('./postboard.model');

exports.register = function(socket) {
  Postboard.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Postboard.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('postboard:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('postboard:remove', doc);
}