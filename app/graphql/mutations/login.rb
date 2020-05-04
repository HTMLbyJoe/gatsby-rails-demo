class Mutations::Login < Mutations::BaseMutation
  require 'clearance/session'

  argument :email, String, required: true
  argument :password, String, required: true

  field :success, Boolean, null: false
  field :errors, [String], null: false

  def resolve(email:, password:)
    user = User.authenticate(email, password)
    context[:request].env[:clearance].sign_in(user) do |status|
      {
        success: status.success?,
        errors: []
      }
    end
  end
end
