import React from 'react';
import { Users } from '@/components/users';
import { getSupabaseSession } from '@/utils/session';
import Link from 'next/link';
import { supabase } from '@/utils/supabase';
import Error from '@/components/error';
import { Menus } from '@/components/menu';

const menus = async () => {
   const session = await getSupabaseSession()
   const { data, error } = await supabase.from('ad_menu').select("*")

   if(error) {
      return (
         <Error/>
      )
   }

   return <Menus/>;
};

export default menus;
