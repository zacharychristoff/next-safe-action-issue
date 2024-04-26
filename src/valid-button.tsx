'use client'
import { useAction } from "next-safe-action/hooks";
import { saveUser } from "./actions/user";

const ValidButton = () => {
  const boundSaveContract = saveUser.bind(null, "userId");
  const { execute, status } = useAction(boundSaveContract, {
    onSuccess: () => {
      console.log("Success")
    },
    onError: ({ error }) => {
      console.error(error)
    },
  });

    return (
        <div>
        <button onClick={() => {
            execute({ email: "test@gmail.com" })
        }}>Valid</button>
        </div>
    )
}

export default ValidButton;