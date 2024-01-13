import type { NextPage } from "next";
import { Content } from "@/components/home/content";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getSupabaseSession } from "@/app/supabase";

const Home = async () => {
  const session = await getSupabaseSession(cookies)
  
  return <Content />;
};

export default Home;
