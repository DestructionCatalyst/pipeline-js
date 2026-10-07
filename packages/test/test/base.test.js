const { describe, it } = require('node:test');


const {
    EntrypointOperator,
    ConstantOperator,
    ConsoleOperator,
    ArraySplitOperator,
    ArrayJoinOperator,
    CopyOperator,
    SquareOperator,
} = require("@pipeline/operators-base");
const { connect } = require('@pipeline/core');
const ExpectOperator = require("../src/ExpectOperator");

describe('Tests of basic operators', () => {
   it('Should print "Hello World!" and the array of squares 1-10', () => {
       const entrypointOperator = new EntrypointOperator();
       const duplicateOperator = new CopyOperator(2);
       const helloWorldOperator = new ConstantOperator('Hello World!');
       // const consoleOperator = new ConsoleOperator();
       const consoleOperator = new ExpectOperator(['info', 'log'], {
           info: [[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]],
           log: ['Hello World!'],
       });

       connect(
           entrypointOperator.output('entrypoint'),
           duplicateOperator.input('input')
       );

       connect(
           duplicateOperator.output(0),
           helloWorldOperator.input('trigger')
       );

       connect(
           helloWorldOperator.output('value'),
           consoleOperator.input('log'),
       );

       const oneToTenOperator = new ConstantOperator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
       const arraySplitOperator = new ArraySplitOperator();
       const squareOperator = new SquareOperator();
       const arrayJoinOperator = new ArrayJoinOperator();

       connect(
           duplicateOperator.output(1),
           oneToTenOperator.input('trigger')
       );

       connect(
           oneToTenOperator.output('value'),
           arraySplitOperator.input('array')
       );

       connect(
           arraySplitOperator.output('values'),
           squareOperator.input('number')
       );

       connect(
           squareOperator.output('square'),
           arrayJoinOperator.input('values'),
       )

       connect(
           arraySplitOperator.output('length'),
           arrayJoinOperator.input('length')
       );

       connect(
           arrayJoinOperator.output('array'),
           consoleOperator.input('info'),
       )

       entrypointOperator.start();
   });
});

