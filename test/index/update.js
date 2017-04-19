import chai from 'chai';

import Pivot from '../../src';

chai.expect();
const expect = chai.expect;

const dataArray = [
 ['name', 'gender', 'house', 'age'],
 ['Jon', 'm', 'Stark', 14],
 ['Arya', 'f', 'Stark', 10],
 ['Cersei', 'f', 'Baratheon', 38],
 ['Tywin', 'm', 'Lannister', 67],
];
const rowsToPivot = ['gender', 'name'];
const colsToPivot = ['house'];
const aggCategory = 'age';
const aggType = 'sum';

const dataArray2 = [
 ['name', 'gender', 'house', 'age'],
 ['Tyrion', 'm', 'Lannister', 34],
 ['Joffrey', 'm', 'Baratheon', 18],
 ['Bran', 'm', 'Stark', 8],
 ['Jaime', 'm', 'Lannister', 32],
 ['Sansa', 'f', 'Stark', 12],
];

export default () => {
  it('should return a new pivoted table if not filtering', () => {
    const expected = [
      { value: [ 'sum age', 'Lannister', 'Baratheon', 'Stark' ],
        depth: 0,
        type: 'colHeader',
        row: 0,
      },
      { value: [ 'm', 66, 18, 8 ], depth: 0, type: 'rowHeader', row: 1 },
      { value: [ 'Tyrion', 34, '', '' ], type: 'data', depth: 1, row: 2 },
      { value: [ 'Joffrey', '', 18, '' ], type: 'data', depth: 1, row: 3 },
      { value: [ 'Bran', '', '', 8 ], type: 'data', depth: 1, row: 4 },
      { value: [ 'Jaime', 32, '', '' ], type: 'data', depth: 1, row: 5 },
      { value: [ 'f', '', '', 12 ], depth: 0, type: 'rowHeader', row: 6 },
      { value: [ 'Sansa', '', '', 12 ], type: 'data', depth: 1, row: 7 },
    ];

    const pivot = new Pivot(
      dataArray,
      rowsToPivot,
      colsToPivot,
      aggCategory,
      aggType,
    );

    pivot.update(dataArray2, rowsToPivot, colsToPivot, aggCategory, aggType);

    expect(pivot.data.table).to.deep.equal(expected);
  });
};
