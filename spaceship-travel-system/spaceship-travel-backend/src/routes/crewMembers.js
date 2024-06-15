const express = require('express');
const router = express.Router();
const crewMemberController = require('../controllers/crewMemberController');

router.get('/', crewMemberController.getAllCrewMembers);
router.post('/', crewMemberController.createCrewMember);
router.get('/:id', crewMemberController.getCrewMemberById);
router.put('/:id', crewMemberController.updateCrewMember);
router.patch('/:id', crewMemberController.partialUpdateCrewMember);
router.delete('/:id', crewMemberController.deleteCrewMember);

module.exports = router;
