export const getChangeFormat = (change) =>
  change > 0 ? `+${change}%` : `${change}%`;
export const getChangeColor = (change) => {
  if (change < -3) return "rgb(246, 53, 56)";
  if (change < -2) return "rgb(191, 64, 69)";
  if (change < -1) return "rgb(139, 68, 78)";
  if (change < 0) return "rgb(79, 69, 84)";
  if (change < 1) return "rgb(65, 69, 84)";
  if (change < 2) return "rgb(53, 118, 78)";
  if (change < 3) return "rgb(47, 158, 79)";
  return "rgb(48, 204, 90)";
};
