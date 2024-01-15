import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";

const supabase = createClientComponentClient()

const createErr = (error: PostgrestError) => new Error(`${error.message}: ${error.message}`)

const tableMap = (context: string): string | undefined => {
    return {
        "users": "ad_profile_data",
        "menu": "ad_menu",
        "feature": "ad_feature"
    }[context];
}


export const insert = (table :string, data: any) => {

}

export const update = (table: string, data: any, eq: {key: string, val: any}) => {

}

export const destroy = async (table: string, eq: {key: string, val: any}) => {
    const { error } = await supabase
    .from(tableMap(table) as string)
    .delete()
    .eq(eq.key, eq.val);

    if (error) {
        throw createErr(error)
    }

    return 1
}

