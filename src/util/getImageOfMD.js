var IMAGE_PATTERN = /^!\[(.*)\]\((.*)\)$/
var IMAGE_INDEX = /^image(\d+).*$/
// var IMAGE_TAG = "[图片]";

function getImageOfMD(input) {
  if (input.indexOf("https://upload-images.jianshu.io") < 0) {
    return
  }

  var result = IMAGE_PATTERN.exec(input)
  if (result.length !== 3) {
    return
  }

  var imageIndex = IMAGE_INDEX.exec(result[1])
  console.assert(imageIndex.length === 2)
  return {
    fileIndex: imageIndex[1],
    fileName: result[1],
    fileURL: result[2],
  }
}
export default getImageOfMD
