# frozen_string_literal: true

module Mutations
  # Log in the user session using Clearance
  class Login < Mutations::BaseMutation
    require 'clearance/session'

    argument :email, String, required: true
    argument :password, String, required: true

    field :success, Boolean, null: false
    field :email, String, null: true
    field :errors, [String], null: false

    def resolve(email:, password:)
      user = User.authenticate(email, password)
      return error_response unless user

      context[:request].env[:clearance].sign_in(user) do |status|
        {
          success: status.success?,
          email: user.email,
          errors: []
        }
      end
    end

    private

    def error_response
      {
        success: false,
        errors: ['Invalid email address or password']
      }
    end
  end
end
