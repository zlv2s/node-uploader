module.exports = {
  getDate: dateTime => {
    const datetime = new Date(dateTime)

    const year = datetime.getFullYear()
    const month = ('0' + (datetime.getMonth() + 1)).slice(-2)
    const date = ('0' + datetime.getDate()).slice(-2)
    const hour = ('0' + datetime.getHours()).slice(-2)
    const minute = ('0' + datetime.getMinutes()).slice(-2)
    const second = ('0' + datetime.getSeconds()).slice(-2)

    return (
      year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    )
  },
  uuid: () => {
    const s = []
    const hexDigits = '0123456789abcdef'
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    const uuid = s.join('')
    return uuid
  },

  getDateDiff(dateTimeStamp) {
    let result
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24
    const halfamonth = day * 15
    const month = day * 30
    const now = new Date().getTime()
    const diffValue = now - dateTimeStamp
    if (diffValue < 0) {
      return
    }
    const monthC = diffValue / month
    const weekC = diffValue / (7 * day)
    const dayC = diffValue / day
    const hourC = diffValue / hour
    const minC = diffValue / minute
    if (monthC >= 1) {
      result = '' + parseInt(monthC) + '月前'
    } else if (weekC >= 1) {
      result = '' + parseInt(weekC) + '周前'
    } else if (dayC >= 1) {
      result = '' + parseInt(dayC) + '天前'
    } else if (hourC >= 1) {
      result = '' + parseInt(hourC) + '小时前'
    } else if (minC >= 1) {
      result = '' + parseInt(minC) + '分钟前'
    } else result = '刚刚'
    return result
  }
}
