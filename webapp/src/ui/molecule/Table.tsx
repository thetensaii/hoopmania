import { css, type Styles } from "../../../styled-system/css"
import { getCoreRowModel, useReactTable, flexRender, type TableOptions, type Row } from '@tanstack/react-table'

type Props<TData> = {
  data: TableOptions<TData>['data']
  columns: TableOptions<TData>['columns']
}

const rowSpacingStyle: Styles = {
  '& *': {
    paddingY: '0.5rem'
  },
  '& :first-child': {
    paddingLeft: '1rem',
  },
  '& :last-child': {
    paddingRight: '1rem',
    textAlign: 'right'
  }
}

export function Table<TData>({ data, columns }: Props<TData>) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

  return <table className={css({
    w: 'full',
    textAlign: 'left',
    borderCollapse: 'separate',
    borderSpacing: '0px 0.5rem',
    textShadow: 'smallTextBorder'
  })}>
    <thead>
      {table.getHeaderGroups().map(hg => (
        <tr key={hg.id} className={css({ fontWeight: 'bolder' }, rowSpacingStyle)}>
          {hg.headers.map(h => (
            <th key={h.id}>{flexRender(h.column.columnDef.header, h.getContext())}</th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody className={css({ fontWeight: 'bold', })}>
      {table.getRowModel().rows.map((row) => (
        <TableItem key={row.id} row={row} />
      ))}
    </tbody>
  </table>
}

type ItemProps<TData> = {
  row: Row<TData>
}
function TableItem<TData>({ row }: ItemProps<TData>) {
  return <tr className={css({
    bg: 'blue.300',
    borderRadius: '8px',
    boxShadow: `0px 3px {colors.darkBlue.900/50}`,
    '& *': {
      border: '{colors.darkBlue.900/50} solid 2px',
    },
    '& :first-child': {
      borderLeftRadius: '8px',
      borderRight: 'none'
    },
    '& :last-child': {
      borderRightRadius: '8px',
      borderLeft: 'none'
    },
    '& :not(:first-child,:last-child)': {
      borderX: 'none'
    }
  }, rowSpacingStyle)}>
    {row.getVisibleCells().map((cell) => (
      <td key={cell.id}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </td>
    ))}
  </tr>
}