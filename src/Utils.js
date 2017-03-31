const Utils = {
  apiHost: 'http://api.tinylog.dev/items/',


  dateToString(date = new Date()) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }
}

export default Utils;
