'use strict'

import { factory } from '../../utils/factory'
import { deepMap } from '../../utils/collection'
import { operators as latexOperators } from '../../utils/latex'

const name = 'unaryPlus'
const dependencies = ['typed', 'config', 'type.BigNumber']

export const createUnaryPlus = factory(name, dependencies, ({ typed, config, type: { BigNumber } }) => {
  /**
   * Unary plus operation.
   * Boolean values and strings will be converted to a number, numeric values will be returned as is.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.unaryPlus(x)
   *
   * Examples:
   *
   *    math.unaryPlus(3.5)      // returns 3.5
   *    math.unaryPlus(1)     // returns 1
   *
   * See also:
   *
   *    unaryMinus, add, subtract
   *
   * @param  {number | BigNumber | Fraction | string | Complex | Unit | Array | Matrix} x
   *            Input value
   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix}
   *            Returns the input value when numeric, converts to a number when input is non-numeric.
   */
  const unaryPlus = typed(name, {
    'number': function (x) {
      return x
    },

    'Complex': function (x) {
      return x // complex numbers are immutable
    },

    'BigNumber': function (x) {
      return x // bignumbers are immutable
    },

    'Fraction': function (x) {
      return x // fractions are immutable
    },

    'Unit': function (x) {
      return x.clone()
    },

    'Array | Matrix': function (x) {
      // deep map collection, skip zeros since unaryPlus(0) = 0
      return deepMap(x, unaryPlus, true)
    },

    'boolean | string': function (x) {
      // convert to a number or bignumber
      return (config().number === 'BigNumber') ? new BigNumber(+x) : +x
    }
  })

  unaryPlus.toTex = {
    1: `${latexOperators['unaryPlus']}\\left(\${args[0]}\\right)`
  }

  return unaryPlus
})
