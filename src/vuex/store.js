import {
    createStore
} from 'vuex'
const store = createStore({
    state() {
        return {
            currentMenu: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')).currentMenu:null,
            tabsList:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')).tabsList :[
                // {
                //     path: '/',
                //     name: 'home',
                //     label: '首页',
                //     icon: 'home'
                // }
                {
                    path: '/newReport',
                    name: '新建报表任务',
                    label: '新建报表任务',
                    icon: 'home'
                }
            ],
            imgArray:[]
        }

    },
    mutations: {
         //选择标签 选择面包屑
         selectMenu(state, val) {
            if (val.name === 'home') {
                state.currentMenu = null
            } else {
                state.currentMenu = val
                //如果等于-1说明tabsList不存在那么插入，否则什么都不做
                let result = state.tabsList.findIndex(item => item.name === val.name)
                result === -1 ? state.tabsList.push(val) : ''
            }
            // val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
        },
        //关闭标签
        closeTab(state, val) {
            let result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },
        setImg(state,val){
            state.imgArray.push(val)
        }
    },
    getters: {

    }
})
export default store