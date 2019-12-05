// import { Message } from 'element-ui'
// export default function ({ $axios, redirect }) {
//   $axios.onError((err) => {
//     const { statusCode, message } = err.response.data
//     if (statusCode === 400) {
//       Message.warning({ message })
//     }
//   })
// }
import { Message } from 'element-ui'

export default function ({ $axios, redirect }) {
  // const { $axios, redirect } = nuxt
  $axios.onError((err) => {
    // console.dir(err)
    // console.log(err)
    const { statusCode, message } = err.response.data

    // 还未使用
    // if(statusCode === 401 || statusCode === 403){
    //     Message.warning({message: "请先登录"});
    //     redirect("/user/login");
    // }

    if (statusCode === 400) {
      Message.warning({ message })
    }
  })
}
