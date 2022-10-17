import { random } from 'dirty-kitchen/lib/random';
import { useState } from 'react';

const quotes = [
  'Dig The Digital',
  'Make a Difference',
  'All Data is Biased',
  'People Passion Purpose',
  'We Find Human Solutions to Complex challenges',
  'Scrum is Yum',
];

export function Quote(): JSX.Element {
  const [quote] = useState(random(quotes));
  return <p>{quote}</p>;
}
