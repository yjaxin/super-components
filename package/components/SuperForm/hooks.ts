import {SuperFormItemType} from "./index";
import {toRaw} from "vue";
import _ from 'lodash'

export const getTransformData = (configList: Array<SuperFormItemType>, formModel: any) => {
  let tempObj = {}
  const rawFormModel = _.cloneDeep(formModel)
  configList.forEach((config: SuperFormItemType) => {

    if (_.isFunction(config.transform)) {
      const res: any = config.transform(formModel[config.prop])
      tempObj = {...tempObj, ...res}
      delete rawFormModel[config.prop]
    }
  })
  return {
    ...rawFormModel,
    ...tempObj
  }
}
