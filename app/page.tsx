"use client"

import { useAppState, AppProvider } from "@/lib/store"
import { LoginPage } from "@/components/login-page"
import { DashboardLayout } from "@/components/dashboard-layout"

function AppContent() {
  const { isLoggedIn } = useAppState()

  if (!isLoggedIn) {
    return <LoginPage />
  }

  return <DashboardLayout />
}

export default function Page() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
