import React from 'react';
import {Accounts} from '@/components/accounts';
import { getSupabaseSession } from '@/utils/session';
import Link from 'next/link';
import { supabase } from '@/utils/supabase';
import Error from '@/components/error';

const accounts = async () => {
   const session = await getSupabaseSession()
   const { data, error } = await supabase.from('ad_profile_data').select("*")

   if(error) {
      return (
         <Error/>
      )
   }
   return <Accounts/>;
};

export default accounts;
