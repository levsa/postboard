'use strict';

var express = require('express');
var controller = require('./postboard.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.createUploadHandler, controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/:id/notes/', controller.indexNotes);
router.get('/:id/notes/:noteId', controller.showNote);

router.put('/:id/notes/:noteId', controller.updateNote);

module.exports = router;
