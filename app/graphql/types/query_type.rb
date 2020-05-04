module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end

    field :me, String, null: true,
      description: "The email address of the currently signed-in user"
    def me
      context[:current_user].try(:email)
    end
  end
end
