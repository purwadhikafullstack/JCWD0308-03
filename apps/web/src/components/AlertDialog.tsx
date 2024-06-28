import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface AlertDialogProps {
  onClick: () => void;
  label: string;
}

export const LogoutAlertDialog: React.FC<AlertDialogProps> = ({
  onClick,
  label,
}) => {
  return (
    <AlertDialog >
      <AlertDialogTrigger>
        <div className="text-[#4a4a4a] text-left px-4 py-3 hover:bg-[#f5f5f5] hover:cursor-pointer transition font-semibold">
          {label}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will log you out from your
            account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClick} className='bg-[#00a7c4] hover:bg-[#00a7c4] hover:opacity-80 text-white'>{label}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
