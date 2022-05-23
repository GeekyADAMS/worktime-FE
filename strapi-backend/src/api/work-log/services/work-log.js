'use strict';

/**
 * work-log service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::work-log.work-log');
