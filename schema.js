import mongoose from 'mongoose';
const { Schema } = mongoose;

const todosSchema = new Schema({
  title:  String,
  priority: String,
  time: { type: Date },

});

export default  new mongoose.model('todosSchema', todosSchema)