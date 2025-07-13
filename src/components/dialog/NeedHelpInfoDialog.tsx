import { Mail, Phone } from "lucide-react";
import { AlertDialogCancel, AlertDialogContent } from "../ui/alert-dialog";

const NeedHelpInfoDialog = () => {
  return (
    <AlertDialogContent className="max-w-[95%] gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 shadow-lg outline-none sm:max-w-110">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-slate-800">Contact Us</h2>
        <p className="text-sm font-medium text-slate-500">
          We're here to help.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3">
        <a
          href="mailto:support@shubhlabhpoojasamagri.com"
          className="group flex w-full items-center gap-2 rounded-lg transition-colors hover:bg-slate-200"
        >
          <div className="flex-shrink-0 rounded-full bg-indigo-100 p-2">
            <Mail size={20} className="text-indigo-600" />
          </div>
          <p className="line-clamp-1 w-full max-w-full font-medium wrap-anywhere text-ellipsis text-slate-700 group-hover:text-indigo-600">
            support@shubhlabhpoojasamagri.com
          </p>
        </a>
        <a
          href="tel:+919000057702"
          className="group flex items-center gap-2 rounded-lg transition-colors hover:bg-slate-200"
        >
          <div className="rounded-full bg-indigo-100 p-2">
            <Phone size={20} className="text-indigo-600" />
          </div>
          <p className="font-medium text-slate-700 group-hover:text-indigo-600">
            +91 90000-57702
          </p>
        </a>
      </div>

      <div className="flex justify-end">
        <AlertDialogCancel className="w-1/2 rounded-md border-none bg-indigo-600 text-white shadow-sm transition-all duration-150 ease-in-out hover:scale-[0.95] hover:bg-indigo-700 hover:text-white focus:outline-none">
          Close
        </AlertDialogCancel>
      </div>
    </AlertDialogContent>
  );
};

export default NeedHelpInfoDialog;
