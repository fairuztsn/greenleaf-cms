"use client"
import { update } from "@/components/handler"
import Loading from "@/components/loading/loading"
import { snakeToSentence } from "@/utils/snakeCaseConverter"
import { supabase } from "@/utils/supabase"
import { Button, Checkbox, Input, input } from "@nextui-org/react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface PageProps {
    params: {id: number}
}

const Page = ({params}: PageProps) => {
    const columns = [
        { name: 'id', type: 'number' },
        { name: 'created_at', type: 'datetime-local' },
        { name: 'user_id', type: 'text' },
        { name: 'first_name', type: 'text' },
        { name: 'last_name', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'phone_number', type: 'tel' },
        { name: 'home_street', type: 'text' },
        { name: 'home_city', type: 'text' },
        { name: 'home_province', type: 'text' },
        { name: 'photo_profile', type: 'url' },
        { name: 'status', type: 'checkbox' },
        { name: 'creator', type: 'text' },
        { name: 'updated_at', type: 'datetime-local' },
        { name: 'updater', type: 'text' },
        { name: 'role_id', type: 'number' },
        { name: 'privilege_id', type: 'text' }
    ]

    const router = useRouter()
    const pathname = usePathname()
    const firstPathSegment = pathname.split("/")[1]

    const [data, setData] = useState<any | null>(undefined)
    const [loading, setLoading] = useState(true)
    const [inputData, setInputData] = useState<any>(
        columns.reduce((acc, column) => {
            acc[column.name] = null;
            return acc;
        }, {})
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from("ad_profile_data")
                    .select()
                    .eq("id", params.id)
                    .maybeSingle()
                
                if (error) {
                    throw error.message
                }

                setData(data)
                setInputData((prevInputData: any) => ({ ...prevInputData, ...data }))
                setLoading(false)
            } catch (error) {
                alert(error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (index: string, value: any) => {
        let updatedValues = { ...inputData, [index]: value };
        setInputData(updatedValues)
    }

    const disabledColumns = [
        "id", "user_id", "created_at", "updated_at", "creator", "updater"
    ]

    if(loading) {
        return (
            <div className="mt-5 flex h-full flex-wrap items-center justify-center">
                <Loading/>
            </div>
        )
    }

    return (
        <div>
            <h1 className="mt-5 mb-5 font-bold text-center">{data && data["user_id"]}</h1>
            <div className="mt-5 flex flex-wrap items-center justify-center">
            {columns.map((col, index) => (
                <div key={index} className="w-full m-3 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4">
                    {col.name === "status" ? (
                        <div className="flex items-center">
                            <Checkbox
                                defaultSelected={data && data[col.name]}
                                color="success"
                                className="mr-2"
                                onChange={(e) => {
                                    handleInputChange(col.name, e.target.checked)
                                }}
                            />
                            <label className="cursor-pointer" htmlFor={`status-${index}`}>
                                {snakeToSentence(col.name)}
                            </label>
                        </div>
                    ) : (
                        <Input 
                            type={col.type} 
                            label={snakeToSentence(col.name)}
                            defaultValue={
                                data && col.type === 'datetime-local'
                                ? (data[col.name] && new Date(data[col.name]).toISOString().slice(0, 16)) || ''
                                : data && data[col.name]
                            }
                            className={`w-full ${disabledColumns.includes(col.name) ? "pointer-events-none opacity-50" : ""}`}
                            onChange={(e) => {
                                handleInputChange(col.name, e.target.value)
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
        <div className="flex justify-center items-center m-14">
            <Button color="default" variant="ghost" className="me-5" onClick={() => {
                const confirm = window.confirm("Are you sure want to go back?")

                if(confirm) {
                    router.replace(`/${firstPathSegment}`)
                }
            }}>
                Back
            </Button> 
            <Button color="success" onClick={async () => {
                const confirm = window.confirm("Are you sure want to update this "+firstPathSegment+"?")

                if(confirm) {
                    setLoading(true)
                    try {
                        const updatingData = await update("users", inputData, {key: "id", val: params.id})

                        if(updatingData) {
                            router.replace("/"+firstPathSegment)
                        }else {
                            alert("No changes made")
                        }
                    }catch(err) {
                        alert(err)
                        setLoading(false)
                    }
                }
            }}>
                Save Changes
            </Button> 
        </div>
        </div>
    )
}

export default Page