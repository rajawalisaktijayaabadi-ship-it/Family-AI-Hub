import React from 'react';
import { AIFamilyAssistantHub } from './AIFamilyAssistantHub';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  return <AIFamilyAssistantHub isOpen={isOpen} onClose={onClose} />;
};

