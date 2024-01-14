import type { NextPage } from "next";
import { Content } from "@/components/home/content";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { getSupabaseSession } from "@/utils/session";

const Home = async () => {
  const session = await getSupabaseSession()

  return <Content />;
};

export default Home;
