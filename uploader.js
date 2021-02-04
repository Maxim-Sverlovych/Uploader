export function upload (selector, options = {}) {
    const input = document.querySelector(selector)
    const preview = document.createElement('div')

    preview.classList.add('preview')

    const open = document.createElement('button')
    open.classList.add('btn')
    open.textContent = 'OPEN'

    if (options.multi) {
        input.setAttribute('multiple', true)
    }

    if (options.accept && Array.isArray(options.accept)) {
        input.setAttribute('accept', options.accept.join(','))
    }

    input.insertAdjacentElement('afterend', preview)
    input.insertAdjacentElement('afterend', open)

    const openInput = () => input.click()

    const changeInputHandler = event => {
        if (!event.target.files.length) {
            return
        }

        const files = Array.from(event.target.files)

        files.forEach(file => {
            if (!file.type.match('image')) {
                return
            }

            const reader = new FileReader()
            reader.onload = e => {
                const src = e.target.result

                preview.insertAdjacentHTML('afterbegin', `
                    <div class="preview-image">
                        <img src=${src} alt=${file.name} />
                    </div>
                `)
            }

            reader.readAsDataURL(file)
        })
    }

    open.addEventListener('click', openInput)
    input.addEventListener('change', changeInputHandler)  
}