import React, { useState } from 'react';
import { AppPhase, AuthScreen, MainTab } from './types/navigation';
import { ThemeProvider } from './providers/ThemeProvider';
import { LanguageProvider } from './providers/LanguageProvider';
import { OfflineProvider } from './providers/OfflineProvider';
import { AuthProvider, useAuth } from './providers/AuthProvider';
import { AppShell } from './components/layout/AppShell';
import { TopAppBar } from './components/layout/TopAppBar';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { FloatingAIButton } from './components/layout/FloatingAIButton';
import { PageTransition } from './components/animation/Animations';
import { SplashScreen } from './features/splash/SplashScreen';
import { OnboardingScreen } from './features/onboarding/OnboardingScreen';
import { LoginScreen } from './features/auth/LoginScreen';
import { RegisterScreen } from './features/auth/RegisterScreen';
import { ForgotPasswordModal } from './features/auth/ForgotPasswordModal';
import { DashboardScreen } from './features/home/DashboardScreen';
import { ActivityScreen } from './features/activity/ActivityScreen';
import { NotificationScreen } from './features/notification/NotificationScreen';
import { ProfileScreen } from './features/profile/ProfileScreen';
import { SettingsScreen } from './features/settings/SettingsScreen';
import { ShowcaseScreen } from './features/showcase/ShowcaseScreen';
import { AIAssistantModal } from './features/ai/AIAssistantModal';
import { useUIStore } from './stores/useUIStore';

const MainAppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { isShowcaseOpen, setShowcaseOpen } = useUIStore();

  const [phase, setPhase] = useState<AppPhase>('splash');
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Splash Screen finished
  const handleSplashComplete = () => {
    if (isAuthenticated) {
      setPhase('main');
    } else {
      setPhase('onboarding');
    }
  };

  // Onboarding finished
  const handleOnboardingComplete = () => {
    if (isAuthenticated) {
      setPhase('main');
    } else {
      setPhase('auth');
    }
  };

  // Render Phase 1: Splash Screen
  if (phase === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Render Phase 2: Onboarding
  if (phase === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  // Render Phase 3: Auth (Login / Register)
  if (!isAuthenticated && phase === 'auth') {
    return (
      <AppShell>
        {authScreen === 'login' ? (
          <LoginScreen
            onGoToRegister={() => setAuthScreen('register')}
            onOpenForgotPassword={() => setIsForgotPasswordOpen(true)}
          />
        ) : (
          <RegisterScreen onGoToLogin={() => setAuthScreen('login')} />
        )}
        <ForgotPasswordModal
          isOpen={isForgotPasswordOpen}
          onClose={() => setIsForgotPasswordOpen(false)}
        />
      </AppShell>
    );
  }

  // Render Phase 4: Main Application Dashboard & Enterprise Design System Shell
  return (
    <AppShell>
      {/* Sticky Enterprise Top Bar */}
      {!isShowcaseOpen && !isSettingsOpen && (
        <TopAppBar
          title={
            activeTab === 'home'
              ? 'FamilyAI Hub'
              : activeTab === 'ai'
              ? 'Family AI Assistant'
              : activeTab === 'activity'
              ? 'Aktivitas Keluarga'
              : activeTab === 'notification'
              ? 'Pemberitahuan'
              : 'Profil Pengguna'
          }
          onOpenAI={() => setIsAIOpen(true)}
          onOpenNotifications={() => setActiveTab('notification')}
          onOpenShowcase={() => setShowcaseOpen(true)}
        />
      )}

      {/* Dynamic Tab / Screen Views with Motion Transitions */}
      <main className="flex-1">
        <PageTransition keyId={isShowcaseOpen ? 'showcase' : isSettingsOpen ? 'settings' : activeTab}>
          {isShowcaseOpen ? (
            <ShowcaseScreen onBack={() => setShowcaseOpen(false)} />
          ) : isSettingsOpen ? (
            <SettingsScreen onBack={() => setIsSettingsOpen(false)} />
          ) : (
            <>
              {activeTab === 'home' && <DashboardScreen onOpenAI={() => setIsAIOpen(true)} />}
              {activeTab === 'ai' && <DashboardScreen onOpenAI={() => setIsAIOpen(true)} />}
              {activeTab === 'activity' && <ActivityScreen />}
              {activeTab === 'notification' && <NotificationScreen />}
              {activeTab === 'profile' && (
                <ProfileScreen onGoToSettings={() => setIsSettingsOpen(true)} />
              )}
            </>
          )}
        </PageTransition>
      </main>

      {/* Floating AI Button */}
      {!isAIOpen && !isSettingsOpen && !isShowcaseOpen && (
        <FloatingAIButton onOpenAIChat={() => setIsAIOpen(true)} />
      )}

      {/* AI Assistant Chat Modal */}
      <AIAssistantModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />

      {/* Bottom Navigation */}
      {!isSettingsOpen && !isShowcaseOpen && (
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === 'ai') {
              setIsAIOpen(true);
            } else {
              setActiveTab(tab);
            }
          }}
        />
      )}
    </AppShell>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <OfflineProvider>
          <AuthProvider>
            <MainAppContent />
          </AuthProvider>
        </OfflineProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
