export const getPageNameFromFilePath = filePath => {
  const route = filePath.split("pages")[1].replace(/\.(js|jsx)$/, "");
  const routeParts = route.split("/");
  return routeParts[routeParts.length - 1];
}

export default getPageNameFromFilePath;
