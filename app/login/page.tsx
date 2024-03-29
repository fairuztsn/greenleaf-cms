'use client'

import React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from '@/components/icons/eye/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/components/icons/eye/EyeSlashFilledIcon';
import { Button } from '@nextui-org/react'
import Loading from '@/components/loading/loading'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = React.useState(false);

  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignIn = async () => {
    setLoading(true);

    try {
      const { data: userData, error: userDataFetchingError } = await supabase
        .from('ad_profile_data')
        .select("*")
        .eq('email', email)
        .maybeSingle();

      if (userDataFetchingError) {
        throw new Error(userDataFetchingError.message);
      }

      if (userData && (userData.privilege_id === "Admin" || userData.privilege_id === "Super Admin")) {
        const { error: userAttemptError } = await supabase
        .from('ad_user_attempt')
        .insert({
          user_id: userData.user_id,
          created_at: new Date().toISOString(),
          attempts: 1,
          info: "Attempting login in cms"
        });

        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (signInError) {
          throw new Error(signInError.message);
        }

        const currentTimeStamp = new Date().toISOString();
        const { error: addUserLoginHistoryError } = await supabase
          .from('ad_login_history')
          .insert({
            user_id: userData.user_id,
            created_at: currentTimeStamp,
            last_logged_in: currentTimeStamp,
            ip: "0.0.0.0", // TODO: Add ip
            host_name: navigator.userAgent
          });

        if (addUserLoginHistoryError) {
          throw new Error(addUserLoginHistoryError.message);
        }
      }else {
        throw new Error("User not found")
      }

      setEmail('');
      setPassword('');
      router.push("/");
    } catch (error) {
      alert(error);
      setLoading(false)
    }
}
  const toggleVisibility = () => setIsVisible(!isVisible);

  if(isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading/>
      </div>
    )
  }

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
      <Button color="success" className="mb-3" variant="shadow" onClick={handleSignIn}>
        Log in
      </Button>
    </div>
      </div>
    </div>
  )
}