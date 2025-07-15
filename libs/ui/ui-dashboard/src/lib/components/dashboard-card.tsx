import { Box, Button } from '@cloudscape-design/components';
import { DashboardIcon } from './dashboard-icon';

interface DashboardCardProps {
  label: string;
  iconName: string;
  href: string;
  description?: string;
}

export function DashboardCard({ label, iconName, href, description }: DashboardCardProps) {
  return (
    <Box
      padding="m"
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex flex-col items-center justify-center text-center space-y-2 px-2 sm:px-4 py-4">
        <DashboardIcon iconName={iconName} className="text-emerald-600 text-3xl sm:text-4xl" />
        {description && (
          <div className="text-gray-600 text-xs sm:text-sm px-1">
            {description}
          </div>
        )}
        <Button
          fullWidth
          variant="primary"
          className="!bg-emerald-600 !hover:bg-emerald-700 !text-white rounded-full max-w-[180px] w-full py-1 sm:py-2 mt-1"
          onClick={() => (window.location.href = href)}
        >
          {label}
        </Button>
      </div>
    </Box>
  );
}
