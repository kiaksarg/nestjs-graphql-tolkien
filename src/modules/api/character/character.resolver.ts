import { CharacterService } from '@modules/characters/service/character.service';
import { NotFoundException } from '@nestjs/common';
import { Args, ID, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RequestContext } from '../common/request-context';
import { Ctx } from '../decorators/request-context.decorator';
import { CharacterListQueryOption } from './character.args';
import { Character } from './models/character.model';
import { CharacterList } from './models/characterList.model';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private characterService: CharacterService) {}

  @Query(() => Character, { name: 'character' })
  async getCharacter(@Ctx() ctx: RequestContext, @Args('id', { type: () => ID }) id: bigint) {
    const character = await this.characterService.get(ctx, id);

    if (!character) {
      throw new NotFoundException(id);
    }
    return character;
  }

  @Query(() => CharacterList)
  async characters(@Ctx() ctx: RequestContext, @Args() args: CharacterListQueryOption) {
    return this.characterService.findAll(ctx, args.options);
  }

  // @ResolveField(() => CultureList)
  // async cultures(
  //   @Ctx() ctx: RequestContext,
  //   @Args() args: CharacterListQueryOption,
  //   @Parent() culture: Character,
  // ) {
  //   const { id } = culture;
  //   const res = await this.characterService.pagedCharacterCulturesByCharacterId(
  //     ctx,
  //     id,
  //     args.options,
  //   );

  //   return res;
  // }
}
