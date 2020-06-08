import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'

import './styles.css';

interface Props {
   showState: boolean
 }

const SuccessModal: React.FC<Props> = ({showState}) => {

   return (
      <div className={`modal-container ${showState ? 'show' : ''}`}>
         <FaCheckCircle />
         <p>Cadastro concluído!</p>
      </div>
   )
}

export default SuccessModal;
