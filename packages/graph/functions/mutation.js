const { PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const { v4 } = require("uuid");
const client = require("./dynamodb-client");

async function createTodo(ctx) {
  try {
    const params = {
      id: v4(),
      title: ctx.arguments.title,
    };

    const command = new PutItemCommand({
      TableName: "TodoTable",
      Item: marshall(params),
    });
    await client.send(command);
    return params;
  } catch (e) {
    console.log(e);
    response = {
      error: e.message,
      errorStack: e.stack,
      statusCode: 500,
    };
  }

  return response;
}

const resolvers = {
  Mutation: {
    todoCreate: async (ctx) => {
      return createTodo(ctx);
    },
  },
};

exports.handler = async (ctx) => {
  const typeHandler = resolvers[ctx.info.parentTypeName];
  if (typeHandler) {
    const resolver = typeHandler[ctx.info.fieldName];
    if (resolver) {
      return await resolver(ctx);
    }
  }
  throw new Error("Resolver not found.");
};
