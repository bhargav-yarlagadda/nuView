"use client"

import { useUser, useClerk } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  Crown
} from "lucide-react"
import { useState } from "react"

const CustomUserButton = () => {
  const { user, isLoaded } = useUser()
  const { signOut, openUserProfile } = useClerk()
  const [isOpen, setIsOpen] = useState(false)

  if (!isLoaded) {
    return (
      <div className="h-8  w-8 rounded-md bg-muted animate-pulse" />
    )
  }

  if (!user) {
    return null
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const handleOpenProfile = () => {
    openUserProfile()
    setIsOpen(false) // Close dropdown after opening profile
  }

  const getInitials = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`
    }
    if (user.firstName) {
      return user.firstName[0]
    }
    if (user.username) {
      return user.username[0].toUpperCase()
    }
    return "U"
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-8  px-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-all duration-200 group"
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-200">
              <AvatarImage 
                src={user.imageUrl} 
                alt={user.fullName || user.username || "User"} 
              />
              <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium hidden sm:block">
              {user.firstName || user.username || "User"}
            </span>
            <ChevronDown 
              size={14} 
              className={`text-muted-foreground transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`} 
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-56 p-2"
        sideOffset={8}
      >
        {/* User Info Header */}
        <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50 mb-2">
          <Avatar className="h-10 w-10">
            <AvatarImage 
              src={user.imageUrl} 
              alt={user.fullName || user.username || "User"} 
            />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user.fullName || user.username || "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
          {user.publicMetadata?.role === "admin" && (
            <Crown size={16} className="text-yellow-500" />
          )}
        </div>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        <DropdownMenuItem className="cursor-pointer" onClick={handleOpenProfile}>
          <User size={16} className="mr-2" />
          Manage Account
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <Settings size={16} className="mr-2" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          className="cursor-pointer text-destructive focus:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut size={16} className="mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CustomUserButton
