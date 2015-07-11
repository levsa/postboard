/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var PostboardSheet = require('./postboard.model').PostboardSheet;

exports.register = function(socket) {
  PostboardSheet.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  PostboardSheet.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('postboard:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('postboard:remove', doc);
}
