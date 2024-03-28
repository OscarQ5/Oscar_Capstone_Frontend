import React from 'react';
import '../Styles/MedicalConfirmationModal.css'

const MedicalConfirmationModal = ({ isOpen, onClose, onConfirm, handleVillageClick }) => {
  if (!isOpen) return null;

  const handleConfirmation = () => {
    handleVillageClick(); 
    onConfirm(); 
};
const handleDecline = () => {
    handleVillageClick(); 
    onClose(); 
};

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Include Personal Medical Information?</h2>
        <p>Do you want to include your Personal Medical Information?</p>
        <div className="modal-buttons">
          <button onClick={handleConfirmation}>Yes</button>
          <button onClick={handleDecline}>No</button>
        </div>
      </div>
    </div>
  );
};

export default MedicalConfirmationModal;