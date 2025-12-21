import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  version: string;
  link: string;
  tag: string;
  timestamp: number;
  password: string;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  version: { type: String, required: true },
  link: { type: String, required: false },
  tag: { type: String, required: false },
  timestamp: { type: Number, required: true },
  password: { type: String, required: true }
});

const ProjectModel = mongoose.model<IProject>('Project', ProjectSchema);
export default ProjectModel;
