import { ITuple } from "../common/interfaces";

/**
 * creates all permutation from the items given and returns an array of tupels
 * @param items
 */
export function permutations(items: never[]): ITuple[] {
  const tuple: ITuple[] = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      tuple.push({ item1: items[i], item2: items[j] });
    }
  }
  return tuple;
}

/**
 * returns the noOfItemsToReturn items randomly selected from the tuples
 * @param tuples the sets from which the returned items come from
 * @param noOfItemsToReturn the amound of items that should be returned
 */
export function scrumbleTuples(
  tuples: ITuple[],
  noOfItemsToReturn?: number
): ITuple[] {
  const returnTuples: ITuple[] = [];
  const items =
    noOfItemsToReturn && noOfItemsToReturn <= tuples.length
      ? noOfItemsToReturn
      : tuples.length;
  for (let i = 0; i < items; i++) {
    const index: number = Math.floor(Math.random() * tuples.length);
    returnTuples.push(tuples[index]);
    tuples.splice(index, 1);
  }
  return returnTuples;
}
