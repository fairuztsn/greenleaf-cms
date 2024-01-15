import React from 'react';
import { Users } from '@/components/users';
import { getSupabaseSession } from '@/utils/session';
import Link from 'next/link';
import { supabase } from '@/utils/supabase';
import Error from '@/components/error';

const users = async () => {
   const session = await getSupabaseSession()
   const { data, error } = await supabase.from('ad_profile_data').select("*")

   if(error) {
      return (
         <Error/>
      )
   }
   return <Users/>;
};

export default users;
