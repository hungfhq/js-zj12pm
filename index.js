import { Dexie } from 'dexie';
import { BM25 } from './BM25.js';
var bm = new BM25();

var verbs, nouns, adjectives, adverbs, preposition;
nouns = [
  'bird',
  'clock',
  'boy',
  'plastic',
  'duck',
  'teacher',
  'old lady',
  'professor',
  'hamster',
  'dog',
  'master',
  'guru',
  'hunghq',
  'player',
];
verbs = [
  'kicked',
  'ran',
  'flew',
  'dodged',
  'sliced',
  'rolled',
  'died',
  'breathed',
  'slept',
  'killed',
];
adjectives = [
  'beautiful',
  'lazy',
  'professional',
  'lovely',
  'dumb',
  'rough',
  'soft',
  'hot',
  'vibrating',
  'slimy',
];
adverbs = [
  'slowly',
  'elegantly',
  'precisely',
  'quickly',
  'sadly',
  'humbly',
  'proudly',
  'shockingly',
  'calmly',
  'passionately',
];
preposition = [
  'down',
  'into',
  'up',
  'on',
  'upon',
  'below',
  'above',
  'through',
  'across',
  'towards',
];

function sentence() {
  var rand1 = Math.floor(Math.random() * 10);
  var rand2 = Math.floor(Math.random() * nouns.length);
  var rand3 = Math.floor(Math.random() * 10);
  var rand4 = Math.floor(Math.random() * 10);
  var rand5 = Math.floor(Math.random() * 10);
  var rand6 = Math.floor(Math.random() * 10);

  var content =
    'The ' +
    adjectives[rand1] +
    ' ' +
    nouns[rand2] +
    ' ' +
    adverbs[rand3] +
    ' ' +
    verbs[rand4] +
    ' because some ' +
    nouns[rand1] +
    ' ' +
    adverbs[rand1] +
    ' ' +
    verbs[rand1] +
    ' ' +
    preposition[rand1] +
    ' a ' +
    adjectives[rand2] +
    ' ' +
    nouns[rand5] +
    ' which, became a ' +
    adjectives[rand3] +
    ', ' +
    adjectives[rand4] +
    ' ' +
    nouns[rand6] +
    '.';

  return content;
}
var db = new Dexie('Sentences');

// DB with single table "friends" with primary key "id" and
// indexes on properties "name" and "age"
db.version(1).stores({
  sentences: `id, tokens, body, termCount, terms, _score`,
});

// Now add some values.
// db.friends.bulkPut([
//   { id: 1, name: "Josephine", age: 21 },
//   { id: 2, name: "Per", age: 75 },
//   { id: 3, name: "Simon", age: 5 },
//   { id: 4, name: "Sara", age: 50, notIndexedProperty: 'foo' }
// ])

let sentencesArr = [];
// let backup = [];
for (let i = 0; i < 10; i++) {
  let t = sentence();
  const docObj = bm.addDocument({ id: i, body: t });
  console.log(docObj);
  sentencesArr.push(docObj);
}

db.sentences.bulkPut(sentencesArr);

bm.updateIdf();
let result = bm.search('guru');
// console.log(result);

// const connection = indexedDB.open('notes', 1);
