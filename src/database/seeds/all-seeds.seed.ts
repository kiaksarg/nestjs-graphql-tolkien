import { GenderEnum } from './../../common/constants';
import { CharacterEntity } from './../../modules/characters/entities/character.entity';
import { LocationEntity } from './../../modules/locations/entities/location.entity';
import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { CultureEntity } from './../../modules/cultures/entities/culture.entity';
import { QuoteEntity } from './../../modules/characters/entities/quote.entity';
import { ArtefactEntity } from './../../modules/artefacts/entities/artefacts.entity';
import { RaceEntity } from './../../modules/races/entities/race.entity';
import { BattleEntity } from './../../modules/battles/entities/battle.entity';
import { findEntitiesByText, pushIfNotIncluded } from './lotr-utils';

import * as CHARACTERS_RAW from './data-json/characters.json';
import * as LOCATIONS_RAW from './data-json/locations.json';
import * as CULTURES_RAW from './data-json/cultures.json';
import * as QUOTES_RAW from './data-json/quotes.json';
import * as ARTEFACT_RAW from './data-json/artefacts.json';
import * as RACES_RAW from './data-json/races.json';
import * as BATTLES_RAW from './data-json/battles.json';
import { CultureToCharacterEntity } from '../../modules/cultures/entities/culture-to-character.entity';
import { LocationToCharacterEntity } from '../../modules/locations/entities/location-to-character.entity';
import { RaceToCharacterEntity } from '../../modules/races/entities/race-to-character.entity';

export default class CreateAllSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // return;
    await insertCharacters(connection);
    await insertLocations(connection);
    await insertCultures(connection);
    await insertQuotes(connection);
    await insertArtefacts(connection);
    await insertRaces(connection);
    await insertBattles(connection);
    //Characters Relations
    await insertCharactersRaceRelations(connection);
    await insertCharactersCultureRelations(connection);
    await insertCharactersLocationRelations(connection);
    await insertCharactersSpouseRelations(connection);
    //LocationsRelations
    await insertLocationsCapitalRelations(connection);
    await insertLocationsRegionsRelations(connection);
    await insertLocationsMajorTownsRelations(connection);
  }
}

const insertCharacters = async (connection: Connection) => {
  // Creating characters
  const characterEntities = await Promise.all(
    CHARACTERS_RAW.map(async (item) => {
      const characterEntity = new CharacterEntity({
        birth: item.birth,
        name: item.name,
        text: item.text,
        gender: GenderEnum[item.gender.toLowerCase()],
        //Race
        lotrPageId: item.lotr_page_id,
        //cultures
        death: item.death,
        eyes: item.eyes,
        hairColor: item.hair_color,
        height: item.height,
        //location
        otherNames: item.other_names,
        rule: item.rule,
        //spouse
        titles: item.titles,
        weapon: item.weapon,
      });
      return characterEntity;
    }),
  );
  await connection.manager.save(characterEntities);
};

const insertLocations = async (connection: Connection) => {
  // Creating location
  const locationEntities = await Promise.all(
    LOCATIONS_RAW.map(async (item) => {
      const governanceList = await findEntitiesByText(
        CharacterEntity,
        item.governance,
        connection,
        true,
        false,
      );

      const locationEntity = new LocationEntity({
        name: item.name,
        text: item.text,
        lotrPageId: item.lotr_page_id,
        capitalText: item.capital,
        cultureText: item.cultures,
        //   capital: item.capital,
        //   cultures
        description: item.description,
        events: item.events,
        foundedOrBuilt: item.founded_or_built,
        governance: governanceList,
        governanceText: item.governance,
        lifespan: item.lifespan,
        majorTownsText: item.major_towns,
        //   majorTowns: ,
        otherNames: item.other_names,
        position: item.position,
        regionsText: item.regions,
        //   regions: ,
        type: item.type,
      });
      return locationEntity;
    }),
  );
  await connection.manager.save(locationEntities);
};

const insertCultures = async (connection: Connection) => {
  // Creating cultures
  const cultureEntities = await Promise.all(
    CULTURES_RAW.map(async (item) => {
      const charactersList = await findEntitiesByText(CharacterEntity, item.characters, connection);
      const locationsList = await findEntitiesByText(LocationEntity, item.locations, connection);

      const cultureEntity = new CultureEntity({
        name: item.name,
        text: item.text,
        lotrPageId: item.lotr_page_id,
        characters: charactersList,
        charactersText: item.characters,
        distinctions: item.distinctions,
        hairColor: item.hair_color,
        height: item.height,
        languages: item.languages,
        lifespan: item.lifespan,
        locationText: item.locations,
        locations: locationsList,
        origins: item.origins,
        otherNames: item.other_names,
        skinColor: item.skin_color,
      });
      return cultureEntity;
    }),
  );
  await connection.manager.save(cultureEntities);

  const cultureCharacterRelEntities: CultureToCharacterEntity[] = [];

  cultureEntities.forEach((item) => {
    if (item.characters?.length > 0) {
      return item.characters.forEach((ch) =>
        cultureCharacterRelEntities.push(
          new CultureToCharacterEntity({
            cultureId: item.id,
            characterId: ch.id,
          }),
        ),
      );
    }
  });

  await connection.manager.save(cultureCharacterRelEntities);

  // cultureEntities.forEach((x) => console.log('characters', x.characters?.length));
};

const insertQuotes = async (connection: Connection) => {
  // Creating cultures
  const quoteEntities = await Promise.all(
    QUOTES_RAW.map(async (item) => {
      const charactersList = await findEntitiesByText(CharacterEntity, item.character, connection);

      const quoteEntity = new QuoteEntity({
        text: item.text,
        source: item.source,
        character: charactersList && charactersList.length > 0 ? charactersList[0] : null,
      });
      return quoteEntity;
    }),
  );
  await connection.manager.save(quoteEntities);
};

const insertArtefacts = async (connection: Connection) => {
  // Creating cultures
  const artefactsEntities = await Promise.all(
    ARTEFACT_RAW.map(async (item) => {
      const charactersList = await findEntitiesByText(CharacterEntity, item.character, connection);
      const locationsList = await findEntitiesByText(LocationEntity, item.location, connection);

      const artefactEntity = new ArtefactEntity({
        name: item.name,
        text: item.text,
        lotrPageId: item.lotr_page_id,
        characters: charactersList,
        locations: locationsList,
        locationsText: item.location,
        appearance: item.appearance,
        otherNames: item.other_names,
        usage: item.usage,
      });
      return artefactEntity;
    }),
  );
  await connection.manager.save(artefactsEntities);
};

const insertRaces = async (connection: Connection) => {
  // Creating cultures
  const raceEntities = await Promise.all(
    RACES_RAW.map(async (item) => {
      const charactersList = await findEntitiesByText(CharacterEntity, item.characters, connection);
      const locationsList = await findEntitiesByText(LocationEntity, item.locations, connection);

      const raceEntity = new RaceEntity({
        name: item.name,
        locations: locationsList,
        locationsText: item.locations,
        distinctions: item.distinctions,
        text: item.text,
        lotrPageId: item.lotr_page_id,
        charactersText: item.characters,
        characters: charactersList,
        hairColor: item.hair_color,
        height: item.height,
        languages: item.languages,
        lifespan: item.lifespan,
        origins: item.origins,
        otherNames: item.other_names,
        skinColor: item.skin_color,
      });
      return raceEntity;
    }),
  );
  await connection.manager.save(raceEntities);

  const raceCharacterRelEntities: RaceToCharacterEntity[] = [];

  raceEntities.forEach((item) => {
    if (item.characters?.length > 0) {
      return item.characters.forEach((ch) =>
        raceCharacterRelEntities.push(
          new RaceToCharacterEntity({
            raceId: item.id,
            characterId: ch.id,
          }),
        ),
      );
    }
  });

  await connection.manager.save(raceCharacterRelEntities);
};

const insertBattles = async (connection: Connection) => {
  // Creating cultures
  const battleEntities = await Promise.all(
    BATTLES_RAW.map(async (item) => {
      const locationsList = await findEntitiesByText(LocationEntity, item.location, connection);

      const battleEntity = new BattleEntity({
        name: item.name,
        text: item.text,
        locations: locationsList,
        locationsText: item.location,
        lotrPageId: item.lotr_page_id,
        conflict: item.conflict,
        date: item.date,
        outcome: item.outcome,
      });
      return battleEntity;
    }),
  );
  await connection.manager.save(battleEntities);
};

// const insert = (connection: Connection) => {};
const insertCharactersRaceRelations = async (connection: Connection) => {
  // Creating characters
  const newRelEntities = [];
  const savedEntities = await connection
    .createQueryBuilder(CharacterEntity, 'character')
    .leftJoin(RaceToCharacterEntity, 'raceToCh', 'character.id = raceToCh.character_id')
    .leftJoinAndMapMany('character.races', RaceEntity, 'races', 'races.id = raceToCh.race_id')
    .getMany();

  for (const characterEntity of savedEntities) {
    const rawCharacter = CHARACTERS_RAW.find((x) => x.name === characterEntity.name);
    if (rawCharacter) {
      const raceList = await findEntitiesByText(RaceEntity, rawCharacter.race, connection);

      const newRaces: RaceEntity[] = [];

      raceList?.forEach((x) => {
        const index = characterEntity.races.findIndex((y) => y.id == x.id);
        if (index === -1) {
          newRaces.push(x);
        }
      });

      newRaces.forEach((x) => {
        newRelEntities.push(
          new RaceToCharacterEntity({
            raceId: x.id,
            characterId: characterEntity.id,
          }),
        );
      });
    } else {
      throw Error('Character not found.');
    }
  }
  await connection.manager.save(newRelEntities);
};

const insertCharactersCultureRelations = async (connection: Connection) => {
  const newRelEntities = [];
  const savedCharacterEntities = await connection.manager.find(CharacterEntity);

  // connection.manager.find(CharacterEntity, {
  //   relations: ['cultures'],
  // });

  for (const characterEntity of savedCharacterEntities) {
    const rawCharacter = CHARACTERS_RAW.find((x) => x.name === characterEntity.name);
    if (rawCharacter) {
      const culturesList = await findEntitiesByText(
        CultureEntity,
        rawCharacter.culture,
        connection,
      );

      //   characterEntity.cultures?.forEach((x) => console.log('characterEntity:', x.name));
      //   culturesList?.forEach((x) => console.log('culturesList:', x.name));

      // characterEntity.cultures?.forEach((x) => {
      //   pushIfNotIncluded(x, culturesList);
      // });

      const characterCultures = await connection.manager.find(CultureToCharacterEntity, {
        where: { characterId: characterEntity.id },
        relations: ['culture', 'character'],
      });

      const newCultures: CultureEntity[] = [];

      culturesList?.forEach((x) => {
        const index = characterCultures.findIndex((y) => y.culture.id == x.id);
        if (index === -1) {
          newCultures.push(x);
        }
      });

      //   culturesList?.forEach((x) => {
      //     anyNotIncluded(x, characterEntity.cultures);
      //   });

      // characterEntity.cultures = culturesList;
      newCultures.forEach((x) => {
        newRelEntities.push(
          new CultureToCharacterEntity({
            cultureId: x.id,
            characterId: characterEntity.id,
          }),
        );
      });
    } else {
      throw Error('Character not found.');
    }
  }

  if (newRelEntities.length > 0) await connection.manager.save(newRelEntities);
};

const insertCharactersLocationRelations = async (connection: Connection) => {
  const newRelEntities = [];
  const savedCharacterEntities = await connection.manager.find(CharacterEntity);

  for (const characterEntity of savedCharacterEntities) {
    const rawCharacter = CHARACTERS_RAW.find((x) => x.name === characterEntity.name);
    if (rawCharacter) {
      const locationsList = await findEntitiesByText(
        LocationEntity,
        rawCharacter.location,
        connection,
      );

      const characterLocations = await connection.manager.find(LocationToCharacterEntity, {
        where: { characterId: characterEntity.id },
      });

      const newLocations: LocationEntity[] = [];

      locationsList?.forEach((x) => {
        const index = characterLocations.findIndex((y) => y.location.id == x.id);
        if (index === -1) {
          newLocations.push(x);
        }
      });

      newLocations.forEach((x) => {
        newRelEntities.push(
          new LocationToCharacterEntity({
            locationId: x.id,
            characterId: characterEntity.id,
          }),
        );
      });
    } else {
      throw Error('Character not found.');
    }
  }

  if (newRelEntities.length > 0) await connection.manager.save(newRelEntities);
};

// const insertCharactersLocationRelations2 = async (connection: Connection) => {
//   // Creating characters
//   const savedEntities = await connection.manager.find(CharacterEntity, {
//     relations: ['locations'],
//   });
//   for (const characterEntity of savedEntities) {
//     const rawCharacter = CHARACTERS_RAW.find((x) => x.name === characterEntity.name);

//     if (rawCharacter) {
//       const locationsList = await findEntitiesByText(
//         LocationEntity,
//         rawCharacter.location,
//         connection,
//       );

//       //   characterEntity.cultures?.forEach((x) => console.log('characterEntity:', x.name));

//       characterEntity.locations?.forEach((x) => {
//         pushIfNotIncluded(x, locationsList);
//       });

//       locationsList?.forEach((x) => console.log('res:', x.name));

//       //   culturesList?.forEach((x) => {
//       //     anyNotIncluded(x, characterEntity.cultures);
//       //   });

//       console.log(characterEntity.name);

//       console.log('-------------');

//       if (locationsList && locationsList.length > 0) {
//         characterEntity.locations = locationsList;
//       }
//     } else {
//       throw Error('Character not found.');
//     }
//   }
//   await connection.manager.save(savedEntities);
// };

const insertCharactersSpouseRelations = async (connection: Connection) => {
  // Creating characters
  const savedEntities = await connection.manager.find(CharacterEntity);
  for (const characterEntity of savedEntities) {
    const rawCharacter = CHARACTERS_RAW.find((x) => x.name === characterEntity.name);

    if (rawCharacter) {
      const spousesList = await findEntitiesByText(
        CharacterEntity,
        rawCharacter.spouse,
        connection,
      );

      //   characterEntity.cultures?.forEach((x) => console.log('characterEntity:', x.name));

      characterEntity.locations?.forEach((x) => {
        pushIfNotIncluded(x, spousesList);
      });

      spousesList?.forEach((x) => console.log('res:', x.name));

      //   culturesList?.forEach((x) => {
      //     anyNotIncluded(x, characterEntity.cultures);
      //   });

      console.log(characterEntity.name);

      console.log('-------------');

      if (spousesList && spousesList.length > 0) {
        characterEntity.spouse = spousesList[0];
      }
    } else {
      throw Error('Character not found.');
    }
  }
  await connection.manager.save(savedEntities);
};

const insertLocationsCapitalRelations = async (connection: Connection) => {
  // Creating characters
  const savedEntities = await connection.manager.find(LocationEntity, { relations: ['capitals'] });
  for (const locationEntity of savedEntities) {
    const rawLocation = LOCATIONS_RAW.find((x) => x.name === locationEntity.name);

    if (rawLocation) {
      const capitalsList = await findEntitiesByText(
        LocationEntity,
        rawLocation.capital?.replace('Minas Ithil', 'Minas Morgul'),
        connection,
        false,
        true,
      );

      //   locationEntity.cultures?.forEach((x) => console.log('characterEntity:', x.name));

      locationEntity.capitals?.forEach((x) => {
        pushIfNotIncluded(x, capitalsList);
      });

      capitalsList?.forEach((x) => console.log('res:', x.name));

      //   capitalsList?.forEach((x) => {
      //     anyNotIncluded(x, characterEntity.capitals);
      //   });

      console.log(locationEntity.name);

      console.log('-------------');

      if (capitalsList && capitalsList.length > 0) {
        locationEntity.capitals = capitalsList;
      }
    } else {
      throw Error('Location not found.');
    }
  }
  await connection.manager.save(savedEntities);
};

const insertLocationsRegionsRelations = async (connection: Connection) => {
  // Creating characters
  const savedEntities = await connection.manager.find(LocationEntity, { relations: ['regions'] });
  for (const locationEntity of savedEntities) {
    const rawLocation = LOCATIONS_RAW.find((x) => x.name === locationEntity.name);

    if (rawLocation) {
      const regionsList = await findEntitiesByText(
        LocationEntity,
        rawLocation.regions?.replace('Minas Ithil', 'Minas Morgul'),
        connection,
        false,
        true,
      );

      //   locationEntity.regions?.forEach((x) => console.log('characterEntity:', x.name));

      locationEntity.regions?.forEach((x) => {
        pushIfNotIncluded(x, regionsList);
      });

      regionsList?.forEach((x) => console.log('res:', x.name));

      //   regionsList?.forEach((x) => {
      //     anyNotIncluded(x, characterEntity.regions);
      //   });

      console.log(locationEntity.name);

      console.log('-------------');

      if (regionsList && regionsList.length > 0) {
        locationEntity.regions = regionsList;
      }
    } else {
      throw Error('Location not found.');
    }
  }
  await connection.manager.save(savedEntities);
};

const insertLocationsMajorTownsRelations = async (connection: Connection) => {
  // Creating characters
  const savedEntities = await connection.manager.find(LocationEntity, {
    relations: ['majorTowns'],
  });
  for (const locationEntity of savedEntities) {
    const rawLocation = LOCATIONS_RAW.find((x) => x.name === locationEntity.name);

    if (rawLocation) {
      const majorTownsList = await findEntitiesByText(
        LocationEntity,
        rawLocation.major_towns?.replace('Minas Ithil', 'Minas Morgul'),
        connection,
        false,
        true,
      );

      locationEntity.majorTowns?.forEach((x) => {
        pushIfNotIncluded(x, majorTownsList);
      });

      majorTownsList?.forEach((x) => console.log('res:', x.name));

      //   culturesList?.forEach((x) => {
      //     anyNotIncluded(x, LocationEntity.majorTowns);
      //   });

      console.log(locationEntity.name);

      console.log('-------------');

      if (majorTownsList && majorTownsList.length > 0) {
        locationEntity.majorTowns = majorTownsList;
      }
    } else {
      throw Error('Location not found.');
    }
  }
  await connection.manager.save(savedEntities);
};
