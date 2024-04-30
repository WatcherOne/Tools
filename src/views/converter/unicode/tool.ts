function textToUnicode (text) {
    let unicodeText = '';
    for (let i = 0; i < text.length; i++) {
      unicodeText += '\\u' + text.charCodeAt(i).toString(16).padStart(4, '0');
    }
    return unicodeText;
  }
  
  // 示例用法
  const inputText = 'Hello, 世界!';
  const unicodeOutput = textToUnicode(inputText);
  console.log(unicodeOutput);
  