import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";

interface Props {
  user: SupabaseUser;
  columnKey: string | React.Key;
}

// TODO: Make not only for users
export const RenderCell = ({ user, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = user[columnKey];
  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
          name={cellValue}
        >
          {user.email}
        </User>
      );
    case "role":
      return (
        <div>
          <div>
            <span>{cellValue}</span>
          </div>
          <div>
            <span>{user.email}</span>
          </div>
        </div>
      );
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue
              ? "success"
              : "danger"
          }
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );

    case "actions":

      return (
        <div className="flex items-center gap-4 ">
          <div>
            <Tooltip content="Details">
              <button onClick={() => console.log("View user", user.id)}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Edit user" color="secondary">
              <button onClick={() => console.log("Edit user", user.id)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              content="Delete user"
              color="danger"
            >
              <button onClick={async () => {
                alert("Performing")
                try {
                  const { error } = await supabase
                    .from('ad_profile_data')
                    .delete()
                    .eq('id', user.id);

                  if (error) {
                    alert("Something went wrong");
                    alert(error.message);
                  }else {
                    window.location.reload()
                  }
                } catch (error) {
                  console.error("An unexpected error occurred:", error);
                }
              }}>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>

          </div>
        </div>
      );
    default:
      return cellValue;
  }
};
