import createHeading from './heading.js'
import icon from './th.jpg'
import './main.css'

const heading = createHeading()

document.body.append(heading)


const img = new Image();
img.src = icon;
document.body.append(img)

import footerHtml from './footer.html'

document.write(footerHtml)

console.log(heading)
if (module.hot) {
    let lastHeading = heading
    // 手动处理js文件热更新逻辑
    module.hot.accept('./heading', () => {
        console.log('heading 模块更新了');

        document.body.removeChild(lastHeading);
        const newHeading = createHeading()
        // console.log("newHeading", newHeading)
        document.body.appendChild(newHeading);

        // document.body.replaceChild(lastHeading, newHeading)

        lastHeading = newHeading
    })

    // 手动图片文件热更新逻辑
    module.hot.accept('./th.jpg', () => {
        console.log('图片更新')
        img.src = icon
    })
}