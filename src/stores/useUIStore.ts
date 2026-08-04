import { create } from 'zustand';
import React from 'react';

export type DialogType = 'confirmation' | 'delete' | 'success' | 'error' | 'warning' | 'info';

export interface DialogConfig {
  isOpen: boolean;
  type: DialogType;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface BottomSheetConfig {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  height?: 'auto' | 'half' | 'full';
}

export interface ModalConfig {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  variant?: 'fullscreen' | 'half' | 'popup';
}

interface UIState {
  // Global Fullscreen Loading
  isGlobalLoading: boolean;
  globalLoadingText?: string;
  setGlobalLoading: (loading: boolean, text?: string) => void;

  // Dialog State
  dialog: DialogConfig;
  openDialog: (config: Omit<DialogConfig, 'isOpen'>) => void;
  closeDialog: () => void;

  // Bottom Sheet State
  bottomSheet: BottomSheetConfig;
  openBottomSheet: (config: Omit<BottomSheetConfig, 'isOpen'>) => void;
  closeBottomSheet: () => void;

  // Modal State
  modal: ModalConfig;
  openModal: (config: Omit<ModalConfig, 'isOpen'>) => void;
  closeModal: () => void;

  // Filter Panel
  isFilterOpen: boolean;
  toggleFilter: () => void;
  setFilterOpen: (open: boolean) => void;

  // Accessibility
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSizeMultiplier: number;
  setFontSizeMultiplier: (multiplier: number) => void;

  // Showcase Demo View State
  isShowcaseOpen: boolean;
  setShowcaseOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isGlobalLoading: false,
  globalLoadingText: undefined,
  setGlobalLoading: (loading, text) =>
    set({ isGlobalLoading: loading, globalLoadingText: text }),

  dialog: {
    isOpen: false,
    type: 'info',
    title: '',
    description: '',
  },
  openDialog: (config) =>
    set({
      dialog: { ...config, isOpen: true },
    }),
  closeDialog: () =>
    set((state) => ({
      dialog: { ...state.dialog, isOpen: false },
    })),

  bottomSheet: {
    isOpen: false,
  },
  openBottomSheet: (config) =>
    set({
      bottomSheet: { ...config, isOpen: true },
    }),
  closeBottomSheet: () =>
    set((state) => ({
      bottomSheet: { ...state.bottomSheet, isOpen: false },
    })),

  modal: {
    isOpen: false,
  },
  openModal: (config) =>
    set({
      modal: { ...config, isOpen: true },
    }),
  closeModal: () =>
    set((state) => ({
      modal: { ...state.modal, isOpen: false },
    })),

  isFilterOpen: false,
  toggleFilter: () => set((state) => ({ isFilterOpen: !state.isFilterOpen })),
  setFilterOpen: (open) => set({ isFilterOpen: open }),

  highContrast: false,
  toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),
  fontSizeMultiplier: 1.0,
  setFontSizeMultiplier: (multiplier) => set({ fontSizeMultiplier: multiplier }),

  isShowcaseOpen: false,
  setShowcaseOpen: (open) => set({ isShowcaseOpen: open }),
}));
