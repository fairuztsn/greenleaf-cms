import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { snakeToSentence } from "@/utils/snakeCaseConverter";
import { supabase } from "@/utils/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Loading from "../loading/loading";

type Column = {
  name: string;
  type: string; // You might want to use a more specific type based on your actual data types
};

export const AddFeature = () => {
  const columns: Column[] = [
    {name: "name", type: "text"},
    {name: "group_feature", type: "text"},
    {name: "icon_feature", type: "text"},
    {name: 'mobile_path', type: 'text' },
    {name: "status", type: "number"},
    {name: "creator", type: "text"},
    {name: "updater", type: "text"},
    {name: "role_id", type: "number"}
  ]

  const columnNames = columns.map(cols => cols.name)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [ currentUser, setCurrentUser ] = useState<any>(null)
  const [ isLoading, setIsLoading ] = useState(true)

  const [data, setData] = useState<Object>(
    Object.fromEntries(columnNames.map((col: string) => [col, null]))
  )

  useEffect(() => {
    const getCurrentUser = async () => {
      const supabase = createClientComponentClient()
      const user = (await supabase.auth.getUser())
      
      setCurrentUser(user.data.user)
      setIsLoading(false)
    }

    getCurrentUser()
  }, [])

  const handleInputChange = (index: string, value: any) => {
    value = index === "status" && value > 0 ? 1 : value
    let updatedValues = { ...data, [index]: value };
    setData(updatedValues)
  }

  const handleAddFeature = async () => {
    setIsLoading(true);
    try {
      setData({...data, creator: currentUser.email})
      console.log(Object.keys(data))
      const { error: insertError } = await supabase.from('ad_feature').insert(data);

      if (insertError) {
        throw new Error(insertError.message)
      }
      window.location.reload()
    } catch (error) {
      alert("An error occurred: " + error);
    } finally {
      setIsLoading(false);
    }
}

  if(isLoading) {
    return <Loading/>
  }

  return (
    <div>
      <Button onPress={onOpen} color="success">
        Add Feature
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Feature
              </ModalHeader>
              <ModalBody>
                {columnNames.map((columnName, index) => (
                  columnName === "creator" || columnName === "updater"? <></> : <Input
                    key={index}
                    label={snakeToSentence(columnName)}
                    variant="bordered"
                    type={columns.find(column => column.name === columnName)?.type || "text"}
                    max={1} min={0} 
                    onChange={(e) => handleInputChange(columnName, e.target.value)}
                  />
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Close
                </Button>
                <Button color="success" onPress={handleAddFeature}>
                  Add Feature
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )}