const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async create(ctx) {
    const { user } = ctx.state;
    const { item } = ctx.request.body;

    // Create the todo item with the given name
    let entity = await strapi.services.todo.create({ item });

    // Set the owner field to the ID of the logged-in user
    entity.owner = user.id;

    // Save the todo item with the updated owner field
    entity = await strapi.services.todo.update({ id: entity.id }, entity);

    // Return the sanitized todo item (to remove sensitive fields like the owner's password)
    return sanitizeEntity(entity, { model: strapi.models.todo });
  },
};
