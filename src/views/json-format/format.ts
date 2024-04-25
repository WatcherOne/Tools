export function prettyJSON (str: any) {
    try {
        // 设置缩进为2个空格
        str = JSON.stringify(JSON.parse(str), null, 2)
        str = str.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>')
        return str.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match: any) => {
            var cls = 'number'
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key'
                } else {
                    cls = 'string'
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean'
            } else if (/null/.test(match)) {
                cls = 'null'
            }
            return '<span class="' + cls + '">' + match + '</span>'
        })
    } catch (e) {
        console.log(e)
        return e
    }
}
