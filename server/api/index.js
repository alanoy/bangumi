const router = require('express').Router()

router.use(require('./data'))
router.use(require('./fav'))
router.use(require('./archives'))

module.exports = router
