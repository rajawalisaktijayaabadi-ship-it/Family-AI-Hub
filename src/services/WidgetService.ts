import { WidgetModel } from '../types/dashboard';
import { WidgetRepository } from '../repositories/WidgetRepository';

export class WidgetService {
  static getAllWidgets(): WidgetModel[] {
    return WidgetRepository.getWidgets();
  }

  static saveWidgets(widgets: WidgetModel[]): WidgetModel[] {
    WidgetRepository.saveWidgets(widgets);
    return widgets;
  }

  static toggleWidgetVisibility(id: string): WidgetModel[] {
    const current = WidgetRepository.getWidgets();
    const updated = current.map((w) =>
      w.id === id ? { ...w, isVisible: !w.isVisible } : w
    );
    WidgetRepository.saveWidgets(updated);
    return updated;
  }

  static toggleWidgetPin(id: string): WidgetModel[] {
    const current = WidgetRepository.getWidgets();
    const updated = current.map((w) =>
      w.id === id ? { ...w, isPinned: !w.isPinned } : w
    );
    WidgetRepository.saveWidgets(updated);
    return updated;
  }

  static reorderWidgets(startIndex: number, endIndex: number): WidgetModel[] {
    const current = [...WidgetRepository.getWidgets()];
    const [removed] = current.splice(startIndex, 1);
    current.splice(endIndex, 0, removed);
    const updated = current.map((w, idx) => ({ ...w, order: idx + 1 }));
    WidgetRepository.saveWidgets(updated);
    return updated;
  }

  static resetWidgets(): WidgetModel[] {
    return WidgetRepository.resetToDefault();
  }
}
