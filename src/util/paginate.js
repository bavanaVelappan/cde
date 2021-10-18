export const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber-1) * pageSize;
    const endIndex = pageSize*pageNumber;
    return items.slice(startIndex, endIndex);
}


