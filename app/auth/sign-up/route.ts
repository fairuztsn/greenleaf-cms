import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest){
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  if (email === null || password === null) {
    // Handle the case where email or password is null
    return new NextResponse("Email or password is missing", { status: 400 });
  }

  const cookieStore = cookies(); // Assuming cookies() is a function that returns a cookie store
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  await supabase.auth.signUp({
    email: email as string, // Type assertion since we know email is not null here
    password: password as string, // Type assertion since we know password is not null here
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}