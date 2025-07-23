import { Table, TableProps } from '@cloudscape-design/components';

interface GenericTableProps<T> {
  items: T[];
  columnDefinitions: TableProps.ColumnDefinition<T>[];
  trackBy?: string;
  header?: string;
  empty?: React.ReactNode;
  variant?: TableProps['variant'];
  stickyHeader?: boolean;
}

export function GenericTable<T>({
  items,
  columnDefinitions,
  trackBy,
  header,
  empty,
  variant = 'embedded',
  stickyHeader = true,
}: GenericTableProps<T>) {
  return (
    <Table
      items={items}
      columnDefinitions={columnDefinitions}
      trackBy={trackBy}
      header={header}
      empty={empty}
      variant={variant}
      stickyHeader={stickyHeader}
    />
  );
}
