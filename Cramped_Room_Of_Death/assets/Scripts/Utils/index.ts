import { _decorator, Component, Layers, Node, resources, Sprite, SpriteFrame, UITransform, Vec2 } from 'cc'

export const createUINode = (name: string = '') => {
  const node = new Node(name)

  // 设置节点位置以及宽高
  const transform = node.getComponent(UITransform)

  if (transform) {
    transform.anchorPoint = new Vec2(0, 1)
  }

  // 设置 layer
  node.layer = 1 << Layers.nameToLayer('UI_2D')

  return node
}


/***
 * 生成指定范围随机数
 * @param start
 * @param end
 */
export const randomByRange = (start: number, end: number) => Math.floor(Math.random() * (end - start) + start)
