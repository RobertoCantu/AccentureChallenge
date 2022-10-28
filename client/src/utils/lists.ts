export const deleteWhere = <T>(list: T[], where: (item: T) => boolean): T[] => {
    const listCp = [...list];
    const deleteIdx = listCp.findIndex(where);
    if (deleteIdx > -1) {
        listCp.splice(deleteIdx, 1);
    }

    return listCp;
};

export const updateWhere = <T>(
    list: T[],
    newValue: T,
    where: (item: T) => boolean
): T[] => {
    const listCp = [...list];

    const updateIdx = listCp.findIndex(where);
    if (updateIdx > -1) {
        listCp[updateIdx] = newValue;
    }

    return listCp;
};
