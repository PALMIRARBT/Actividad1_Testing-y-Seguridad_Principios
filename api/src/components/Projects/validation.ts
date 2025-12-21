import Joi from 'joi';
import Validation from '../validation';
import { IProjectsModel } from './model';

/**
 * @export
 * @class ProjectsValidation
 * @extends Validation
 */
class ProjectsValidation extends Validation {
  /**
   * @param {IProjectsModel} params
   * @returns {Joi.ValidationResult<IProjectsModel >}
   * @memberof ProjectsValidation
   */
  createProject(params: IProjectsModel): Joi.ValidationResult<IProjectsModel> {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      title: Joi.string().min(1).required(),
      description: Joi.string().allow('').required(),
      version: Joi.string().allow('').required(),
      link: Joi.string().allow('').optional(),
      tag: Joi.string().allow('').optional(),
  timestamp: Joi.alternatives().try(Joi.number(), Joi.string().regex(/^\d+$/)).required(),
      password: Joi.string().min(1).required()
    });

    return schema.validate(params);
  }

  /**
   * @param {{ id: string }} body
   * @returns {Joi.ValidationResult<{ id: string }>}
   * @memberof ProjectsValidation
   */
  getProject(body: { id: string }): Joi.ValidationResult<{
    id: string;
  }> {
    const schema: Joi.ObjectSchema = Joi.object({
      id: Joi.string().length(24).hex().required()
    });
    return schema.validate(body);
  }

  /**
   * @param {{ id: string }} body
   * @returns {Joi.ValidationResult<{ id: string }>}
   * @memberof ProjectsValidation
   */
  removeProject(body: { id: string }): Joi.ValidationResult<{
    id: string;
  }> {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      id: this.customJoi.objectId().required()
    });

    return schema.validate(body);
  }
}

export default new ProjectsValidation();
