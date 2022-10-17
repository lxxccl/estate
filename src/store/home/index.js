import { reqSelect, reqUpdate, reqDel, reqIns } from '@/api'
let state = {
  //商品分类的数据,仓库里面数据起始数值不要瞎写【服务器返回的是啥】
  SelectList: []
}
let mutations = {
  GETSelect(state, SelectList) {
    state.SelectList = SelectList
  }
}
let actions = {
  //查询
  async getSelectList({ commit }, Ob) {
    //获取服务器的数据,存储在vuex仓库中
    let result = await reqSelect(Ob.year, Ob.city)
    if ((result.code = 200)) {
      console.log(result)
      commit('GETSelect', result)
    }
  },
  async updateList({ commit }, updateParams) {
    console.log(updateParams)
    let result = await reqUpdate(updateParams)
    if (result.code == 200) {
      console.log(result)
      return true
    } else {
      return false
    }
  },
  //通过id删除一条数据
  async delList({ commit }, delParams) {
    console.log(delParams)
    let result = await reqDel(delParams)
    if (result.code == 200) {
      console.log(result)
      return true
    } else {
      return false
    }
  },
  //新增一条房地产数据
  async insList({ commit }, delParams) {
    console.log(delParams)
    let result = await reqIns(delParams)
    if (result.code == 200) {
      console.log(result)
      return true
    } else {
      return false
    }
  }
}
let getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
