"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // This function directly toggles between light and dark
  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
    // Log for debugging
    console.log("Toggling theme from", resolvedTheme, "to", resolvedTheme === "dark" ? "light" : "dark")
  }

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return <Button variant="outline" size="icon" className="w-9 h-9" />
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  )
}
