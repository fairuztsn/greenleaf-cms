import React from 'react';
import {Accounts} from '@/components/accounts';
import { getSupabaseSession } from '@/utils/session';
import Link from 'next/link';
import { supabase } from '@/utils/supabase';

const accounts = async () => {
   const session = await getSupabaseSession()
   
   // return posts.map((post) => (
   //    <p key={post.id}>
   //       <Link href={`/static/${post.id}`}>{post.title}</Link>
   //    </p>
   // ))
   // return <Accounts />;
};

export default accounts;
