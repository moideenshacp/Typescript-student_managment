"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.updateStudent = exports.editLoad = exports.deleteStudent = exports.studentDetails = exports.addStudent = exports.loadAddStudent = exports.loadDashboard = exports.loadHome = exports.verifyLogin = exports.loadLogin = void 0;
const student_1 = __importDefault(require("../models/student"));
//load login
const loadLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('login');
    }
    catch (error) {
        console.error('Error rendering login page:', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.loadLogin = loadLogin;
//verify login
const verifyLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            res.redirect('/home');
        }
        else {
            res.render('login', { message: 'Invalid email or password' });
        }
    }
    catch (error) {
        console.error('Error verifying login:', error);
    }
});
exports.verifyLogin = verifyLogin;
//load home
const loadHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('home', { adminName: process.env.ADMIN_NAME, adminEmail: process.env.ADMIN_EMAIL, adminMobile: process.env.ADMIN_MOBILE });
    }
    catch (error) {
        console.log(error);
    }
});
exports.loadHome = loadHome;
//load dashboard
const loadDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allStudents = yield student_1.default.find();
        res.render('dashboard', { allStudents });
    }
    catch (error) {
        console.log(error);
    }
});
exports.loadDashboard = loadDashboard;
//add student load
const loadAddStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('addStudent');
    }
    catch (error) {
        console.log(error);
    }
});
exports.loadAddStudent = loadAddStudent;
//add student
const addStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, email, mobile, address, pincode, state, studentClass } = req.body;
        const emailRegex = /^[A-Za-z0-9.%+-]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
            return res.render('addStudent', { message: 'Invalid email provided' });
        }
        const checkEmail = yield student_1.default.findOne({ email: email });
        if (checkEmail) {
            return res.render('addStudent', { message: 'Email already exists' });
        }
        if (!name.trim() || !/^[a-zA-Z][a-zA-Z\s]*$/.test(name)) {
            return res.render('addStudent', { message: 'Invalid name provided' });
        }
        if (!address.trim() || !/^[a-zA-Z][a-zA-Z\s]*$/.test(address)) {
            return res.render('addStudent', { message: 'Invalid address provided' });
        }
        if (!state.trim() || !/^[a-zA-Z][a-zA-Z\s]*$/.test(state)) {
            return res.render('addStudent', { message: 'Invalid state provided' });
        }
        if (!age || !/^\d+$/.test(age) || Number(age) <= 0 || Number(age) >= 100) {
            return res.render('addStudent', { message: 'Invalid age provided' });
        }
        if (!mobile || !/^\d{10}$/.test(mobile)) {
            return res.render('addStudent', { message: 'Invalid mobile number provided' });
        }
        if (!pincode || !/^\d{6}$/.test(pincode)) {
            return res.render('addStudent', { message: 'Invalid pincode provided' });
        }
        if (!studentClass || !/[A-Za-z]/.test(studentClass) || !/\d/.test(studentClass)) {
            return res.render('addStudent', { message: 'Invalid student class provided' });
        }
        const newStudent = new student_1.default({
            name,
            age,
            email,
            mobile,
            address,
            pincode,
            state,
            studentClass
        });
        yield newStudent.save();
        console.log('Student added successfully');
        res.redirect('/dashboard');
    }
    catch (error) {
        console.log(error);
    }
});
exports.addStudent = addStudent;
//view full details of students
const studentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const student = yield student_1.default.findById(id);
        console.log(id, '==========================');
        if (id) {
            res.render('studentDetails', { student });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.studentDetails = studentDetails;
//delete the student
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        yield student_1.default.deleteOne({ _id: id });
        res.redirect('/dashboard');
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteStudent = deleteStudent;
//edit load
const editLoad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const student = yield student_1.default.findById(id);
        res.render('editStudent', { student });
    }
    catch (error) {
        console.log(error);
    }
});
exports.editLoad = editLoad;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, email, mobile, address, pincode, state, studentClass, id } = req.body;
        const emailRegex = /^[A-Za-z0-9.%+-]+@gmail\.com$/;
        const existingStudent = yield student_1.default.findById(id);
        if (!existingStudent) {
            return res.render('editStudent', { message: 'Student not found' });
        }
        if (email !== existingStudent.email) {
            if (!emailRegex.test(email)) {
                return res.render('editStudent', { message: 'Invalid email provided', student: existingStudent });
            }
            const checkEmail = yield student_1.default.findOne({ email: email });
            if (checkEmail) {
                return res.render('editStudent', { message: 'Email already exists', student: existingStudent });
            }
        }
        if (!name.trim() || !/^[a-zA-Z][a-zA-Z\s]*$/.test(name)) {
            return res.render('editStudent', { message: 'Invalid name provided', student: existingStudent });
        }
        if (!address.trim() || !/^[a-zA-Z][a-zA-Z\s]*$/.test(address)) {
            return res.render('editStudent', { message: 'Invalid address provided', student: existingStudent });
        }
        if (!state.trim() || !/^[a-zA-Z][a-zA-Z\s]*$/.test(state)) {
            return res.render('editStudent', { message: 'Invalid state provided', student: existingStudent });
        }
        if (!age || !/^\d+$/.test(age) || Number(age) <= 0 || Number(age) >= 100) {
            return res.render('editStudent', { message: 'Invalid age provided', student: existingStudent });
        }
        if (!mobile || !/^\d{10}$/.test(mobile)) {
            return res.render('editStudent', { message: 'Invalid mobile number provided', student: existingStudent });
        }
        if (!pincode || !/^\d{6}$/.test(pincode)) {
            return res.render('editStudent', { message: 'Invalid pincode provided', student: existingStudent });
        }
        if (!studentClass || !/[A-Za-z]/.test(studentClass) || !/\d/.test(studentClass)) {
            return res.render('addStudent', { message: 'Invalid student class provided' });
        }
        yield student_1.default.findByIdAndUpdate(id, { name, age, email, mobile, studentClass, address, pincode, state });
        res.redirect('/dashboard');
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateStudent = updateStudent;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.redirect('/login');
    }
    catch (error) {
        console.log(error);
    }
});
exports.logout = logout;
