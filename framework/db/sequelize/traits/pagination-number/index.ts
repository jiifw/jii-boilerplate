import merge from 'deepmerge';
import pagination from 'pagination';

// utils
import { retrieve } from '@framework/base/config';
import { configKey } from '@framework/db/sequelize';

// types
import { CountOptions } from 'sequelize';
import { NumberPaginationTraitConfig, TraitType } from './types';

// public types
export type { PaginationNumberTrait, PaginationNumberTraitStatic } from './types';

export interface PaginationNumberTraitOptions {
  current: number,
  perPage: number,
}

export default <TraitType>function(Model) {
  const config = <NumberPaginationTraitConfig>merge({
    current: 1,
    perPage: 20,
  }, retrieve(configKey, 'traits.pagination-number', {}));

  Model.paginationNumber = async (findOptions = {}, options = {}) => {
    options = merge({
      current: config?.current || 1,
      perPage: config?.perPage || 20,
    }, options);

    // Fix `current` value
    isNaN(options.current) || options.current < 1 && (
      options.current = 1
    );

    // Fix `perPage` value
    isNaN(options.perPage) || options.perPage < 1 && (
      options.perPage = 20
    );

    const countFindOptions = <CountOptions>{ ...findOptions };
    countFindOptions.attributes = [];

    /** @type {number} */
    const total = await Model.count(countFindOptions);

    /** @type {Object} */
    const paginator = new pagination.SearchPaginator({
      current: options.current,
      rowsPerPage: options.perPage,
      totalResult: total,
    });

    /** @type {Object} */
    const pageData = paginator.getPaginationData();

    if (options.current > pageData.pageCount) {
      options.current = pageData.current;
    }

    const rows = await Model.findAll({
      ...findOptions,
      limit: options.perPage,
      offset: Math.round(options.perPage * (options.current - 1)),
    });

    return {
      total,
      rows,
      meta: {
        pageCount: pageData.pageCount,
        current: pageData.current,
        previous: pageData.previous,
        next: pageData.next,
        first: pageData.first,
        last: pageData.last,
      },
    };
  };
};
