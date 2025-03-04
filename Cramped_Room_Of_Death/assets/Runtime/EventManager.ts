import Singleton from "../Base/Singleton"

interface IItem {
  func: Function
  ctx: unknown
}

export default class EventManager extends Singleton {

  // 重写GetInstance方法
  static get Instance(): EventManager {
    return super.GetInstance<EventManager>()
  }

  // 事件字典
  private eventDict: Map<string, IItem[]> = new Map()


  // 注册事件
  on(eventName: string, func: Function, ctx?: unknown) {
    if (!this.eventDict.has(eventName)) {
      this.eventDict.set(eventName, [])
    }
    this.eventDict.get(eventName)?.push({ func, ctx })
  }

  // 解绑事件
  off(eventName: string, func: Function) {
    if (this.eventDict.has(eventName)) {
      const funcs = this.eventDict.get(eventName)
      if (funcs) {
        const index = funcs.findIndex(item => item.func === func)
        if (index > -1) {
          funcs.splice(index, 1)
        }
      }
    }
  }

  // 触发事件
  emit(eventName: string, ...args: any[]) {
    if (this.eventDict.has(eventName)) {
      const funcs = this.eventDict.get(eventName)
      if (funcs) {
        funcs.forEach(({func, ctx}) => {
          ctx ? func.apply(ctx, args) : func(...args)
        })
      }
    }
  }

  // 清空事件
  clear() {
    this.eventDict.clear()
  }
}
