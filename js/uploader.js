function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (!bytes) {
        return '0 Byte'
    }
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
 }

 const element = (tag, classes = [], content) => {
     const node = document.createElement(tag)

     if (classes.length) {
         node.classList.add(...classes)
     }

     if (content) {
         node.textContent = content
     }
     return node
 }

 function noop () {}

export function upload (selector, options = {}) {
    let files = []

    const onUpload = options.onUpload ?? noop
    const input = document.querySelector(selector)
    const preview = element('div', ['preview'])
    const open = element('button', ['btn'], 'OPEN')
    const uploadFile = element('button', ['btn', 'primaty'], 'UPLOAD')
    uploadFile.style.display = 'none'

    if (options.multi) {
        input.setAttribute('multiple', true)
    }

    if (options.accept && Array.isArray(options.accept)) {
        input.setAttribute('accept', options.accept.join(','))
    }

    input.insertAdjacentElement('afterend', preview)
    input.insertAdjacentElement('afterend', uploadFile)
    input.insertAdjacentElement('afterend', open)

    const openInput = () => input.click()

    const changeInputHandler = event => {
        if (!event.target.files.length) {
            return
        }

        files = Array.from(event.target.files)
        preview.innerHTML = ''  
        uploadFile.style.display = 'inline'

        files.forEach(file => {
            if (!file.type.match('image')) {
                return
            }

            const reader = new FileReader()
            reader.onload = e => {
                const src = e.target.result

                preview.insertAdjacentHTML('afterbegin', `
                    <div class="preview-image">
                        <div class="preview-remove" data-name="${file.name}">&times;</div>
                            <img src=${src} alt=${file.name} />
                            <div class="preview-info">
                                <span>${file.name}</span>
                                <span>${bytesToSize(file.size)}</span>
                            </div>
                    </div>
                `)
            }

            reader.readAsDataURL(file)
        })
    }

    const removeHandler = event => {
        if (!event.target.dataset.name) {
            return
        }
        const { name } = event.target.dataset
        files = files.filter(file => file.name !== name)

        if (!files.length) {
            uploadFile.style.display = 'none'
        }

        const block = preview.querySelector(`[data-name="${name}"]`).closest('.preview-image')
        block.classList.add('removing')
        setTimeout(() => block.remove(), 300)
    }

    const changePreview = el => {
        el.style.opacity = 1
        el.innerHTML = '<div class="preview-info-progress"></div>'
    }

    const uploadHandler = () => {
        preview.querySelectorAll('.preview-remove').forEach(el => el.remove())
        const previewInfo = preview.querySelectorAll('.preview-info')
        previewInfo.forEach(changePreview)
        onUpload(files, previewInfo)
    }

    open.addEventListener('click', openInput)
    input.addEventListener('change', changeInputHandler) 
    preview.addEventListener('click', removeHandler)
    uploadFile.addEventListener('click', uploadHandler)
}