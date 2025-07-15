interface DashboardGridProps {
  children: React.ReactNode;
  columns?: string;
}

export function DashboardGrid({ children, columns = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' }: DashboardGridProps) {
  return (
    <div className={`grid ${columns} gap-6 mt-4`}>
      {children}
    </div>
  );
}
