---
to: "src/modules/<%= h.fileName(name) %>/<%= h.translationEntityFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('TranslationEntity') %>
---
<%
 ClassName = h.ClassName(name);
 fieldName = h.changeCase.camel(ClassName);
 DtoName = h.DtoName(name);
 dtoFileName = h.dtoFileName(name);
 translationDtoFileName = h.translationDtoFileName(name);
 translationEntityFileName = h.translationEntityFileName(name);
 DtoOptionName = h.DtoOptionName(name);
 var_name = h.inflection.dasherize(name);
 EntityName = h.EntityName(name);
 entityName = h.changeCase.camel(EntityName);
 TranslationEntityName = h.TranslationEntityName(name);
 TranslationDtoName = h.TranslationDtoName(name);
 translationEntityName = h.changeCase.camel(TranslationEntityName);
%>

import { AbstractTranslationEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { <%= TranslationDtoName %> } from './dtos/<%= translationDtoFileName %>';
import { <%= EntityName %> } from './<%= entityFileName %>';

@UseDto(<%= TranslationDtoName %>)
export class <%= TranslationEntityName %> extends AbstractTranslationEntity<<%= TranslationDtoName %>> {
  <%= fieldName %>Id: Uuid;

  <%= fieldName %>: <%= EntityName %>;
}

