import { supabase } from "./supabase";

type TableContext = "users" | "menu" | "features"
type ColumnContext = "users" | "menu" | "features"

const tableMap: Record<TableContext, string> = {
  "users": "ad_profile_data",
  "menu": "ad_menu",
  "features": "ad_feature"
};

const columnMap: Record<ColumnContext, string[]> = {
  "users": [
    "id", "created_at", "user_id","first_name","last_name","email","phone_number","home_street","home_city","home_province","photo_profile","status","creator","updated_at","updater","role_id","privilege_id"
  ],
  "menu": [
    "id", "created_at","menu_name","group_menu","status","creator","updated_at","updater", "privilege_level"
  ],
  "features": [
    "id", "created_at","name","group_feature","icon_feature", "mobile_path", "status","creator","updated_at","updater","role_id"
  ]
}

export const fetchDataFromSupabase = async (context: TableContext) => {
  const tableName = tableMap[context as TableContext]

  if (!tableName) {
    throw new Error(`Invalid context: ${context}`)
  }

  const { data, error } = await supabase.from(tableName).select("*")

  if (error) {
    throw new Error(`Error fetching data: ${error.message}`)
  }

  const columnNames = columnMap[context]
  const columns = columnNames.map(col => ({ name: col, uid: col }))

  return { data, columns }
};
