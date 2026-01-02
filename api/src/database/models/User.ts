import {
  ColumnType,
  Selectable,
} from 'kysely'

export interface UserTable {
  id: string
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: ColumnType<Date, string, never>;
  updatedAt: ColumnType<Date, string, never>;
}

export type User = Selectable<UserTable>