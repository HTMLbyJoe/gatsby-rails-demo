# frozen_string_literal: true

module Types
  # Add root-level fields here.
  # They will be entry points for queries on your schema.
  class QueryType < Types::BaseObject
    # TODO: remove me
    field(
      :test_field,
      String,
      null: false,
      description: 'An example field added by the generator'
    )

    def test_field
      'Hello World!'
    end

    field(
      :me,
      String,
      null: true,
      description: 'The email address of the currently signed-in user'
    )

    def me
      context[:current_user].try(:email)
    end
  end
end
