import React from 'react';
import { Users } from '@/components/users';
import { getSupabaseSession } from '@/utils/session';
import Link from 'next/link';
import { supabase } from '@/utils/supabase';
import Error from '@/components/error';
import { Features } from '@/components/features';

const features = async () => {
   const session = await getSupabaseSession()
   const { data, error } = await supabase.from('ad_feature').select("*")

   if(error) {
      return (
         <Error/>
      )
   }

   return <Features/>;
};

export default features;
