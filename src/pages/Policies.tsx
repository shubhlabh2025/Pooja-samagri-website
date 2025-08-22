import { RenderHtmlText } from "./Profile/RenderHtmlText";
import { AppPoliciesText } from "@/utils/constants";

const Policies = () => {
  return (
    <div className="flex flex-col p-4">{RenderHtmlText(AppPoliciesText)}</div>
  );
};

export default Policies;
