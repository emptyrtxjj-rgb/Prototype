import React from 'react';

export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string;
  onRowClick?: (row: T) => void;
  className?: string;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  className = '',
}: TableProps<T>) {
  return (
    <div className={`w-full overflow-x-auto rounded-[20px] border border-white/10 light:border-black/8 bg-[#09090b] light:bg-[#ffffff] ${className}`}>
      <table className="w-full text-left border-collapse font-sans text-[14px]">
        {/* Strong Column Headers */}
        <thead>
          <tr className="border-b border-white/10 light:border-black/8 bg-white/[0.02] light:bg-black/[0.02]">
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={`py-3.5 px-5 font-semibold text-[13px] tracking-[-0.01em] text-[#8e8e8e] light:text-[#707070] select-none ${
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Low-border Spacious Body */}
        <tbody className="divide-y divide-white/6 light:divide-black/5">
          {data.map((row, idx) => (
            <tr
              key={keyExtractor(row, idx)}
              onClick={() => onRowClick?.(row)}
              className={`transition-colors duration-150 ${
                onRowClick ? 'cursor-pointer hover:bg-white/5 light:hover:bg-black/5' : 'hover:bg-white/[0.02] light:hover:bg-black/[0.02]'
              }`}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`py-4 px-5 text-white light:text-[#111111] ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  {col.render ? col.render(row, idx) : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
