const express = require('express');
const router = express.Router();
const crewMemberController = require('../controllers/crewMemberController');
const authMiddleware = require('../utils/jwt/authMiddleware');

router.get('/', authMiddleware, crewMemberController.getAllCrewMembers);
router.get('/:id', authMiddleware, crewMemberController.getCrewMemberById);
router.post('/', authMiddleware, crewMemberController.createCrewMember);
router.put('/:id', authMiddleware, crewMemberController.updateCrewMember);
router.patch('/:id', authMiddleware, crewMemberController.partialUpdateCrewMember);
router.delete('/:id', authMiddleware, crewMemberController.deleteCrewMember);

module.exports = router;
