import { css, type Styles } from "../../../styled-system/css"
import { getCoreRowModel, useReactTable, flexRender, type TableOptions, type Row } from '@tanstack/react-table'
import { Typography } from "../atom/Typography"

type Props<TData> = {
  data: TableOptions<TData>['data']
  columns: TableOptions<TData>['columns']
}

const rowSpacingStyle: Styles = {
  '& *': {
    paddingY: 'xs'
  },
  '& :first-child': {
    paddingLeft: 'md',
  },
  '& :last-child': {
    paddingRight: 'md',
    textAlign: 'right'
  }
}

export function Table<TData>({ data, columns }: Props<TData>) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

  return <table className={css({
    w: 'full',
    borderCollapse: 'separate',
    borderSpacing: '[0px 0.5rem]',
  })}>
    <thead>
      {table.getHeaderGroups().map(hg => (
        <tr key={hg.id} className={css(rowSpacingStyle)}>
          {hg.headers.map(h => (
            <Typography key={h.id} component="th" outline="body" cssRaw={css.raw({ textAlign: "left", fontWeight: 'highlight' })}>
              {flexRender(h.column.columnDef.header, h.getContext())}
            </Typography>
          ))}
        </tr>
      ))}
    </thead>
    <tbody>
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
    boxShadow: `[0px 3px {colors.border.default/50}]`,
    '& *': {
      border: '{colors.border.default/50} solid 2px',
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
      <Typography key={cell.id} component="td" variant="body2" outline="body" cssRaw={css.raw({ fontWeight: "highlight" })}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </Typography>
    ))}
  </tr>
}