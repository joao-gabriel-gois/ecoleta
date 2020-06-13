import React from 'react';
import { filteringValidationArray, getCurrentValidationMessage } from '../../utils/validation-utils';

import './styles.css';

interface ValidationError {
   validation: {
       keys: string[],
   },
   message: string
}

interface Props {
   centered: boolean,
   customMessage: boolean,
   fieldName: string,
   validationErrors: ValidationError,
   message: string
}

const ValidationMessageParagraph: React.FC<Props> = (Props) => {
   const { fieldName, validationErrors, message, centered, customMessage } = Props;

   return (customMessage ? 
            <p
               className={
                  `validation-errors ${
                     centered ? 'centered-validation-message':''
                  }`
               }
               children={
                  !!validationErrors && (filteringValidationArray(fieldName, validationErrors) === fieldName) ?
                  message : ''
               }
            />
         : //else
            <p
               className={
                  `validation-errors ${
                     centered ? 'centered-validation-message':''
                  }`
               }
               children={
                  !!validationErrors && (filteringValidationArray(fieldName, validationErrors) === fieldName) ?
                  getCurrentValidationMessage(fieldName, message, validationErrors) : ''
               }
            />
         )
}

export default ValidationMessageParagraph;