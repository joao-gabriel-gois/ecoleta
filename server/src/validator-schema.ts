import { Joi, Segments } from 'celebrate';

const regex = /^[1-6](,[1-6])*$/;

const keysOptions = {
   // image is not here, so in case it is not uploaded
   // PointsController.create will return a string and it will
   // gerenarate a validation error. Web front end will ignore
   // it's message and return to user that image upload is required
   name: Joi.string().required(),
   email: Joi.string().required().email(),
   whatsapp: Joi.number().required().min(8),
   latitude: Joi.number().min(2).required(),
   longitude: Joi.number().min(2).required(),
   city: Joi.string().min(2).required(),
   uf: Joi.string().required().min(2).max(2),
   items: Joi.string().required().max(11).regex(regex),
}

const options = [
   {
      [Segments.BODY]: Joi.object().keys(keysOptions)
   }, {
      abortEarly: false
   }
]

export default options;
