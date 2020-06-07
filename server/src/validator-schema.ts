import { Joi } from 'celebrate';

const keysOptions = {
   name: Joi.string().required(),
   email: Joi.string().required().email(),
   whatsapp: Joi.number().required().min(8).max(14),
   latitude: Joi.number().required(),
   longitude: Joi.number().required(),
   uf: Joi.string().required().min(2).max(2),
   items: Joi.string().required().max(11).regex(/^[1-6](,[1-6])*$/g),
}

const options = [
   {
      body: Joi.object().keys(keysOptions)
   }, {
      abortEarly: false
   }
]

export default options;
