function BytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (!bytes) {
        return '0 Byte'
    }
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
 }

 const Element = (tag, classes = [], content) => {
     const node = document.createElement(tag)

     if (classes.length) {
         node.classList.add(...classes)
     }

     if (content) {
         node.textContent = content
     }
     return node
 }

 function Noop () {}

 export {
     BytesToSize,
     Element,
     Noop
 }