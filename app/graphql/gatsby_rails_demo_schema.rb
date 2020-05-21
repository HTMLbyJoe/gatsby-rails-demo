# frozen_string_literal: true

# The GraphQL schema for this app, using GraphQL Ruby
# GraphqlController uses this to execute the queries
class GatsbyRailsDemoSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  # Opt in to the new runtime (default in future graphql-ruby versions)
  use GraphQL::Execution::Interpreter

  use GraphQL::Analysis::AST

  # Add built-in connections for pagination
  use GraphQL::Pagination::Connections
end
