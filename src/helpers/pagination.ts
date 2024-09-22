export function paginate<T>(array: T[], pageSize: number): T[][] {
  return array.reduce((acc: T[][], curr, index) => {
    const pageIndex = Math.floor(index / pageSize);
    if (!acc[pageIndex]) {
      acc[pageIndex] = [];
    }
    acc[pageIndex].push(curr);
    return acc;
  }, []);
}
