class Mutations::Login < Mutations::BaseMutation
  require 'clearance/session'

  argument :email, String, required: true
  argument :password, String, required: true

  field :success, Boolean, null: false
  field :email, String, null: true
  field :errors, [String], null: false

  def resolve(email:, password:)
    user = User.authenticate(email, password)
    return { success: false, errors: ['Invalid email address or password'] } unless user

    context[:request].env[:clearance].sign_in(user) do |status|
      {
        success: status.success?,
        email: user.email,
        errors: []
      }
    end
  end
end
