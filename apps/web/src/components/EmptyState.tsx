'use client';

import { useRouter } from 'next/navigation';
import { Button } from './Button';
import { Heading } from './Heading';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No exact matches',
  subtitle = 'Please, change or reset your search',
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} center subtittle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            label="Reset search"
            outline
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
