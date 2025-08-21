import { RenderHtmlText } from "./Profile/RenderHtmlText";
import { AccountDeletionText } from "@/utils/constants";

const AccountDeletion = () => {
  return (
    <div className="flex flex-col p-4">
      {RenderHtmlText(AccountDeletionText)}
    </div>
  );
};

export default AccountDeletion;
