import React from 'react';
import {Accounts} from '@/components/accounts';
import { getSupabaseSession } from '@/app/supabase';
import { cookies } from 'next/headers';

const accounts = async () => {
   const session = await getSupabaseSession(cookies)
   
   return <Accounts />;
};

export default accounts;
