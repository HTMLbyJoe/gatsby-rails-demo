class Mutations::Login < Mutations::BaseMutation
  require 'clearance/session'

  argument :email, String, required: true
  argument :password, String, required: true

  field :success, Boolean, null: false
  field :errors, [String], null: false

  def resolve(email:, password:)
    session = Clearance::Session.new({})
    user = User.authenticate(email, password)
    session.sign_in(user) do |status|
      {
        success: status.success?,
        errors: []
      }
    end
  end
end
