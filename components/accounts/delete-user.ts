import { supabase } from "@/utils/supabase";

async function deleteUser(id: number) {
    const { error } = await supabase
        .from('ad_profile_Data')
        .delete()
        .eq('id', id)

    return error
}