const express = require ('express');
const router = express.Router();
const biblioteca_controller = require('../controller/biblioteca.controller.js');

router.get('/', biblioteca_controller.getBooks);
router.post('/', biblioteca_controller.addBook);
router.put('/:isbn', biblioteca_controller.updateBook);
router.delete('/:isbn', biblioteca_controller.deleteBook);

module.exports = router;