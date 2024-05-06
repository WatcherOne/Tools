export const textToUnicode = (text: string) => {
    let unicodeText = ''
    for (let i = 0; i < text.length; i++) {
      	unicodeText += '\\u' + text.charCodeAt(i).toString(16).padStart(4, '0')
    }
    return unicodeText
}
 