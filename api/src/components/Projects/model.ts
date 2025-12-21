import mongoose, { Document, Schema, Types } from 'mongoose';

/**
 * @export
 * @interface IProjectsRequest
 */
export interface IProjectsRequest {
  id: string;
  title: string;
}


/**
 * @export
 * @interface IProjectsModel
 * @extends {Document}
 */
export interface IProjectsModel extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  version: string;
  link: string;
  tag: string;
  timestamp: number;
  password: string;
}

export type AuthToken = {
  accessToken: string;
  kind: string;
};

const ProjectsSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    version: { type: String, required: true },
    link: { type: String, required: false },
    tag: { type: String, required: false },
    timestamp: { type: Number, required: true },
    password: { type: String, required: true }
  },
  {
    collection: 'projects',
    versionKey: false
  }
);

export default mongoose.model('ProjectsModel', ProjectsSchema);
