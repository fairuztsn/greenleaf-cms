import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"

const supabase = createClientComponentClient()

const createErr = (error: PostgrestError) => new Error(`${error.code}: ${error.message}, ${error.details}`)

const tableMap = (context: string): string | undefined => {
    return {
        "users": "ad_profile_data",
        "menu": "ad_menu",
        "features": "ad_feature"
    }[context]
}

interface StringKeyObject {
  [key: string]: any;
}

const areObjectsEqual = (obj1: StringKeyObject, obj2: StringKeyObject) => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false
    }
  }

  return true
}

export const readFirst = async(table: string, eq: {key: string, val: any}) => {
    const { data, error } = await supabase
        .from(tableMap(table) as string)
        .select("*")
        .eq(eq.key, eq.val)
        .maybeSingle()

    return {
        data, 
        error
    }
}

const getAuthUser = async () => {
    const { data, error } = (await supabase.auth.getUser())
    const authUser = data?.user

    return authUser
}

export const update = async (table: string, data: any, eq: { key: string, val: any }) => {
  const tableName: string = tableMap(table) as string

  try {
    const { data: previousData, error: readError } = await readFirst(table, { key: eq.key, val: eq.val })

    if (readError) {
      throw createErr(readError)
    }

    if (previousData && areObjectsEqual(data, previousData)) {
      return 0
    }

    const authUser = await getAuthUser()
    let updatedData = data

    if(Object.keys(data).includes("updater")) {
        updatedData = {...updatedData, updater: authUser?.email}
    }

    if(Object.keys(data).includes("updated_at")) {
        updatedData = {...updatedData, updated_at: new Date().toISOString()}
    }

    const { error } = await supabase
        .from(tableName)
        .update(updatedData)
        .eq(eq.key, eq.val)

    if (error) {
      throw createErr(error)
    }

    return 1
  } catch (error) {
        throw error
  }
}

export const destroy = async (table: string, eq: {key: string, val: any}) => {
    const { error } = await supabase
        .from(tableMap(table) as string)
        .delete()
        .eq(eq.key, eq.val)

    if (error) {
        throw createErr(error)
    }

    return 1
}

