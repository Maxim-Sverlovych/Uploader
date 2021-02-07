import firebase from 'firebase/app'
import 'firebase/storage'
import { firebaseConfig } from './firebase-config'
import { upload } from './uploader'
import { Element } from './utils'

const storage = firebase.storage()

upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.svg'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)
    
            task.on('state_changed', snapshot => {
                const percent = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percent
                block.style.width = percent
            }, error => {
                console.log(error)
            }, () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    const getImageDownload = Element('a', ['link-download'], 'Get image')
                    getImageDownload.setAttribute('href', url)
                    getImageDownload.setAttribute('target', '_blank')
    
    
                    const link = blocks[index].querySelector('.links')
                    link.insertAdjacentElement('afterend', getImageDownload)
                }).catch(err => {
                    console.log(err);
                })
            })
        })
    }
})