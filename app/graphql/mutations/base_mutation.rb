# frozen_string_literal: true

module Mutations
  # Mutation that all others inherit from
  class BaseMutation < GraphQL::Schema::Mutation
    argument_class Types::BaseArgument
    field_class Types::BaseField
    # input_object_class Types::BaseInputObject
    object_class Types::BaseObject
  end
end
