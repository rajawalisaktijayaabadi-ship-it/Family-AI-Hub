import { AvatarModel, AvatarStyle, AvatarTheme } from '../types/memories';

export class MockAvatarService {
  static generateAvatarPreview(
    memberName: string,
    style: AvatarStyle,
    theme: AvatarTheme
  ): string {
    const styleMap: Record<AvatarStyle, string> = {
      '3D Pixar': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      Anime: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      Realism: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      Cartoon: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      Cyberpunk: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    };

    return styleMap[style] || styleMap['3D Pixar'];
  }

  static generateAvatarGreeting(memberName: string, avatar: AvatarModel): string {
    return `Halo! Saya adalah AI Avatar resmi dari ${memberName}. Gaya saya ${avatar.style} dengan tema ${avatar.theme}. Kepribadian saya: "${avatar.personality}". Siap menemani obrolan keluarga!`;
  }
}
