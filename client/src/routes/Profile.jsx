import MyAccount from "../../UI/Account/MyAccount/MyAccount";
import ManageAccount from "../../UI/Account/ManageAccount/ManageAccount";
import { TabTitle } from "../../../utils/General";

export const Profile = () => {
  TabTitle("My Account - Shoppie");

  return <MyAccount />;
};

export const AccountManager = () => {
  TabTitle("My Account - Shoppie");

  return <ManageAccount />;
};
