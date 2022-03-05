const router = require('express').Router()

const {
    removeReaction,
    createReaction,
    deleteThought,
    updateThought,
    getSingleThought,
    getAllThoughts,
    createThoughts
} = require('../../controllers/thoughts-controller')


router.route('/').get(getAllThoughts)
router.route('/:id').get(getSingleThought).delete(deleteThought).put(updateThought)
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)
router.route('/:thoughtId/reactions').post(createReaction)
router.route('/:userId').post(createThoughts)



module.exports = router 
