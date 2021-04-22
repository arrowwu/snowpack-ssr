const getFilePath = (filePath, isDev) => {
  if(isDev) {
    return filePath.split("client")[1];
  }
  return filePath.split("build")[1];
}
  
export default getFilePath;
