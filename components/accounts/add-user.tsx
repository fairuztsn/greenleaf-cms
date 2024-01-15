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

export const AddUser = () => {
  const columns: Column[] = [
    // { name: "user_id", type: "text" },
    { name: "first_name", type: "text" },
    { name: "last_name", type: "text" },
    { name: "email", type: "email" },
    // { name: "phone_number", type: "text" },
    { name: "home_street", type: "text" },
    { name: "home_city", type: "text" },
    { name: "home_province", type: "text" },
    { name: "photo_profile", type: "text" },
    // { name: "status", type: "text" },
    // { name: "creator", type: "text" },
    // { name: "updater", type: "text" },
    { name: "role_id", type: "number" },
    { name: "privilege_id", type: "text" },
    { name: "password", type: "password"}
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
    let updatedValues = { ...data, [index]: value };
    setData(updatedValues)
  }

  const handleAddUser = async () => {
    setIsLoading(true);

    const userData = {
      ...data,
      creator: currentUser.email,
      created_at: new Date().toISOString(),
      status: false,
    };

    
    try {
      const { password, ...userDataWithoutPassword } = userData;
      const { error: insertError } = await supabase.from('ad_profile_data').insert(userDataWithoutPassword);

      if (insertError) {
        console.error(insertError);
        alert("Something went wrong");
        alert(insertError.message);
      } else {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
        });

        if (signUpError) {
          throw new Error(signUpError.message);
        }

        console.log((await supabase.auth.getUser()).data.user?.email)
        const { error: updateProfileDataError } = await supabase
          .from('ad_profile_data')
          .update({
            user_id: signUpData?.user?.aud,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userData.id);

        //TODO: Set status to true after verified
        if (updateProfileDataError) {
          throw new Error(updateProfileDataError.message);
        }
      }
    } catch (error) {
      console.error(error);
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
        Add User
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
                Add User
              </ModalHeader>
              <ModalBody>
                {columnNames.map((columnName, index) => (
                  <Input
                    key={index}
                    label={snakeToSentence(columnName)}
                    variant="bordered"
                    type={columns.find(column => column.name === columnName)?.type || "text"}
                    onChange={(e) => handleInputChange(columnName, e.target.value)}
                  />
                ))}

                {/* <Input label="Password" type="password" variant="bordered" />
                <Input label="Confirm Password" type="password" variant="bordered" /> */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onClick={onClose}>
                  Close
                </Button>
                <Button color="success" onPress={handleAddUser}>
                  Add User
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )}