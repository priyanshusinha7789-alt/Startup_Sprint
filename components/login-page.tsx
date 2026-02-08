"use client"

import React from "react"

import { useState } from "react"
import { useAppState } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BarChart3, Lock, Mail } from "lucide-react"

export function LoginPage() {
  const { login } = useAppState()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[hsl(220,25%,14%)] p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
        {/* Left branding panel */}
        <div className="hidden flex-col justify-between bg-[hsl(220,25%,18%)] p-10 md:flex md:w-1/2">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--primary))]">
                <BarChart3 className="h-5 w-5 text-[hsl(var(--primary-foreground))]" />
              </div>
              <span className="text-xl font-bold text-[hsl(210,20%,92%)]">SmartMSME</span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[hsl(210,20%,65%)]">
              Smart Automation for MSMEs. Manage billing, inventory, customers, and payments all in one place.
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border border-[hsl(220,18%,24%)] bg-[hsl(220,25%,16%)] p-4">
              <p className="text-sm font-medium text-[hsl(210,20%,85%)]">Dashboard Overview</p>
              <div className="mt-3 flex gap-3">
                {[40, 65, 45, 80, 55, 70, 50].map((h, i) => (
                  <div
                    key={i}
                    className="w-full rounded-t bg-[hsl(var(--primary))] opacity-60"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-[hsl(210,20%,50%)]">
              Trusted by 1,000+ MSMEs across India
            </p>
          </div>
        </div>

        {/* Right login form */}
        <div className="flex w-full flex-col justify-center bg-card p-8 md:w-1/2 md:p-10">
          <div className="mb-8 md:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--primary))]">
                <BarChart3 className="h-5 w-5 text-[hsl(var(--primary-foreground))]" />
              </div>
              <span className="text-xl font-bold text-foreground">SmartMSME</span>
            </div>
          </div>

          <CardHeader className="p-0 pb-6">
            <CardTitle className="text-2xl font-bold text-foreground">Welcome back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@business.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(168,76%,30%)]"
              size="lg"
            >
              Sign In
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Demo app - click Sign In with any credentials
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
