# frozen_string_literal: true

module Mutations
  # Log out the user session using Clearance
  class Logout < Mutations::BaseMutation
    require 'clearance/session'

    field :success, Boolean, null: false

    def resolve
      context[:request].env[:clearance].sign_out

      {
        success: true
      }
    end
  end
end
