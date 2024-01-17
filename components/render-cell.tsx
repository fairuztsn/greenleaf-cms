import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "./icons/table/delete-icon";
import { EditIcon } from "./icons/table/edit-icon";
import { EyeIcon } from "./icons/table/eye-icon";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import { usePathname, useRouter } from "next/navigation";
import { destroy, update } from "../utils/handler";

interface Props {
  data: any;
  columnKey: string | React.Key;
}

export const RenderCell = ({ data, columnKey }: Props) => {
  const pathname = usePathname().substring(1)
  const router = useRouter()
  // @ts-ignore
  const cellValue = data[columnKey];
  switch (columnKey) {
    // case "name":
    //   return (
    //     <User
    //       avatarProps={{
    //         src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    //       }}
    //       name={cellValue}
    //     >
    //       {data.email}
    //     </User>
    //   );
    case "role":
      return (
        <div>
          <div>
            <span>{cellValue}</span>
          </div>
          <div>
            <span>{data.email}</span>
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
          <span className="capitalize text-xs">{cellValue === true ? "true": "false"}</span>
        </Chip>
      );

    case "actions":

      return (
        <div className="flex items-center gap-4 ">
          <div>
            <Tooltip content="Details">
              <button onClick={() => {
                  router.push(`${pathname}/${data.id}`)
                }}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            {/* <Tooltip content="Edit" color="secondary">
              <button >
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip> */}
          </div>
          <div>
            <Tooltip
              content="Delete"
              color="danger"
            >
              <button onClick={async () => {
                const confirmed = window.confirm("Are you sure you want to delete this "+pathname+"?")
                if(confirmed) {
                  try {
                    await destroy(pathname, {key: "id", val: data.id})
                    window.location.reload()
                  }catch(err) {
                    alert(err)
                  }
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
