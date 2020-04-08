var IMAGE_PATTERN = /^!\[(.*)\]\((.*)\)$/
var IMAGE_INDEX = /^image(\d+).*$/
// var IMAGE_TAG = "[图片]";

function SortedImage(index, url) {
  this.index = index
  this.url = url
}

function sortByIndex(v1, v2) {
  if (v1.index < v2.index) {
    return -1
  } else if (v1.index > v2.index) {
    return 1
  } else return 0
}

function getImageOfMD(input) {
  if (input.indexOf("https://upload-images.jianshu.io") < 0) {
    return
  }

  var result = IMAGE_PATTERN.exec(input)
  debugger
  if (result.length != 3) {
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
