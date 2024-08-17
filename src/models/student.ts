import mongoose, { Document, Schema } from 'mongoose';
export interface Student extends Document {
    name: string;
    age: number;
    email: string;
    mobile:number;
    studentClass:string;
    address:string;
    pincode:Number;
    state:string;

  }
  
  const StudentSchema: Schema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    mobile:{type:Number,required:true},
    studentClass:{type: String,required:true},
    address: { type: String, required: true },
    pincode:{type:Number,required:true},
    state: { type: String, required: true },
    
  });
  
  export default mongoose.model<Student>('Student', StudentSchema);