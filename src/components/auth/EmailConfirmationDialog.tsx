import {Dialog, Portal} from "react-native-paper";
import Button from "../Button";
import Paragraph from "../Paragraph";

type Props = {
  hideDialog: () => void,
  visible: boolean,
};
export const EmailConfirmationDialog = ({hideDialog, visible}: Props) => {

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Email sent</Dialog.Title>
        <Dialog.Content>
          <Paragraph>An Email with instructions to reset password is sent on your email account,
            if an account exists for the provided email</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Go to Login page</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>

  )
}
