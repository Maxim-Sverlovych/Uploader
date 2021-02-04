import { upload } from './uploader'

upload('#file', {
    multi: true,
    accept: ['.png', 'jpg', 'jpeg', 'svg']
})