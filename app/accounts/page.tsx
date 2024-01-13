import React from 'react';
import {Accounts} from '@/components/accounts';
import { getSupabaseSession } from '@/app/supabase';
const accounts = async () => {
   const session = await getSupabaseSession()
   
   return <Accounts />;
};

export default accounts;
