import { Router } from 'express';
import * as studentController from '../controllers/studentController';

const router = Router();



// router.get('/students', studentController.getStudents);

router.get('/login',studentController.loadLogin)
router.post('/login',studentController.verifyLogin)

router.get('/home',studentController.loadHome)
router.get('/dashboard',studentController.loadDashboard)

router.get('/addStudent',studentController.loadAddStudent)
router.post('/addStudent',studentController.addStudent)

router.get('/studentDetails',studentController.studentDetails)
router.get('/delete',studentController.deleteStudent)
router.get('/edit',studentController.editLoad)
router.post('/edit',studentController.updateStudent)
router.get('/logout',studentController.logout)


export default router;