'use client'

import React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from '@/components/icons/eye/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/components/icons/eye/EyeSlashFilledIcon';
import { Button } from '@nextui-org/react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <Input className="max-w-xs mb-3" variant="bordered" isRequired type="email" label="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
      <Input isRequired label="Password" variant="bordered" className="max-w-xs mb-3"
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
      type={isVisible ? "text" : "password"} onChange={(e) => setPassword(e.target.value)}
      value={password}
    />
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button color="primary" className="mb-3" variant="shadow" onClick={handleSignUp}>
        Log in
      </Button>
    </div>
      </div>
    </div>
  )
}