import { Request, Response } from 'express';
import Student from '../models/student';
import { request } from 'http';
import { promises } from 'dns';



//load login

export const loadLogin = async (req:Request,res:Response):Promise<void>=>{
  try {
    res.render('login')
  } catch (error) {
    console.error('Error rendering login page:', error);
    res.status(500).send('Internal Server Error');    
  }
}


//verify login

export const verifyLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      res.redirect('/home');
    } else {
      res.render('login', { message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error verifying login:', error);
  }
};

//load home

export const loadHome= async (req:Request,res:Response):Promise<void>=>{
  try {
    res.render('home',{adminName:process.env.ADMIN_NAME,adminEmail:process.env.ADMIN_EMAIL,adminMobile:process.env.ADMIN_MOBILE})
  } catch (error) {
    console.log(error);
    
  }
}

//load dashboard
export const loadDashboard = async (req:Request,res:Response):Promise<void>=>{
  try {
    const allStudents = await Student.find()

    res.render('dashboard',{allStudents})
  } catch (error) {
    console.log(error);
    
  }
}

//add student load
 
export const loadAddStudent = async(req:Request,res:Response):Promise<void>=>{
  try {
    res.render('addStudent')
  } catch (error) {
    console.log(error);
    
  }
}

//add student
export const addStudent = async (req:Request,res:Response):Promise<void>=>{
  try {
    const {name,age,email,mobile,address,pincode,state,studentClass} = req.body

    const emailRegex = /^[A-Za-z0-9.%+-]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
            return res.render('addStudent', { message: 'Invalid email provided' });
        }

    const checkEmail = await Student.findOne({email:email})

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
  

    const newStudent = new Student({
      name,
      age,
      email,
      mobile,
      address,
      pincode,
      state,
      studentClass
    });

    await newStudent.save();
    console.log('Student added successfully');
    res.redirect('/dashboard');
    
  } catch (error) {
    console.log(error);
    
  }
}

//view full details of students

export const studentDetails = async(req:Request,res:Response):Promise<void>=>{
  try {

    const id = req.query.id;
    const student = await Student.findById(id)
    console.log(id,'==========================');
    if(id){
      res.render('studentDetails',{student})
    }
    
  } catch (error) {
    console.log(error);
    
  }
}

//delete the student

export const deleteStudent = async(req:Request,res:Response):Promise<void>=>{
  try {
    const id = req.query.id
    await Student.deleteOne({_id:id})
    res.redirect('/dashboard')   

  } catch (error) {
    console.log(error);
    
  }
}


//edit load

export const editLoad = async(req:Request,res:Response):Promise<void>=>{

  try {
    const id = req.query.id;
    const student = await Student.findById(id)
    res.render('editStudent',{student})
    
  } catch (error) {
    console.log(error);
    
  }
}

export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, age, email, mobile, address, pincode, state, studentClass, id } = req.body;
    
    const emailRegex = /^[A-Za-z0-9.%+-]+@gmail\.com$/;

    const existingStudent = await Student.findById(id);

    if (!existingStudent) {
      return res.render('editStudent', { message: 'Student not found' });
    }

    if (email !== existingStudent.email) {
      if (!emailRegex.test(email)) {
        return res.render('editStudent', { message: 'Invalid email provided', student: existingStudent });
      }

      const checkEmail = await Student.findOne({ email: email });

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

    await Student.findByIdAndUpdate(id, {name,age,email,mobile,studentClass,address,pincode,state});

    res.redirect('/dashboard');

  } catch (error) {
    console.log(error);
  }
};

export const logout = async(req:Request,res:Response):Promise<void>=>{
  try {
    res.redirect('/login')
  } catch (error) {
    console.log(error);
    
  }
}