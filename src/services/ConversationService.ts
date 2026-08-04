import { ConversationRepository } from '../repositories/ConversationRepository';
import { ConversationModel, MessageModel, PromptCategory } from '../types/ai';

export class ConversationService {
  public static getAllConversations(): ConversationModel[] {
    return ConversationRepository.getConversations();
  }

  public static getActiveConversations(): ConversationModel[] {
    return this.getAllConversations().filter((c) => !c.isArchived);
  }

  public static getArchivedConversations(): ConversationModel[] {
    return this.getAllConversations().filter((c) => c.isArchived);
  }

  public static getFavoriteConversations(): ConversationModel[] {
    return this.getAllConversations().filter((c) => c.isFavorite);
  }

  public static getMessages(conversationId: string): MessageModel[] {
    return ConversationRepository.getMessages(conversationId);
  }

  public static createNewConversation(
    title: string,
    category: PromptCategory | 'Umum' = 'Umum'
  ): ConversationModel {
    return ConversationRepository.createConversation(title, category);
  }

  public static renameConversation(id: string, newTitle: string): ConversationModel | null {
    return ConversationRepository.updateConversation(id, { title: newTitle });
  }

  public static togglePinConversation(id: string): ConversationModel | null {
    const conversations = this.getAllConversations();
    const conv = conversations.find((c) => c.id === id);
    if (!conv) return null;
    return ConversationRepository.updateConversation(id, { isPinned: !conv.isPinned });
  }

  public static toggleFavoriteConversation(id: string): ConversationModel | null {
    const conversations = this.getAllConversations();
    const conv = conversations.find((c) => c.id === id);
    if (!conv) return null;
    return ConversationRepository.updateConversation(id, { isFavorite: !conv.isFavorite });
  }

  public static archiveConversation(id: string): ConversationModel | null {
    const conversations = this.getAllConversations();
    const conv = conversations.find((c) => c.id === id);
    if (!conv) return null;
    return ConversationRepository.updateConversation(id, { isArchived: !conv.isArchived });
  }

  public static deleteConversation(id: string): void {
    ConversationRepository.deleteConversation(id);
  }

  public static addMessage(conversationId: string, message: MessageModel): void {
    const messages = this.getMessages(conversationId);
    const updatedMessages = [...messages, message];
    ConversationRepository.saveMessages(conversationId, updatedMessages);

    // Update conversation meta info
    ConversationRepository.updateConversation(conversationId, {
      lastMessageText: message.text,
      messageCount: updatedMessages.length,
    });
  }

  public static updateMessage(
    conversationId: string,
    messageId: string,
    newText: string
  ): MessageModel[] {
    const messages = this.getMessages(conversationId);
    const updated = messages.map((m) =>
      m.id === messageId ? { ...m, text: newText, metadata: { ...m.metadata, isEdited: true } } : m
    );
    ConversationRepository.saveMessages(conversationId, updated);
    return updated;
  }

  public static deleteMessage(conversationId: string, messageId: string): MessageModel[] {
    const messages = this.getMessages(conversationId);
    const filtered = messages.filter((m) => m.id !== messageId);
    ConversationRepository.saveMessages(conversationId, filtered);
    return filtered;
  }
}
