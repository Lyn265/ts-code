interface Point {
  x: number;
  y: number;
}

const point: Point = {
  x: 3,
  y: 4,
};

console.log('object :>> ', point);

//箭头后面的number是返回类型
const getTotal: () => number = () => {
  return 123;
};
