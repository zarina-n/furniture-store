import { Product } from '../types'

//     category: ['rest', 'work', 'kitchen', 'children', 'bath],

export const products: Product[] = [
  {
    name: 'Люстра VODA',
    imgSrc: '/assets/images/top_background.jpg',
    description:
      'Основание из полированной нержавеющей стали, придает оригинальный парящий эффект.',
    price: 45000,
    priceBeforeDiscount: 67000,
    id: 1,
    discount: true,
    category: ['kitchen', 'bath'],
  },
  {
    name: 'Диван RONALD',
    imgSrc: '/assets/images/top_background.jpg',
    description:
      'Модель отличается простотой линий и форм, отсутствием броского декора.',
    price: 156000,
    priceBeforeDiscount: 198000,
    id: 2,
    discount: true,
    category: ['rest', 'children', 'work'],
  },
  {
    name: 'Комод VENT',
    imgSrc: '/assets/images/top_background.jpg',
    description:
      'Европейский дуб - отличается особой прочностью и стабильностью.',
    price: 34000,
    priceBeforeDiscount: 45000,
    id: 3,
    discount: true,
    category: ['rest', 'work', 'children'],
  },
  {
    name: 'Кровать TATRAN',
    imgSrc: '/assets/images/top_background.jpg',
    description:
      'Основание из полированной нержавеющей стали, придает оригинальный парящий эффект.',
    price: 120000,
    priceBeforeDiscount: null,
    id: 4,
    discount: false,
    category: ['rest', 'children'],
  },
  {
    name: 'Кресло VILORA',
    imgSrc: '/assets/images/top_background.jpg',
    description:
      'Мягкое и уютное, аккуратное и стильное. Упругие подушки сиденья и приятная на ощупь ткань.',
    price: 21000,
    priceBeforeDiscount: null,
    id: 5,
    discount: false,
    category: ['rest', 'work', 'children'],
  },
  {
    name: 'Стол MENU',
    imgSrc: '/assets/images/top_background.jpg',
    description:
      'Для того чтобы трапезничать было приятно, необходим правильный обеденный стол.',
    price: 34000,
    priceBeforeDiscount: null,
    id: 6,
    discount: false,
    category: ['kitchen'],
  },
  {
    name: 'Кресло ASKESTA',
    imgSrc: '/assets/images/top_background.jpg',
    description:
      'Высокоэластичный пенополиуретан в «начинке» кресла надежен и долговечен',
    price: 68000,
    priceBeforeDiscount: null,
    id: 7,
    discount: false,
    category: ['rest', 'work', 'children'],
  },
  {
    name: 'Стол NORMAN',
    imgSrc: '/assets/images/top_background.jpg',
    description:
      'Прекрасно переносит солнечные лучи, перепады влажности и любые осадки.',
    price: 40000,
    priceBeforeDiscount: null,
    id: 8,
    discount: false,
    category: ['kitchen'],
  },
  {
    name: 'Диван NASTAN',
    imgSrc: '/assets/images/top_background.jpg',
    description:
      'Модель отличается простотой линий и форм, отсутствием броского декора.',
    price: 80000,
    priceBeforeDiscount: null,
    id: 9,
    discount: false,
    category: ['rest', 'work', 'children'],
  },
  {
    name: 'Диван ASKETA',
    imgSrc: '/assets/images/top_background.jpg',
    description:
      'Благодаря защелкивающемуся механизму диван легко раскладывается в комфортную кровать.',
    price: 68000,
    priceBeforeDiscount: null,
    id: 10,
    discount: false,
    category: ['rest', 'work', 'children'],
  },
  {
    name: 'Кресло LUNAR',
    imgSrc: '/assets/images/top_background.jpg',
    description:
      'Прекрасно переносит солнечные лучи, перепады влажности и любые осадки.',
    price: 40000,
    priceBeforeDiscount: null,
    id: 11,
    discount: false,
    category: ['rest', 'work', 'children'],
  },
  {
    name: 'Шкаф Nastan',
    imgSrc: '/assets/images/top_background.jpg',
    description:
      'Мебель может быть оснащена разнообразными системами подсветки.',
    price: 80000,
    priceBeforeDiscount: null,
    id: 12,
    discount: false,
    category: ['rest', 'work', 'children'],
  },
]

export const cartList: Product[] = [
  {
    name: 'Люстра VODA',
    imgSrc: '/assets/images/cart_1.jpg',
    description:
      'Основание из полированной нержавеющей стали, придает оригинальный парящий эффект.',
    price: 45000,
    priceBeforeDiscount: 67000,
    id: 1,
    discount: true,
  },
  {
    name: 'Диван RONALD',
    imgSrc: '/assets/images/cart_1.jpg',
    description:
      'Модель отличается простотой линий и форм, отсутствием броского декора.',
    price: 156000,
    priceBeforeDiscount: 198000,
    id: 2,
    discount: true,
  },
]
