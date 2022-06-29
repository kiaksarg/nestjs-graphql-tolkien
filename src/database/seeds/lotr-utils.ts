import { Connection, EntityTarget } from 'typeorm';

export const skipLater = (text: string): string => {
  return text.trim().replace('later', '').replace('Formerly:', '').trim();
};

const skipParenthesis = (text: string): string => {
  return text.split('(')[0]?.trim();
};

export const findEntitiesByText = async <Entity>(
  entityClass: EntityTarget<Entity>,
  text: string,
  connection: Connection,
  shouldSkipLater = false,
  shouldSkipParenthesis = false,
): Promise<any[]> => {
  const finalList = [];
  if (text) {
    const names = text.split(',');
    for (const name of names) {
      const entitiesList = await connection.manager.find(entityClass, {
        where: {
          name: shouldSkipParenthesis
            ? skipParenthesis(skipLater(name))
            : shouldSkipLater
            ? skipLater(name)
            : name?.trim(),
        },
      });

      if (entitiesList?.length > 0) {
        // finalList.push(...characterEntities);
        entitiesList.forEach((x) => {
          //   if (!finalList.find((y) => y.id === x.id)) finalList.push(x);
          pushIfNotIncluded(x, finalList);
        });
      }
    }
  }
  return finalList;
};

export const pushIfNotIncluded = (item, list) => {
  const index = list.findIndex((x) => x.id == item.id);
  if (index === -1) {
    list.push(item);
  } else {
    console.log('object already exists');
  }
};

export const isNotIncluded = (item, list): boolean => {
  const index = list.findIndex((x) => x.id == item.id);
  if (index === -1) {
    return true;
  } else {
    return false;
  }
};

export const anyNotIncluded = (item, list) => {
  const index = list.findIndex((x) => x.id == item.id);
  if (index === -1) {
    console.log(
      'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx SHOULD BE ADDED xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    );
    throw Error();
  } else {
    console.log('object already exists');
  }
};
