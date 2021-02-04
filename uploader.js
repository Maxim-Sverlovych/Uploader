export function upload (selector) {
    const input = document.querySelector(selector)

    const open = document.createElement('button')
    open.classList.add('btn')
    open.textContent = 'OPEN'

    input.insertAdjacentElement('afterend', open)

    const openInput = () => input.click()
    const changeInputHandler = event => {
        console.log(event.target.files);
    }

    open.addEventListener('click', openInput)
    input.addEventListener('change', changeInputHandler)
}