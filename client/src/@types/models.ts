import {
    User as UserInternal,
    Folder as FolderInternal,
    File as FileInternal,
} from '@prisma/client';

export type User = Omit<UserInternal, 'password'>;
export type Folder = FolderInternal;
export type File = FileInternal;
